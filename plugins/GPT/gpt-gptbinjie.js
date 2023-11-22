import axios from 'axios';

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
let result = await generate(text)
await m.reply(result)
} catch (e) {
await m.reply(eror)
}
}
handler.help = ["gptbinjie"]
handler.tags = ["gpt"];
handler.command = /^(gptbinjie)$/i
export default handler

/* New Line */
async function generate(q) {
  try {
const BinjieBaseURL = "https://api.binjie.fun/api/generateStream";
    const response = await axios.post(BinjieBaseURL, {
        prompt: q,
        system: "Hello!",
        withoutContext: true,
        stream: false
    }, {
        headers: {
            origin: "https://chat.jinshutuan.com",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.79 Safari/537.36"
        }
    });
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data.message;
  }
}