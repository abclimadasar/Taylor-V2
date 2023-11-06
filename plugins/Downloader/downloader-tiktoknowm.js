import fetch from 'node-fetch'
import axios from 'axios'
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
if (!args[0]) throw 'Masukkan Link'
try {
    let listSections = []
	listSections.push(['No. ' + ++index, [
          ['Metode A', usedPrefix + command + ' ' + args[0] + ' a', '\n⌚ *By:* ' + author],
          ['Metode B', usedPrefix + command + ' ' + args[0] + ' b', '\n⌚ *By:* ' + author],
          ['Metode C', usedPrefix + command + ' ' + args[0] + ' c', '\n⌚ *By:* ' + author]
                  ]])
        if (args[0]) return conn.sendList(m.chat, htki + ' 📺 Tiktok Search 🔎 ' + htka, `⚡ Silakan pilih Tiktok Search di tombol di bawah...\n*Teks yang anda kirim:* ${args[0]}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, `☂️ Tiktok Search Disini ☂️`, listSections, m)

if (args[1] == 'a') {
  let res = await fetch(`https://api.lolhuman.xyz/api/tiktok?apikey=${global.lolkey}&url=${args[0]}`)
    let json = await res.json()
    let txt = `🚀 *Link:* ${await(await axios.get(`https://tinyurl.com/api-create.php?url=${args[0]}`)).data}` 
    conn.sendFile(m.chat, json.result.link, '', txt, m)
    }
    if (args[1] == 'b') {
    let res = await fetch(`https://api.lolhuman.xyz/api/tiktok2?apikey=${global.lolkey}&url=${args[0]}`)
    let json = await res.json()
    let txt = `🚀 *Link:* ${await(await axios.get(`https://tinyurl.com/api-create.php?url=${args[0]}`)).data}` 
    conn.sendFile(m.chat, json.result.link, '', txt, m)
    }
    if (args[1] == 'c') {
    let res = await fetch(`https://api.lolhuman.xyz/api/tiktok3?apikey=${global.lolkey}&url=${args[0]}`)
    let json = await res.json()
    let txt = `🚀 *Link:* ${await(await axios.get(`https://tinyurl.com/api-create.php?url=${args[0]}`)).data}` 
    conn.sendFile(m.chat, json.result.link, '', txt, m)
    }
    } catch (e) {
    throw eror
    }
}
handler.help = ['tiktoknowm'].map(v => v + ' <url>')
handler.tags = ['downloader', 'premium']
handler.command = /^(tiktoknowm)$/i
handler.premium = false
export default handler
