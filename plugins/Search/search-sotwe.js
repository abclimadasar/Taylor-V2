import fetch from "node-fetch";

let handler = async (m, { conn, usedPrefix, args, command }) => {
  const text = args[0] || (m.quoted && m.quoted.text) || "";
  const [usernya, medianya] = text.split('|');

  if (!usernya) return m.reply("Tidak ada input");

  try {
    const pluginsList = await getData(usernya);

    if (!medianya) {
      const pluginList = pluginsList.map((category, index) => `${index + 1}. *${category.text}*`).join('\n');
      return m.reply(`*List Kategori:*\n${pluginList}`);
    }

    if (!isNaN(medianya) && medianya > 0 && medianya <= pluginsList.length) {
      const mediaEntities = pluginsList[medianya - 1].mediaEntities;

      if (!mediaEntities || mediaEntities.length === 0) return m.reply('Tidak ada media ditemukan.');

      let message = "";

      if (mediaEntities.some(media => media.type !== "video")) {
        message += "📷 Image\n";
        mediaEntities
          .filter(media => media.type !== "video")
          .forEach(media => (message += `🔗 ${media.mediaURL}\n`));
      }

      if (mediaEntities.some(media => media.type === "video")) {
        message += "📹 Video\n";
        mediaEntities
          .filter(media => media.type === "video")
          .forEach(media => (message += `🔗 ${media.mediaURL}\n`));
      }

      return m.reply(message);
    } else {
      return m.reply('Angka di luar rentang yang sesuai.');
    }
  } catch (e) {
    return m.reply(e);
  }
};

handler.help = ['sotwe'].map(v => v + ' *index*');
handler.tags = ['owner'];
handler.command = /^(sotwe)$/i;
handler.rowner = true;

export default handler;

async function getData(user) {
  try {
    const check = await fetch("https://api.sotwe.com/v3/user/" + user);
    const data = await check.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return "nothing";
  }
}
