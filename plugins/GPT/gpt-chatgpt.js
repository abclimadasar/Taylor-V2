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
        let res = await ChatGptV1(text)
        await m.reply(res)
    } catch (e) {
        try {
            let res = await ChatGptV2(text)
            await m.reply(res)
        } catch (e) {
            try {
                let res = await ChatGptV3(text)
                await m.reply(res[0].generated_text)
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["chatgpt"]
handler.tags = ["internet", "ai", "gpt"];
handler.command = /^(chatgpt)$/i

export default handler

/* New Line */
async function ChatGptV1(query) {
    try {
        const response = await fetch(`https://shanti.quest/gpt?prompt=${query}`);
        if (!response.ok) throw new Error('Network response was not OK');
        return await response.text();
    } catch (error) {
        console.error('Error:', error.message);
    }
}


async function ChatGptV2(query) {
    try {
        const response = await fetch(`https://api.yanzbotz.my.id/api/ai/gpt3?query=${query}`);
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function ChatGptV3(query) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/gpt2", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Authorization: "Bearer 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",
                },
                body: JSON.stringify({
                    inputs: query
                }),
            }
        );
        return await response.json();
    } catch (error) {
        console.error('Error:', error.message);
    }
}