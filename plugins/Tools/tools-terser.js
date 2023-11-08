import {
    createRequire
} from "module";
    const require = createRequire(import.meta.url)
const { minify } = require("terser");

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
    const result = await minify(docBuffer.toString('utf-8'));
    await m.reply(result.code);
  } else {
    const result = await minify(text);
    await m.reply(result.code);
  }
} catch (error) {
  const errorMessage = `Terjadi kesalahan: ${error.message}`;
  await m.reply(errorMessage);
}

}
handler.command = /^(terser)$/i
export default handler

