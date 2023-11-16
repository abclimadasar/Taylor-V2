import fetch from "node-fetch";

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
		let res = await mariTalk(text)
		await m.reply(res.answer)
	} catch (e) {
		await m.reply(eror)
	}
};
handler.help = ["maritalk"];
handler.tags = ["ai"];
handler.command = /^(maritalk)$/i;

export default handler;

/* New Line */
async function mariTalk(q) {
	try {
		const response = await fetch('https://chat.maritaca.ai/api/chat/inference', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'key 100967333014773694334$301a2d09eb5a949372342c6ce125335b346740cecd46dbe12fc2fa326cf315f3',
			},
			body: JSON.stringify({
				messages: [{
						role: 'assistant',
						content: 'Hello!',
					},
					{
						role: 'user',
						content: q,
					},
				],
			}),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const result = await response.json();
		return result;
	} catch (error) {
		console.error('Error fetching data:', error.message);
		throw error;
	}
}