import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*quizzh/i.test(m.quoted.text) || /.*quizzh/i.test(m.text))
        return !0
    this.quizz = this.quizz ? this.quizz : {}
    if (!(id in this.quizz))
        return this.reply(m.chat, 'Soal itu telah berakhir', m)
    if (m.quoted.id == this.quizz[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.quizz[id][3])
            delete this.quizz[id]
            return this.reply(m.chat, '*Yah Menyerah :( !*', m)
        }
        let json = JSON.parse(JSON.stringify(this.quizz[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json[0].jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.quizz[id][2]
            this.reply(m.chat, `✅ *Benar!*\n+${this.quizz[id][2]} XP`, m)
            clearTimeout(this.quizz[id][3])
            delete this.quizz[id]
        } else if (similarity(m.text.toLowerCase(), json[0].jawaban.toLowerCase().trim()) >= threshold)
            m.reply(`❗ *Dikit Lagi!*`)
        else
            this.reply(m.chat, `❌ *Salah!*`, m)
    }
    return !0
}
export const exp = 0

const buttonquizz = [
    ['quizz', '/quizz']
]