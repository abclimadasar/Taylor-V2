import gtts from 'node-gtts'
import {
    readFileSync,
    unlinkSync
} from 'fs'
import {
    join
} from 'path'
import fetch from 'node-fetch'
const defaultLang = 'id'
let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom());
let name = await conn.getName(who);

let lang = args[0] || defaultLang;
let text = args.slice(1).join(' ') || (m.quoted?.text || '');

try {
    if (!text) throw `Masukkan input. Contoh penggunaan: ${usedPrefix}${command} en Halo dunia`;

    let res = await tts(text, lang);

    if (res) {
        await conn.sendFile(m.chat, res, '', '', m, null, {
            ptt: true,
            waveform: [100, 0, 100, 0, 100, 0, 100],
            contextInfo: adReplyS.contextInfo
        });
    }
} catch (e) {
    m.reply(`${e}`);
    console.error('An error occurred:', e);
}

}
handler.help = ['tts <lang> <teks>']
handler.tags = ['tools']
handler.command = /^(gtts|tts)$/i

export default handler

function tts(text, lang = 'id') {
    console.log(lang, text)
    return new Promise((resolve, reject) => {
        try {
            let tts = gtts(lang)
            let filePath = join(global.__dirname(import.meta.url), '../../tmp', (1 * new Date) + '.wav')
            tts.save(filePath, text, () => {
                resolve(readFileSync(filePath))
                unlinkSync(filePath)
            })
        } catch (e) {
            reject(e)
        }
    })
}