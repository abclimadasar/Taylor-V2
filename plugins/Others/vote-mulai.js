let handler = async (m, { conn, text, usedPrefix, isAdmin, isOwner }) => {
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
    }
    conn.vote = conn.vote ? conn.vote : {}
    let id = m.chat
    if (id in conn.vote) await conn.reply(m.chat, `*Masih ada vote di chat ini!*`, m)
            let caption = `${htjava} MULAI VOTE ${htjava}
${dmenub} *${usedPrefix}upvote* - untuk setuju
${dmenub} *${usedPrefix}devote* - untuk tidak setuju
${dmenub} *${usedPrefix}cekvote* - untuk mengecek vote
${dmenub} *${usedPrefix}hapusvote* - untuk menghapus vote
${dmenuf}`
            await conn.reply(m.chat, caption, m)
    conn.vote[id] = [
        text,
        [],
        []
    ]
}
handler.help = ['mulaivote [alasan]']
handler.tags = ['vote']
handler.command = /^(start|mulai|\+)vote$/i

export default handler
