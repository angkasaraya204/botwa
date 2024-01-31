const uploadImage = require('../lib/uploadImage');
const fetch = require('node-fetch');
let handler = async (m, {
	conn,
	usedPrefix,
	command
}) => {
	var q = m.quoted ? m.quoted : m
	var mime = (q.msg || q).mimetype || q.mediaType || ''
	if (command == 'jadianime') {
		if (/image/g.test(mime) && !/webp/g.test(mime)) {
			await conn.reply(m.chat, wait, m)
			await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
			try {
				const img = await q.download?.()
				let out = await uploadImage(img)
				let old = new Date()
				let res = await fetch(`https://api.botcahx.eu.org/api/maker/jadianime?url=${out}&apikey=${btc}`)
				let convert = await res.json()
				let buff = await fetch(convert.result.img_crop_single)
					.then(res => res.buffer())
				await conn.sendMessage(m.chat, { image: buff, caption: `🍟 *Fetching* : ${((new Date - old) * 1)} ms` }, { quoted: m })
			} catch (e) {
				throw `[ ! ] Identifikasi Gagal.`
			}
		} else {
			throw `Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`
		}
	}

	if (command == 'jadianime3d') {
		if (/image/g.test(mime) && !/webp/g.test(mime)) {
			await conn.reply(m.chat, wait, m)
			await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
			try {
				const img2 = await q.download?.()
				let out2 = await uploadImage(img2)
				let old2 = new Date()
				let res2 = await fetch(`https://api.botcahx.eu.org/api/maker/jadianime3d?url=${out2}&apikey=${btc}`)
				let convert2 = await res2.json()
				let buff2 = await fetch(convert2.result.output.fileUrl)
					.then(res => res.buffer())
				await conn.sendMessage(m.chat, { image: buff2, caption: `🍟 *Fetching* : ${((new Date - old2) * 1)} ms` }, { quoted: m })
			} catch (e) {
				throw `[ ! ] Identifikasi Gagal.`
			}
		} else {
			throw `Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`
		}
	}
};
handler.command = handler.help = ['jadianime', 'jadianime3d'];
handler.tags = ['maker'];
handler.limit = 5;
module.exports = handler;
