import fs from 'fs';
const delay = (time) => new Promise((res) => setTimeout(res, time));

export async function before(m) {
  if (!m.chat.endsWith('@s.whatsapp.net')) return true;

  this.menfess = this.menfess ? this.menfess : {};
  const mf = Object.values(this.menfess).find((v) => v.status === false && v.penerima == m.sender);

  if (!mf) return true;

  console.log({ text: m.text, type: m.quoted?.mtype });

  if ((m.text === 'BALAS PESAN' || m.text === '') && m.quoted.mtype == 'buttonsMessage') {
    await conn.reply(m.chat, "Silahkan kirim pesan balasan kamu.\nKetik pesan sesuatu lalu kirim, maka pesan otomatis masuk ke target balas pesan", null)
    .then(() => {
      m.reply("Silahkan kirim pesan balasan kamu.\nKetik pesan sesuatu lalu kirim, maka pesan otomatis masuk ke target balas pesan.");
    });
  } else {
    const imgr = fla.getRandom();
    const txt = `Hᴀɪ ᴋᴀᴋ @${mf.dari.split('@')[0]}, ᴋᴀᴍᴜ ᴍᴇɴᴇʀɪᴛᴇ ʙᴀʟᴀsᴀɴ ɴɪʜ. Pesan yang kamu kirim sebelumnya:\n${mf.pesan}\n\nPesan balasannya:\n${m.text}\n`.trim();
    const sblm = `Pᴇsᴀɴ Aɴᴅᴀ Sᴇʙᴇʟᴜᴍɴʏᴀ ➛ ${mf.pesan}\nPᴇsᴀɴ Bᴀʟᴀsᴀɴɴʏᴀ ➨ ${m.text}`;

    await conn.reply(m.chat, txt + '\n' + sblm, null)
    .then(() => {
      conn.reply(m.chat, 'Berhasil Mengirim balasan.', null)
      .then(() => {
        delay(1500);
        delete this.menfess[mf.id];
      });
    });
  }

  return true;
}
