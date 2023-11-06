let handler = async (m, { conn }) => {
    conn.tebaksiapa = conn.tebaksiapa ? conn.tebaksiapa : {}
    let id = m.chat
    if (!(id in conn.tebaksiapa)) throw false
    let json = conn.tebaksiapa[id][1]
    conn.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hsia$/i

handler.limit = true

export default handler