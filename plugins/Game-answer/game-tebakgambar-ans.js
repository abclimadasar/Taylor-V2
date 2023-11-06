import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hgam/i.test(m.quoted.text) || /.*hgam/i.test(m.text))
        return !0
    this.tebakingambar = this.tebakingambar ? this.tebakingambar : {}
    if (!(id in this.tebakingambar))
        return this.reply(m.chat, 'Soal itu telah berakhir', m)
    if (m.quoted.id == this.tebakingambar[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.tebakingambar[id][3])
            delete this.tebakingambar[id]
            return this.reply(m.chat, '*Yah Menyerah :( !*', m)
        }
        let json = JSON.parse(JSON.stringify(this.tebakingambar[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebakingambar[id][2]
            this.reply(m.chat, `✅ *Benar!*\n+${this.tebakingambar[id][2]} XP`, m)
            clearTimeout(this.tebakingambar[id][3])
            delete this.tebakingambar[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
            m.reply(`❗ *Dikit Lagi!*`)
        else
            this.reply(m.chat, `❌ *Salah!*`, m)
    }
    return !0
}
export const exp = 0

const buttontebakingambar = [
    ['tebakgambar', '/tebakgambar']
]