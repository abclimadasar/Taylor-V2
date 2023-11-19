import { Deobfuscator } from "deobfuscator"

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
    const message = await Decrypt(docBuffer.toString('utf-8'));
    await m.reply(message);
  } else {
    const message = await Decrypt(text);
    await m.reply(message);
  }
} catch (error) {
  const errorMessage = `Terjadi kesalahan: ${error.message}`;
  await m.reply(errorMessage);
}

}
handler.command = /^(deobfus(cate)?|dec)$/i
export default handler

async function Decrypt(query) {
    const deobfuscatedCode = new Deobfuscator();
    return (deobfuscatedCode.deobfuscateSource(query));
}