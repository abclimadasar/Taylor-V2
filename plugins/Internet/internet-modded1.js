import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    let lister = [
        "search",
        "app"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.modded1 search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .modded1 search|vpn")
            await m.reply(wait)
            try {
                let res = await searchModded(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*

📝 *Title:* ${item.title}
🔗 *Url:* ${item.url}
🖼️ *Thumb:* ${item.iconUrl}
📋 *Meta:* ${item.meta}
🏷️ *Categories:* ${item.categories}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("Input query link\nExample: .modded1 app|link")
            try {
                let resl = await getMod1(inputs)
                
                let cap = "*Name:* " + resl.text + "\n" + "*Link:* " + resl.url + "\n\n" + wait
                await conn.sendFile(m.chat, resl.ogImageUrl, "", cap, m)
                await conn.sendFile(m.chat, resl.url, resl.text, null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["modded1"]
handler.tags = ["internet"]
handler.command = /^(modded1)$/i
export default handler

/* New Line */
async function searchModded(query) {
  try {
    const response = await fetch('https://modded-1.com/?s=' + query); // Ganti URL dengan URL sumber HTML yang sesuai
    const html = await response.text();

    const $ = cheerio.load(html);
    const articles = [];

    $('article').each((index, element) => {
      const article = {
        title: $(element).find('.app-name h2').text().trim(),
        url: $(element).find('.app').attr('href'),
        iconUrl: $(element).find('.app-icon img').attr('src'),
        meta: $(element).find('.app-meta').first().text().trim(),
        categories: $(element).find('.app-meta span').map((index, el) => $(el).text().trim()).get()
      };

      articles.push(article);
    });

    return articles;
  } catch (error) {
    console.log('Terjadi kesalahan:', error);
    return [];
  }
}

async function getMod1(query) {
  try {
    const response = await fetch(query.endsWith('/download/0') ? query : query + '/download/0'); // Ganti URL dengan URL sumber HTML yang sesuai
    const html = await response.text();
    const $ = cheerio.load(html);
    const ogImageUrl = $('meta[property="og:image"]').attr('content');
  const downloadDiv = $('#download'); // Cari elemen dengan id 'download'
  const link = downloadDiv.find('a'); // Cari elemen <a> di dalam elemen dengan id 'download'

  const text = link.text(); // Ambil teks dari elemen <a>
  const url = link.attr('href'); // Ambil atribut href dari elemen <a>
  const data = { text, url, ogImageUrl }; // Buat objek dengan teks dan URL
  return data;
  } catch (error) {
    console.log('Terjadi kesalahan:', error);
    return {};
  }
}
