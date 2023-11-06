let handler = async(m, { command, args }) => {
    const input = args[0].toLowerCase()
    this.anonymous = this.anonymous ? this.anonymous : {}
    switch (input) {
        case 'next':
        case 'leave': {
            let room = Object.values(this.anonymous).find(room => room.check(m.sender))
            if (!room) return this.reply(m.chat, '*Kamu tidak sedang berada di anonymous chat*', m)
            m.reply('Ok')
            let other = room.other(m.sender)
            if (other) await this.reply(other, '*Partner meninggalkan chat*', m)
            delete this.anonymous[room.id]
            if (args[0] === 'leave') break
        }
        case 'start': {
            if (Object.values(this.anonymous).find(room => room.check(m.sender))) return this.reply(m.chat, '*Kamu masih berada di dalam anonymous chat, menunggu partner*', m)
            let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
                await this.reply(room.a, '*Partner ditemukan!*', m)
                room.b = m.sender
                room.state = 'CHATTING'
            } else {
                let id = + new Date
                this.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'WAITING',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : ''
                    },
                }
                await this.reply(m.chat, '*Menunggu partner...*', m)
            }
            break
        }
    }
}
handler.help = ['anonymous start', 'anonymous leave', 'anonymous next']
handler.tags = ['anonymous']
handler.command = ['anonymous']

handler.private = true

export default handler