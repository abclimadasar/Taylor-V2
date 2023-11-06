import fetch from 'node-fetch'
let handler = async (m, {
    conn
}) => {
    const response = await fetch("https://techy-api.vercel.app/api/json");
    const data = await response.json();
    await conn.sendReact(m.chat, "⏳", m.key);
    await conn.sendMessage(m.chat, {
        text: data.message,
        contextInfo: {
            externalAdReply: {
                    title: "The bot is active now.",
                    thumbnail: await (await conn.getFile("https://cdn-icons-png.flaticon.com/128/12225/12225958.png")).data
                },
            mentionedJid: [m.sender],
        },
    }, { quoted: m });
    await conn.sendReact(m.chat, "✅", m.key);
}
handler.customPrefix = /^(tes|tess|test)$/i
handler.command = new RegExp

export default handler