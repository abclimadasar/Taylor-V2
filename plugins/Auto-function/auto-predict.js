import uploadImage from '../../lib/uploadImage.js';
import axios from 'axios';

export async function before(m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return true;
    if (!m.isGroup || !global.db.data.chats[m.chat]?.nsfw) return false;

    const q = m.quoted || m;
    const mime = q.msg?.mimetype || '';
    if (!mime) return;
    const isTele = /image\/(png|jpe?g)/.test(mime);
    if (!isTele) return;
    const media = await q.download();
    const link = await uploadImage(media);

    if (link) {
        const detect = await cekGambar(link);
        if (detect.nsfw) {
            await this.reply(m.chat, detect.msg, m);
            return;
        }
    }
}

async function cekGambar(img) {
    try {
        const response = await axios.get('https://api.sightengine.com/1.0/check.json', {
            params: {
                'url': img,
                'models': 'nudity,wad,gore',
                'api_user': '671718818',
                'api_secret': 'zs9QqkjFYZWq5N3nozXT',
            }
        });
        const estetikPesan = '*Peringatan Keamanan:*\nDitemukan pesan dengan konten NSFW di saluran yang diizinkan.\nLangkah pencegahan akan diambil terhadap pengguna.';
        return {
            nsfw: response.data.nudity.safe < 0.80,
            msg: estetikPesan
        };
    } catch (error) {
        console.error('Kesalahan dalam pemeriksaan gambar:', error);
    }
}