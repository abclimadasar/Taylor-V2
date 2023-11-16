import fetch from "node-fetch";
import crypto from "crypto";
import cheerio from "cheerio";

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
        const userId = await getUserId();
    const chatId = await createNewChat(userId);
    const output = await sendChatRequest(chatId, text);
    await m.reply(output);
    } catch (e) {
        await m.reply(eror)
    }
};
handler.help = ["chatgptdemo"];
handler.tags = ["gpt"];
handler.command = /^(chatgptdemo)$/i;

export default handler;

/* New Line */
const url_api_new_chat = "https://chat.chatgptdemo.net/new_chat";
const url_api_stream = "https://chat.chatgptdemo.net/chat_api_stream";

async function getUserId() {
    const html = await (await fetch("https://chat.chatgptdemo.net")).text();
    return cheerio.load(html)("#USERID").text().trim();
}

async function createNewChat(userId) {
    const { id_ } = await (await fetch(url_api_new_chat, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
    })).json();

    return id_;
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1);
    const [month, day, year, hours, minutes, seconds, ampm] = [
        date.getMonth() + 1,
        date.getDate(),
        date.getFullYear(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getHours() >= 12 ? "PM" : "AM",
    ];
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    
    return `${month}/${day}/${year}, ${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
}

async function sendChatRequest(chatId, question) {
    const response = await fetch(url_api_stream, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            question,
            chat_id: chatId,
            timestamp: formatTimestamp(new Date())
        }),
    });

    const result = await response.text();
    return result
    .split('\n\n')
    .filter(data => data.includes('data: {"id":"chatcmpl'))
    .map(data => {
      try {
        return JSON.parse(data.match(/{.*}/)?.[0]);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
      }
    })
    .filter(Boolean)
    .map(data => data.choices[0].delta.content)
    .join('');
}