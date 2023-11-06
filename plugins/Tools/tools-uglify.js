import uglify from 'uglify-js';

let handler = async (m, {
    args,
    command,
    usedPrefix
}) => {
const usage = `*Example:*
${usedPrefix}${command} (Input text or reply text to enc code)
${usedPrefix}${command} doc (Reply to a document)`;

let text;

if (args.length >= 1) {
  text = args.join(" ");
} else if (m.quoted && m.quoted.text) {
  text = m.quoted.text;
} else {
  return m.reply(usage);
}

try {
  if (text === 'doc' && m.quoted && m.quoted.mtype === 'documentMessage') {
    let docBuffer;
    if (m.quoted.mimetype) {
      docBuffer = await m.quoted.download();
    }
    const message = await Encrypt(docBuffer.toString('utf-8'));
    await m.reply(message);
  } else {
    const message = await Encrypt(text);
    await m.reply(message);
  }
} catch (error) {
  const errorMessage = `Terjadi kesalahan: ${error.message}`;
  await m.reply(errorMessage);
}

}
handler.command = /^(uglify)$/i
export default handler

async function Encrypt(jsCode) {
    const result = uglify.minify(jsCode, {
                                mangle: {
                                    toplevel: true
                                },
                                compress: {
                                    toplevel: true
                                }
                            });
                            return result.code;
}