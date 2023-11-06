import {
	uploadPomf2
} from '../../lib/scraper/scraper-toolv2.js';

let handler = async (m, {
    args,
    usedPrefix,
    command
}) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';
        if (!mime) throw 'No media found';
        let media = await q.download();
        await m.reply(wait);
        let linkPom = await uploadPomf2(media);
        const response = linkPom;
        if (response.success) {
            const fileSize = formatBytes(response.files[0].size);
            const pesan = `*Pesan Anda berhasil terkirim! 🚀*\n\n*File Detail:*\n*URL:* ${response.files[0].url}\n*Ukuran:* ${fileSize}`;
            await m.reply(pesan);
        } else {
            await m.reply('Pesan Anda gagal terkirim. 🙁');
        }
    } catch (error) {
        console.error(error);
        await m.reply('Terjadi kesalahan dalam pemrosesan permintaan Anda. 🙁');
    }
};
handler.help = ["pomf2"];
handler.tags = ["tools"];
handler.command = /^(pomf2)$/i;
export default handler;

function formatBytes(bytes) {
    if (bytes === 0) {
        return '0 B';
    }
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
}
