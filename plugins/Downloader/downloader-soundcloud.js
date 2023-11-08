const CLIENT_ID = 'zZeR6I5DM5NMAYEhk7J9vveMqZzpCIym';
import soundcloud from 'soundcloud-downloader';
import fetch from 'node-fetch';
import util from 'util';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : (m.fromMe ? conn.user.jid : m.sender);
    const pp = await conn.getProfilePicture(who);
    const name = await conn.getName(who);

    if (!args[0]) {
      throw new Error(`Gunakan contoh ${usedPrefix}${command} link`);
    }

    const buff = await soundcloud.download(args[0], CLIENT_ID);
    const hasil = await fetch(buff);

    await conn.sendFile(m.chat, hasil.body, `${command}.mp3`, '', m, null, {
      mimetype: 'audio/mpeg',
      seconds: 120, // Gantilah sesuai durasi lagu yang sesuai
      contextInfo: {
        externalAdReply: {
          mediaUrl: hasil.url,
          mediaType: 2,
          description: 'Deskripsi Anda',
          title: `👋 Hai, ${name} ucapan`,
          body: 'Botdate Anda',
          thumbnail: await fetch(pp).then(res => res.buffer()),
          sourceUrl: hasil.url,
        },
      },
    });
  } catch (error) {
    throw new Error(error.message); // Tangkap dan lempar error yang sesuai
  }
};

handler.help = ['soundcloud'].map(v => `${v} <url>`);
handler.tags = ['downloader'];
handler.command = /^s(oundcloud(d(own|l)2|2)|cd(own|l)2)$/i;

export default handler;
