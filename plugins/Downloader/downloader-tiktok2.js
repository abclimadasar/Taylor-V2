import { tiktokdl } from '@bochilteam/scraper'
import { aiovideodl } from '../../lib/tiktokdl.js'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)
if (!args[0]) throw `Use example ${usedPrefix}${command} https://www.tiktok.com/@omagadsus/video/7025456384175017243`
try {
    const { author: { nickname }, video, description } = await tiktokdl(args[0])
    const url = video.no_watermark || video.no_watermark2 || video.no_watermark_raw
    if (!url) throw 'Can\'t download video!'
let caption = `*Nickname:* ${nickname}
*Description:* ${description}`
  conn.sendFile(m.chat, url, '', caption, m)
} catch {
const { res } = await aiovideodl(args[0])
    const urll = res.data.url
    if (!urll) throw 'Can\'t download video!'
let caption = `*Nickname:* ${wm}`
  conn.sendFile(m.chat, urll, '', caption, m)
}
}
handler.help = ['tiktok2'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(tiktok2)$/i

export default handler
