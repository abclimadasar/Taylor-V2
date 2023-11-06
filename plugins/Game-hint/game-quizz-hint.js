let handler = async (m, { conn }) => {
    conn.quizz = conn.quizz ? conn.quizz : {}
    let id = m.chat
    if (!(id in conn.quizz)) throw false
    let json = conn.quizz[id][1]
    conn.reply(m.chat, (json[0].hint).map((element, index) => `${index + 1}. ${element}`).join("\n"), m)
}
handler.command = /^quizzh$/i

handler.limit = true

export default handler