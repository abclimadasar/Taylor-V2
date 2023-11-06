import fetch from "node-fetch";
import uploadImage from "../../lib/uploadImage.js";
import { NeoxrApi } from "../../lib/tools/neoxr-api.js";
import fs from "fs";

let handler = async (m, { conn }) => {
    try {
        const q = m.quoted || m;
        const mime = (q.msg || q).mimetype || "";

        if (/image/g.test(mime) && !/webp/g.test(mime)) {
            await m.reply(wait);

            const img = await q.download?.();
            const out = await uploadImage(img);
            const neo = new NeoxrApi("kyaOnechan");

            const response = await neo.remini(out);

            if (response?.status && response?.data) {
                const imageBuffer = base64ToBuffer(response.data.image);

                if (response.data.url) {
                    await conn.sendFile(m.chat, response.data.url, "", "*[ REMINI URL ]*\n" + (response.data.url ? response.data.url : "Url tidak ada"), m);
                }

                if (response.data.image) {
                    await conn.sendFile(m.chat, imageBuffer, "", "*[ REMINI IMAGE]*\n" + (response.data.url ? response.data.url : "Url tidak ada"), m);
                }
            } else {
                throw new Error("Invalid image response");
            }
        } else {
            throw new Error("Reply imagenya");
        }
    } catch (e) {
        await m.reply(eror);
    }
};

handler.help = ["remini"];
handler.tags = ["tools"];
handler.command = ["remini"];
export default handler;

function base64ToBuffer(base64Image) {
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
    return Buffer.from(base64Data, "base64");
}
