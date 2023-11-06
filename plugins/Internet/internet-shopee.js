import fetch from 'node-fetch'
import fs from 'fs'
let handler = async(m, { conn, usedPrefix, text, args, command }) => {

    if (!text) throw `Contoh penggunaan ${usedPrefix}${command} japan`
let f = await fetch(`https://api.lolhuman.xyz/api/shopee?apikey=sonelganz&query=${text}`)
let xx = await f.json()
let str = xx.result.map((v, index) => {
        return `${1 + index}. *${v.name}*

💰 *Price:* *RP* ${v.price}
🛒 *Sold:* ${v.sold}
📦 *Stock:* ${v.stock}
📍 *Shop Location:* ${v.shop_loc}

🔗 *Product Link:*
${v.link_produk}
🖼️ *Image Cover:*
${v.image_cover}

📝 *Description:* ${v.desc}
${cmenua}
`.trim()
    }).join(`\n\n*${htki} SHOPEE ${htka}*\n\n`)

let weem = `📮 *Note:* Jangan beli sembarangan`
let mim_ = ["application/vnd.openxmlformats-officedocument.presentationml.presentation","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.openxmlformats-officedocument.wordprocessingml.document","text/rtf"]
    await conn.sendFile(m.chat, xx.result[0].image_cover, '', str, m)
}

handler.help = ['shopii'].map(v => v + ' <app>')
handler.command = ['shopii']
handler.tags = ['internet']

export default handler
