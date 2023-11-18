import fetch from 'node-fetch';
import { FormData, Blob } from 'formdata-node';
import { fileTypeFromBuffer } from 'file-type';
import crypto from "crypto"
const userId = crypto.randomUUID()

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    args
}) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime) {
        throw 'Tidak ada media yang ditemukan';
    }
    let media = await q.download();
    
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "Input Teks"
    await m.reply(wait)
    
    try {
        let data = await generateText(media, text)
        if (data) {
                await m.reply(data);
            }
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["blackboximg"]
handler.tags = ["ai"];
handler.command = /^(blackboximg)$/i

export default handler

/* New Line */
async function generateText(imageBuffer, input) {
  try {
  const { ext, mime } = await fileTypeFromBuffer(imageBuffer) || {};
        if (!ext || !mime) {
            return null;
        }
        let form = new FormData();
        const blob = new Blob([imageBuffer.toArrayBuffer()], { type: mime });
        form.append('image', blob, 'image.' + ext);
        form.append('fileName', 'image.' + ext);
        form.append('userId', userId);
        
        const response = await fetch("https://www.blackbox.ai/api/upload", {
            method: 'POST',
            body: form,
        });
        
        const data = await response.json();
        const messages = [{ role: "user", content: data.response + "\n#\n" + input }, { role: "assistant", content: "Hello!" }];
    const response2 = await fetch("https://www.blackbox.ai/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages, id: null, mode: "continue", userId: userId }),
    });
    return await response2.text();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}