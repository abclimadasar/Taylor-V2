const {
	videoConvert
} = await (await import('../../lib/converter.js'))

let handler = async (m, {
	conn,
	usedPrefix,
	args,
	command
}) => {
	switch (command) {
		case "hdvid": {
			conn.hdvid = conn.hdvid ? conn.hdvid : {};
			let q = m.quoted ? m.quoted : m
			let mime = q.mtype || ""
			if (!mime)
				throw `Fotonya Mana...?`;
			if (!/imageMessage/g.test(mime))
				throw `Mime ${mime} tidak support`;
			else conn.hdvid[m.sender] = true;
			m.reply(wait);
			let error;
			try {
				const additionalFFmpegOptions = [
					'-c:v', 'libx264',
					'-crf', args[2] || '20',
					'-b:v', args[1] || '8M',
					'-s', args[0] || '720x1280',
					'-x264opts', 'keyint=30:min-keyint=30',
				];
				const videoBuffer = await q.download?.();
				const additionalArgs = [
					...additionalFFmpegOptions,
					'-q:v', args[3] || '30'
				];
				const buff = await videoConvert(videoBuffer, additionalArgs)
				await m.reply(buff)
			} catch (er) {
				error = true;
			} finally {
				if (error) {
					m.reply("Proses Gagal :(");
				}
				delete conn.hdvid[m.sender];
			}
		}
		break;
	}
};
handler.help = ["hdvid"];
handler.tags = ["tools"];
handler.command = ["hdvid"];
export default handler;