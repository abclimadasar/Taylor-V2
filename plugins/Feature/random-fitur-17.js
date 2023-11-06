import fetch from 'node-fetch'
import { sticker } from '../../lib/sticker.js'
import { Sticker, StickerTypes } from 'wa-sticker-formatter'

let handler = async(m, { conn, usedPrefix, text, args, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)

let urut = text.split`|`
  let one = urut[0]
  let two = urut[1]

if (command == 'nhentai') {
if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} 344253`
try {
  let gas = await fetch(`https://api.lolhuman.xyz/api/nhentai/${args[0]}?apikey=${global.lolkey}`)
    let json = await gas.json()
    let hasil = json.result.image
	let row = Object.keys(hasil).map((v, index) => ({
		title: index + json.result.title_native,
		description: '\n*Color:* ' + json.result.title_romaji + '\n*Slug:* ' + json.result.read + '\n*Description:* ' + Array.from(json.result.tags) + '\n*Image:* ' + hasil[v],
		rowId: usedPrefix + 'get ' + hasil[v]
	}))
	let button = {
		buttonText: `☂️ ${command} Disini ☂️`,
		description: `⚡ ${name} Silakan pilih ${command} di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: wm
	}
	return await conn.sendListM(m.chat, button, row, m)
} catch (e) {
return m.reply('Error kan')
}
}


if (command == 'nhentaipdf') {
if (!text) throw 'Masukkan Kode Hentai'
let tobat = 'https://pdf.lolhuman.xyz/download/' + text + '.pdf'
await conn.sendMessage(m.chat, {document: { url: tobat }, mimetype: 'application/pdf', fileName: `${text}.pdf`}, {quoted:fakes})
}

    if (command == 'gosearch') {
	let url = 'https://ddg-webapp-aagd.vercel.app/search?max_results=1&q=' + text
	let res = await fetch(url)
  let json = await res.json()
  m.reply(`*Judul:*\n${json.title}\n\n${json.body}\n\n*Sumber:*\n${json.href}`)
  }
  if (command == 'wikisearch') {
  let res = await fetch('https://id.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + text + '&format=json')
  let json = await res.json()
  m.reply(Object.values(json.search).map((v) => { `*Title:*\n${v.title}\n*Snippet:*\n${v.snippet}\n*Time:*\n${v.timestamp}` })
}
}
handler.command = handler.help = ['nhentaipdf', 'gosearch', 'wikisearch']
handler.tags = ['internet']

export default handler