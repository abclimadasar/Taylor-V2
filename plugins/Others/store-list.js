const handler = async (m, { conn, usedPrefix, command }) => {
  const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  const name = await conn.getName(who);
  const chat = global.db.data.chats[m.chat];
  const msgs = global.db.data.msgs;
  const msg = Object.entries(msgs).map(([nama, isi]) => ({ nama, ...isi }));

  if (chat.getmsg === false) {
    await m.reply("Kamu harus mengaktifkan getmsg dengan mengetik *.on getmsg*");
  } else if (msg[0]) {
    const pesanList = [`⚡ Hai ${name}, berikut daftar Menu yang ada di List store...`, 'Akses langsung dengan mengetik namanya'];
    
    for (let i = 0; i < msg.length; i++) {
      pesanList.push(`${htki} ${i + 1} ${htka}`);
      pesanList.push(`Pesan: ${msg[i].nama}\n${usedPrefix}getmsg ${msg[i].nama}\n\n${htjava}`);
      pesanList.push(`${dmenub} *ID:* ${msg[i].key.id}`);
      pesanList.push(`${dmenub} *Type:* ${Object.keys(msg[i].message)}`);
      pesanList.push(`${dmenub} *Jid:* ${msg[i].key.remoteJid.replace(/@.+/, "")}\n${dmenuf}`);
    }
    
    await m.reply(pesanList.join('\n'));
    await m.reply(`☂️ ${command} Klik Disini ☂️`);
  } else {
    return m.reply("Belum ada Menu yang ada di list store.\nKetik *${usedPrefix} addlist <teks>* untuk menambahkan daftar menu.");
  }
};

handler.help = ["store"].map(v => `list${v}`);
handler.tags = ["database"];
handler.command = ["liststore"];

export default handler;
