import fetch from 'node-fetch';
import { FormData, Blob } from 'formdata-node';
import { fileTypeFromBuffer } from 'file-type';

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime) {
        throw 'Tidak ada media yang ditemukan';
    }
    let media = await q.download();
    
    try {
        let data = await generateText(media)
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
async function generateText(imageBuffer) {
  try {
  const { ext, mime } = await fileTypeFromBuffer(imageBuffer) || {};
        if (!ext || !mime) {
            return null;
        }
        let form = new FormData();
        const blob = new Blob([imageBuffer.toArrayBuffer()], { type: mime });
        form.append('image', blob, 'image.' + ext);
        form.append('userId', '');
        
        const response = await fetch("https://www.blackbox.ai/api/upload", {
            method: 'POST',
            body: form,
        });
        
        const data = await response.json();
        return data.response
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}