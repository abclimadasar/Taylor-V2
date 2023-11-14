import fetch from "node-fetch";

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    if (!m.quoted) return m.reply("Reply Teks/Audio untuk menggunakan gpt ini");

    try {
        if (m.quoted.text) {
            let res = await gptChat(m.quoted.text);
            await m.reply(res.data);
        } else if (m.quoted.mimetype.includes("audio")) {
            let audioBuff = await m.quoted.download();
            let res = await gptAudio(audioBuff);
            await m.reply(res.data);
        } else return m.reply("Reply Teks/Audio untuk menggunakan gpt ini");
    } catch (e) {
        console.error('An error occurred:', e.message);
        await m.reply('Error occurred. Please try again.');
    }
};

handler.help = ["chatgptt"];
handler.tags = ["gpt"];
handler.command = /^(chatgptt)$/i;

export default handler;

/* New Line */
async function gptAudio(audioBuffer) {
    try {
        const data = new FormData();
        const blob = new Blob([audioBuffer.toArrayBuffer()], { type: 'audio/mpeg' });
        data.append('_wpnonce', '5e2498d71a');
        data.append('post_id', '22');
        data.append('action', 'wpaicg_chatbox_message');
        data.append('audio', blob, 'wpaicg-chat-recording.wav');
        const response = await fetch('https://chatgptt.me/wp-admin/admin-ajax.php', { method: 'POST', body: data });

        if (!response.ok) throw new Error('Network response was not ok');

        return await response.json();
    } catch (error) {
        console.error('An error occurred:', error.message);
        throw error;
    }
}

async function gptChat(message) {
    try {
        const data = new FormData();
        data.append('_wpnonce', '5e2498d71a');
        data.append('post_id', '22');
        data.append('action', 'wpaicg_chatbox_message');
        data.append('message', message);
        const response = await fetch('https://chatgptt.me/wp-admin/admin-ajax.php', { method: 'POST', body: data });

        if (!response.ok) throw new Error('Network response was not ok');

        return await response.json();
    } catch (error) {
        console.error('An error occurred:', error.message);
        throw error;
    }
}
