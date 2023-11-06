/**
 * Jangan Di Hapus!!
 * 
 * Buatan Zenss
 * Github: https://github.com/RaaaGH
 * 
 *
 *
 * Gatau Males Pengen Beli Truk
 *GW TAU GW KASI WM NNTI JUGA DI HAPUS 🗿🤟
 *
 */

let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.confess = conn.confess ? conn.confess : {}
    if (!text) throw `*Cara penggunaan :*\n\n${usedPrefix + command} nomor|nama pengirim|pesan\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Nama|Halo.\n\n${author}`;
    let [jid, name, pesan] = text.split("|")
    if ((!jid || !name || !pesan)) throw `*Cara penggunaan :*\n\n${usedPrefix + command} nomor|nama pengirim|pesan\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Bapakmu|Halo.\n\n${author}`;
    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let data = (await conn.onWhatsApp(jid))[0] || {};
    if (!data.exists) throw 'Nomer tidak terdaftar di whatsapp.';
    if (jid == m.sender) throw 'tidak bisa mengirim pesan confess ke diri sendiri.'
    let mf = Object.values(conn.confess).find(mf => mf.status === true)
    if (mf) return !0
    try {
    	let id = + new Date
        let txt = `Hai @${data.jid.split('@')[0]}, kamu menerima pesan confess nih.\n\nDari: *${name}*\nPesan: \n${pesan}\n\nMau balas pesan ini kak? bisa kak. kakak tinggal ketik pesan kakak nanti saya sampaikan ke *${name}*.`.trim();
        await conn.reply(data.jid, txt, null)
        .then(() => {
            m.reply('Berhasil mengirim pesan confess.')
            conn.confess[id] = {
                id,
                dari: m.sender,
                nama: name,
                penerima: data.jid,
                pesan: pesan,
                status: false
            }
            return !0
        })
    } catch (e) {
        console.log(e)
        m.reply('eror');
    }
}
handler.tags = ['menbalas']
handler.help = ['confes'].map(v => v + ' <nomor|nama|pesan>')
handler.command = /^(confes)$/i
handler.private = true

export default handler