let handler = async (m, { conn, command }) => {
  let user = global.db.data.users[m.sender]
  let imgr = flaaa.getRandom()
  const caption = `
${htki} *H U T A N G  U S E R* ${htka}
${dmenub} 📛 *Name:* ${user.registered ? user.name : conn.getName(m.sender)}
${dmenub} 💹 *Money:* ${user.money} 💲
${dmenuf}
`.trim()
  
  await conn.sendFile(m.chat, imgr + command, "", caption, m)
}
handler.help = ['hutang']
handler.tags = ['rpg']
handler.command = /^(hutang)$/i

handler.register = false
export default handler