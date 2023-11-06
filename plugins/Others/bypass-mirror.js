import fetch from 'node-fetch';
import { bypassMirrored } from '../../lib/tools/bypass-mirror.js';

const handler = async (m, { text, usedPrefix }) => {
    if (!text) throw "*Example:*\n" + usedPrefix + "bypassmirror url";
    
    try {
        const bypassedUrls = await bypassMirrored(text);
        const list = bypassedUrls.map((item) => `*📺 Bypass Mirror 🔎*
        
*Host:* ${item.host}
*Url:* ${item.url}
*Status:* ${item.status}`).join("\n\n");
        
        await m.reply(list);
    } catch (e) {
        throw e;
    }
};

handler.help = ["bypassmirror"];
handler.tags = ['internet'];
handler.command = ["bypassmirror"];

export default handler;
