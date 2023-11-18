let handler = async (m, { conn, command, text }) => {
conn.temabot = conn.temabot ? conn.temabot : { id: 1 }
  let themes = {
    1: 'Normal',
    2: 'AdReply Small',
    3: 'AdReply Large',
    4: 'Document',
    5: 'Document with AdReply Small',
    6: 'Document with AdReply Large',
    7: 'Payment',
    8: 'Gif',
  };

  if (text) {
    let themeIndex = parseInt(text);
    if (isNaN(themeIndex) || !themes[themeIndex]) {
      conn.reply(m.chat, 'Input tidak valid. Silakan pilih tema dari daftar berikut:\n' + Object.entries(themes).map(([id, theme]) => `*${id}.* ${theme}`).join('\n'), m);
      return;
    }
    conn.temabot = { id: themeIndex };
    conn.reply(m.chat, 'Tema berhasil diatur\n' + themes[themeIndex], m);
  } else {
  conn.reply(m.chat, 'Input tidak valid. Silakan pilih tema dari daftar berikut:\n' + Object.entries(themes).map(([id, theme]) => `*${id}.* ${theme}`).join('\n'), m);
      return;
  } 
  };
handler.help = ['temabot']
handler.tags = ['owner']
handler.command = /^(temabot)$/i
handler.owner = true

export default handler

