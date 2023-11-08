import fetch from 'node-fetch';

let handler = async (m, {
	text,
	command,
	usedPrefix
}) => {
	const [model, question] = text.split("|")
	if (!(model, question)) return m.reply("*Example:*\n" + usedPrefix + command + " js|buat console log")
	try {
		const msg = await fetchAndParse(model, question)
		await conn.reply(m.chat, msg, m, adReply)
	} catch (e) {
		return m.reply(eror)
	}
}
handler.command = /^(zcode)$/i
export default handler

async function fetchAndParse(p1, p2) {
	try {
		const url = 'https://zzzcode.ai/api/tools/answer-question';
		const payload = {
			p1,
			p2,
			option1: "3 - A detailed answer",
			option2: "Professional",
			option3: "Indonesian"
		};

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload),
		});
		const input = await response.text();
		const match = input.match(/zzzredirectmessageidzzz:\s*([a-zA-Z0-9-]+)/);
		const id = match ? match[1] : null;

		const url2 = 'https://zzzcode.ai/api/tools/answer-question';
		const response2 = await fetch(url2, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id
			})
		});

		const output = await response2.text();
		const lines = output
			.split('\n')
			.slice(1, -3)
		const parsedLines = lines.map(line => {
			if (line.startsWith('data: "')) {
				return JSON.parse(`{"msg": "${line.slice(7, -1)}"}`);
			}
			return JSON.parse(`{"msg": "${line}"}`);
		});
		return parsedLines.map(parsedLine => parsedLine.msg).join('')
	} catch (e) {
		return null
	}
}