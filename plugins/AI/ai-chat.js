import Aichat from "../../lib/ai/aichat.js";
const model = "gpt-3.5-turbo";

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "Input Teks"
    await m.reply(wait)
    try {
        const messages = [{ role: "system", content: "Anda adalah asisten yang membantu." }, { role: "user", content: text }];

    const output = await Aichat.createAsync(model, messages);
    await m.reply(output);
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ['aichat'];
handler.tags = ['ai'];
handler.command = /^(aichat)$/i;

export default handler;