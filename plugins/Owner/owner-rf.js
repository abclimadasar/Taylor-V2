import { exec } from 'child_process';
import { promisify } from 'util';

let handler = async (m, { conn, isROwner, usedPrefix, command, text }) => {
  // Menunggu pesan "global.wait" sebelum melanjutkan
  await m.reply(global.wait);

  // Memeriksa apakah pengguna adalah pemilik bot
  if (!isROwner) return;

  // Mendapatkan daftar plugin
  const array = Object.keys(plugins);
  const execAsync = promisify(exec);
  let [input, destination] = text.split(' ');
  
  if (!input || !destination) {
    await m.reply("Contoh penggunaan: Untuk mencari bagian, ketik *.rf anti-audio anti-audio2*");
    return;
  }
  
  // Validasi input untuk menghindari karakter khusus atau instruksi berbahaya
  if (!/^[a-zA-Z0-9-_.]+$/.test(input)) {
    await m.reply("Input tidak valid. Harap gunakan karakter yang aman.");
    return;
  }

  const index = array.findIndex(item => item.includes(input));

  if (index !== -1) {
    const fileToCat = array[index];
    try {
    const replacedString = fileToCat.replace(/\/[^/]+\.js/g, `/${destination}.js`);
      const { stdout, stderr } = await execAsync(`mv ${fileToCat} ${replacedString}`);
      const output = stdout || stderr;
      await m.reply(output);
    } catch (error) {
      const errorMessage = `Terjadi kesalahan: ${error.message}`;
      await m.reply(errorMessage);
    }
  } else {
    const notFoundMessage = `Input ${input} tidak ditemukan dalam array. Berikut adalah daftar dengan nomor urutan:\n${array.map(item => item.split("/").pop().replace(".js", "")).map((item, i) => `${i + 1}. ${item}`).join('\n')}\nContoh penggunaan: Untuk mencari bagian, ketik *.rf anti-audio anti-audio2*`;
    await m.reply(notFoundMessage);
  }
}

handler.help = ['rfplugin'].map(v => v + ' <text>')
handler.tags = ['owner']
handler.command = /^(rfplugin|rf)$/i
handler.rowner = true

export default handler
