const uploadImage = require('../lib/uploadImage');
const fetch = require('node-fetch');

let handler = async (m, {
	conn
}) => {
	var q = m.quoted ? m.quoted : m
	var mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/image/g.test(mime) && !/webp/g.test(mime)) {
        await conn.reply(m.chat, wait, m)
        await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
        try {
            const imgnime = await q.download?.()
            let outnime = await uploadImage(imgnime)
            let resnime = await fetch(`https://api.lolhuman.xyz/api/wait?apikey=${lol}&img=${outnime}`)
            let convertnime = await resnime.json()
            let inime = convertnime.result

            let teksnime = `*Anilist Id* : ${inime.anilist_id}\n*MAL Id* : ${inime.mal_id}\n*Judul* : ${inime.title_romaji}\n*Jp* : ${inime.title_native}\n*Eng* : ${inime.title_english}\n*Episode* : ${inime.episode}\n*Dari* : ${inime.at}\n*Mirip* : ${inime.similarity}`;

            await conn.sendMessage(m.chat, { image: { url: inime.video }, caption: teksnime }, { quoted: m })
        } catch (e) {
            throw `[ ! ] Identifikasi Gagal.`
        }
    } else {
        await conn.reply(m.chat, wait, m)
        await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
        try {
            let resnime2 = await fetch(`https://api.lolhuman.xyz/api/wait?apikey=${lol}&img=${encodeURIComponent(text)}`)
            let convertnime2 = await resnime2.json()
            let inime2 = convertnime2.result

            let teksnime2 = `*Anilist Id* : ${inime2.anilist_id}\n*MAL Id* : ${inime2.mal_id}\n*Judul* : ${inime2.title_romaji}\n*Jp* : ${inime2.title_native}\n*Eng* : ${inime2.title_english}\n*Episode* : ${inime2.episode}\n*Dari* : ${inime2.at}\n*Mirip* : ${inime2.similarity}`;

            await conn.sendMessage(m.chat, { image: { url: inime2.video }, caption: teksnime2 }, { quoted: m })
        } catch (e) {
            throw `[ ! ] Identifikasi Gagal.`
        }
    }
};
handler.command = handler.help = ['whatnime'];
handler.tags = ['wibu'];
module.exports = handler;
