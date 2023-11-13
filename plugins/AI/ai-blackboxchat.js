import fetch from "node-fetch"

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
        let data = await generateText(text)
        if (data) {
                await m.reply(data);
            }
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["blackboxchat"]
handler.tags = ["ai"];
handler.command = /^(blackboxchat)$/i

export default handler

/* New Line */
async function generateText(content) {
  try {
    const messages = [{ role: "user", content: content }, { role: "assistant", content: "Hello!" }];
    const response = await fetch("https://www.blackbox.ai/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages, id: null, mode: "continue", userId: null }),
    });
    return await response.text();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
