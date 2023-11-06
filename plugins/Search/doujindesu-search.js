import { doujindesusearch } from '../../lib/scraper/scraper-copy.js'
import fetch from 'node-fetch'
let handler = async (m, {
    text,
    command,
    usedPrefix,
    conn
}) => {
var salah_input = "*Example:*\n" + usedPrefix + command + " naruto"
if (!text) throw salah_input
try {
    let djds = await doujindesusearch(text)
    let list = djds.map((item, index) => `*${htki} 📺 Doujin Search 🔎 ${htka}*

*Title:* ${item.title}
*Thumb:* ${item.thumb}
*Type:* ${item.type}
*Status:* ${item.status}
*Score:* ${item.score}

*Url:* ${item.link}
`).join("\n")
    await m.reply(list)
    } catch (e) {
    throw eror
    }
}
handler.help = ["doujindesusearch"]
handler.tags = ['internet']
handler.command = ["doujindesusearch"]

export default handler

function ArrClean(str) {
return str.map((v, index) => ++index + ". " + v).join('\r\n')
}