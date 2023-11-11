/* Recode Wudysoft */
import {
	generateWAMessageFromContent
} from "@adiwajshing/baileys"
import moment from "moment-timezone"

let handler = async (m, {
	conn,
	groupMetadata,
	usedPrefix,
	command
}) => {
	await conn.sendReact(m.chat, "⏳", m.key)
	var soun = ["aku-ngakak",
		"anjay",
		"ara-ara2",
		"ara-ara-cowok",
		"ara-ara",
		"arigatou",
		"assalamualaikum",
		"asu",
		"ayank",
		"bacot",
		"bahagia-aku",
		"baka",
		"bansos",
		"beat-box2",
		"beat-box",
		"biasalah",
		"bidadari",
		"bot",
		"buka-pintu",
		"canda-anjing",
		"cepetan",
		"china",
		"cuekin-terus",
		"daisuki-dayo",
		"daisuki",
		"dengan-mu",
		"Donasiku",
		"gaboleh-gitu",
		"gak-lucu",
		"gamau",
		"gay",
		"gelay",
		"gitar",
		"gomenasai",
		"hai-bot",
		"hampa",
		"hayo",
		"hp-iphone",
		"ih-wibu",
		"i-like-you",
		"india",
		"karna-lo-wibu",
		"kiss",
		"kontol",
		"ku-coba",
		"maju-wibu",
		"makasih",
		"mastah",
		"menuasli",
		"menuku",
		"menu",
		"MenuYuki",
		"nande-nande",
		"nani",
		"ngadi-ngadi",
		"nikah",
		"nuina",
		"onichan",
		"ownerku",
		"owner-sange",
		"pak-sapardi",
		"pale",
		"pantek",
		"pasi-pasi",
		"punten",
		"sayang",
		"siapa-sih",
		"sudah-biasa",
		"summertime",
		"tanya-bapak-lu",
		"to-the-bone",
		"wajib",
		"waku",
		"woi",
		"yamete",
		"yowaimo",
		"yoyowaimo"
	].getRandom()
	var vn = "https://raw.githubusercontent.com/AyGemuy/HAORI-API/main/audio/" + soun + ".mp3"
	var gamb = [
		thumb,
		logo
	].getRandom()

	const caption = `*👋 Selamat datang di dashboard bot kami*!\n\n - Kami berharap Anda akan menikmati pengalaman berinteraksi dengan bot kami yang ramah dan intuitif.${readMore}\n\n - Kami telah menyertakan berbagai fitur yang dapat membantu Anda mengelola dan meningkatkan kinerja bot Anda.\n\n - Kami berharap Anda akan menikmati menggunakan dashboard bot kami dan semoga Anda mendapatkan manfaat dari fitur-fitur yang kami tawarkan.\n\n\n*[ LIST MENU ]*\n  - ${usedPrefix}menulist\n  - ${usedPrefix}allmenu\n\n`;

	await conn.sendMessage(m.chat, {
	document: Buffer.alloc(0),
	mimetype: [dpptx, ddocx, dxlsx, dpdf, drtf].getRandom(),
	fileName: "D A S H B O A R D",
	fileLength: fsizedoc,
	pageCount: fpagedoc,
	caption: caption,
	jpegThumbnail: await conn.resize(thumbdoc, 300, 150),
	contextInfo: {
		mentionedJid: [m.sender],
		externalAdReply: {
			body: bottime,
			containsAutoReply: true,
			mediaType: 1,
			mediaUrl: sgc,
			renderLargerThumbnail: true,
			sourceUrl: null,
			thumbnail: await (await conn.getFile(thumb)).data,
			thumbnailUrl: thumb,
			title: `${ucapan()} ${m.name}`
		}
	}
}, {
	quoted: m
})
	await conn.sendPresenceUpdate('recording', m.chat);
	await conn.sendFile(m.chat, vn, '', null, m, true, {
		ptt: true
	});
	await conn.sendReact(m.chat, "✅", m.key)

}
handler.help = ["menu", "help", "?"]
handler.tags = ["main"]
handler.command = /^(menu|help|\?)$/i

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function ucapan() {
    let waktunya = moment.tz("Asia/Makassar").format("HH");
    return waktunya >= 24 ? "Selamat Begadang 🗿" :
           waktunya >= 18 ? "Selamat malam 🌙" :
           waktunya >= 15 ? "Selamat sore 🌅" :
           waktunya > 10 ? "Selamat siang ☀️" :
           waktunya >= 4 ? "Selamat pagi 🌄" :
           "Selamat Pagi 🗿";
}