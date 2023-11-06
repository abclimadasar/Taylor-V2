import {
	tiktokTts,
	ttsModel
} from '../../lib/scraper/scraper-toolv2.js';

let handler = async (m, {
	command,
	usedPrefix,
	conn,
	text,
	args
}) => {
	const data = await ttsModel();

	let [urutan, tema] = text.split("|")
	const mesg = "Input query!\n*Example:*\n" + usedPrefix + command + " [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n")
	if (!tema) return m.reply()

	await m.reply(wait)
	try {
		if (!urutan) return m.reply(mesg)
		if (isNaN(urutan)) return m.reply(mesg)
		if (urutan > data.length) return m.reply(mesg)
		let out = data[urutan - 1].id
		const res = await tiktokTts(tema, out)
		if (res) {
			const base64Data = Buffer.from(res.data, 'base64');
			await conn.sendMessage(m.chat, {
				audio: base64Data,
				mimetype: 'audio/mp4',
				ptt: true,
				waveform: [100, 0, 100, 0, 100, 0, 100]
			}, {
				quoted: m
			})
		} else {
			console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
		}
	} catch (e) {
		await m.reply(eror)
	}
}
handler.help = ["tiktts *[nomor]|[query]*"]
handler.tags = ["ai"]
handler.command = /^(tiktts)$/i
export default handler