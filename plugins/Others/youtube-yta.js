import {
    youtubedl,
    youtubedlv2
} from "@bochilteam/scraper"
import fetch from "node-fetch"
import ytdl from "ytdl-core"

let handler = async (m, {
    conn,
    args
}) => {
    if (!args[0]) throw "[ Masukkan Url Youtube! ]"
    await conn.reply(m.chat, wait, m)
    try {
        
        let Ytdl = await ytmp3(args[0])
        let dls = "Download audio succes ( V1 )"
        let ytthumb = await (await conn.getFile(Ytdl.meta.image)).data
        let doc = {
            audio: Ytdl.buffer,
            mimetype: "audio/mp4",
            fileName: Ytdl.meta.title,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 2,
                    mediaUrl: args[0],
                    title: Ytdl.meta.title,
                    body: dls,
                    sourceUrl: args[0],
                    thumbnail: ytthumb
                }
            }
        }

        await conn.sendMessage(m.chat, doc, {
            quoted: m
        })

    } catch {
        try {
            
            let yt = await youtubedlv2(args[0]).catch(async _ => await youtubedl(args[0]))
            let link = await yt.audio["128kbps"].download()
            let ytl = "https://youtube.com/watch?v="
            let dls = "Download audio succes ( V2 )"
            let ytthumb = await (await conn.getFile(yt.thumbnail)).data
            let doc = {
                audio: {
                    url: link
                },
                mimetype: "audio/mp4",
                fileName: yt.title,
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        mediaType: 2,
                        mediaUrl: ytl + yt.id,
                        title: yt.title,
                        body: dls,
                        sourceUrl: ytl + yt.id,
                        thumbnail: ytthumb
                    }
                }
            }

            await conn.sendMessage(m.chat, doc, {
                quoted: m
            })

        } catch {
            try {
                
                let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${lolkey}&url=${args[0]}`)
                let lolh = await lolhuman.json()
                let n = lolh.result.title || "error"
                await conn.sendMessage(m.chat, {
                    audio: {
                        url: lolh.result.link
                    },
                    fileName: `${n}.mp3`,
                    mimetype: "audio/mp4"
                }, {
                    quoted: m
                })
            } catch {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["mp3", "a"].map(v => "yt" + v + ` <url> <without message>`)
handler.tags = ["downloader"]
handler.command = /^y((outube|tb)audio|(outube|tb?)mp3|utubaudio|taudio|ta)$/i

handler.exp = 0
handler.register = false
handler.limit = true

export default handler

async function ytmp3(url) {
    try {
        const {
            videoDetails
        } = await ytdl.getInfo(url, {
            lang: "id"
        });

        const stream = ytdl(url, {
            filter: "audioonly",
            quality: 140
        });
        const chunks = [];

        stream.on("data", (chunk) => {
            chunks.push(chunk);
        });

        await new Promise((resolve, reject) => {
            stream.on("end", resolve);
            stream.on("error", reject);
        });

        const buffer = Buffer.concat(chunks);

        return {
            meta: {
                title: videoDetails.title,
                channel: videoDetails.author.name,
                seconds: videoDetails.lengthSeconds,
                description: videoDetails.description,
                image: videoDetails.thumbnails.slice(-1)[0].url,
            },
            buffer: buffer,
            size: buffer.length,
        };
    } catch (error) {
        throw error;
    }
};