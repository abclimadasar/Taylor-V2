let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw new Error("Gunakan *" + usedPrefix + "liststore* untuk melihat daftar pesan yg tersimpan.");
  let msgs = global.db.data.msgs;
  if (!(text in msgs)) throw new Error("[ " + text + " ] tidak terdaftar di daftar pesan.");
  delete msgs[text];
  throw new Error("[💬] berhasil menghapus pesan di daftar List dengan nama >\n" + text);
};

handler.help = ["store"].map(v => "del" + v + " <teks>");
handler.tags = ["database"];
handler.command = ["delstore"];
handler.group = true;
handler.admin = true;
export default handler;