import fs from 'fs'
import { randomBytes } from 'crypto'

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i

let handler = async (m, { conn, text, usedPrefix, command, isOwner, args }) => {
let chat = global.db.data.chats[m.chat]
let imgr = flaaa.getRandom()
let [_, code, expired] = text.match(linkRegex) || []
    if (!code) throw `*Example:* ${usedPrefix + command} ${sgc}`
    
    let res = await conn.groupAcceptInvite(code)
    if (!res) throw res.toString()
    let name = await conn.getName(res).catch(_ => null)
    let caption = `${dmenut} Sukses Join Di Grup
    ${dmenub} ${name || res}
    ${dmenub} *Jangan lupa baca rules ngap!*
    ${dmenuf}
    `
            await conn.sendFile(m.chat, imgr + 'join', "", caption, m)
            
  if (chat.bcjoin) {
  let chats = Object.entries(conn.chats).filter(([_, chat]) => chat.isChats).map(v => v[0])
  let cc = conn.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : false || m)
  let teks = text ? text : cc.text
  conn.reply(m.chat, `Membagikan Link Grup Kamu ke ${chats.length} chat`, m)
  for (let id of chats) {
  await conn.sendFile(id, imgr + 'New Group', "", "*「 New Group 」* \n\n" + text, m)
}
}

}
handler.command = /^join$/i
export default handler
