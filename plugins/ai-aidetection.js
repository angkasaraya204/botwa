const uploadImage = require('../lib/uploadImage');
const fetch = require("node-fetch");

let handler = async (m, {
    conn,
    usedPrefix,
    command
}) => {
    var q = m.quoted ? m.quoted : m
	var mime = (q.msg || q).mimetype || q.mediaType || ''
    if (/image/g.test(mime) && !/webp/g.test(mime)) {
        await conn.reply(m.chat, wait, m)
        await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
        try {
            const img = await q.download?.()
            let outaidet = await uploadImage(img)
            const resaidet = await fetch(
                "https://api-inference.huggingface.co/models/saltacc/anime-ai-detect",
                {
                    headers: { 
                        Authorization: "Bearer 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",
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: outaidet,
                }
            ).then(res => res.json());
            let messageaidet = '';
            for(let i = 0; i < resaidet.length; i++) {
                let score = resaidet[i].score.toFixed(3); // Ambil 3 angka di belakang koma
                messageaidet += `Label: ${resaidet[i].label}, Score: ${score}\n`;
            }
            await conn.sendMessage(m.chat, { text: messageaidet }, { quoted: m });
        } catch (error) {
            throw 'Model sedang loading, silakan coba lagi dalam beberapa menit.'
        }
    } else {
		m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
	}
};

handler.command = handler.help = ['aidetect'];
handler.tags = ['ai'];
module.exports = handler;