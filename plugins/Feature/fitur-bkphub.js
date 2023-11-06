import fetch from 'node-fetch';
import { xnxxSearch, xnxxDownloader } from '../../lib/scraper/scraped-downloader.js';

let handler = async(m, { conn, usedPrefix, text, args, command }) => {
  if (command === 'xnxx') {
    if (!text) throw `Contoh penggunaan ${usedPrefix}${command} japan`;
    const res = await xnxxSearch(text);
    const teks = res.result.map((item, index) => `🔍 *[ RESULT ${index + 1} ]*
📚 Title: ${item.title}
🔗 Link: ${item.link}
📝 Summary: ${item.info}`
    ).filter(v => v).join("\n\n________________________\n\n");
    await m.reply(teks);
  }

  if (command === 'xnxxdl') {
    if (!text) throw `Contoh penggunaan ${usedPrefix}${command} https://www.xnxx.com/video-18ctcz24/masi_pakai_seragam_biru_mainnya_di_hotel`;
    const item = await xnxxDownloader(text);
    const teks = `🔍 *[ RESULT ]*
📚 Title: ${item.title}
🔗 Link: ${item.URL}
📝 Summary: ${item.info}`;
    conn.sendMessage(m.chat, { video: { url: item.files.HLS || item.files.high || item.files.low }, caption: teks }, { quoted: m });
  }

  if (command === 'dlxnxx') {
    if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} https://www.xnxx.com/video-uy5a73b/mom_is_horny_-_brooklyn`;
    try {
      const json = await fetch(global.API('lolhuman', '/api/xnxx', { url: text }, 'apikey'));
      const x = await json.json();
      const caption = `*Title:* ${x.result.title}
*duration:* ${x.result.duration}
*view:* ${x.result.view}
*rating:* ${x.result.rating}
*like:* ${x.result.like}
*dislike:* ${x.result.dislike}
*comment:* ${x.result.comment}
*tag:* ${Array.from(x.result.tag)}
*description:* ${x.result.description}`;
      conn.sendFile(m.chat, x.result.link[1].link, 'asupan.mp4', caption, m);
    } catch (e) {
      throw e;
    }
  }
}

handler.help = ['xnxx', 'dlxnxx', 'xnxxdl'].map(v => v + ' <query>');
handler.command = ['xnxx', 'dlxnxx', 'xnxxdl'];
handler.tags = ['nsfw'];

export default handler;
