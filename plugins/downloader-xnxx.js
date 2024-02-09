var fetch = require("node-fetch")
var handler = async (m, {
    text,
}) => {
    if (command == 'xnxxdl') {
        if (!text) throw 'Masukkan Query Link!'
        try {
            let anu = await fetch(`https://api.botcahx.eu.org/api/download/xnxxdl?url=${encodeURIComponent(text)}&apikey=${btc}`)
            let hasil = await anu.json()
            await conn.reply(m.chat, wait, m)
            await conn.sendMessage(m.chat, { video: { url: hasil.result.url }, fileName: 'xnxx.mp4', mimetype: 'video/mp4' }, { quoted: m })
        } catch (e) {
            throw `Data Tidak Ditemukan!`
        }
    }

    if (command == 'xnxxsearch') {
        if (!text) {
            throw `Contoh:\n${usedPrefix + command} boobs`;
        }
        try {
            const search = await fetch(
                `https://api.botcahx.eu.org/api/search/xnxx?query=${encodeURIComponent(text)}&apikey=${btc}`
            );
            const hasil = await search.json();

            let teks = `*XNXX RESULTS* \n\n🔍 *KEYWORDS* *${text}*\n\n`;
            let no = 1;

            for (let i of hasil.result) {
                teks += `📑 *No* : ${no++}\n📚 *Title* : ${i.title}\n⏱️ *Duration* : ${i.duration}\n🔗 *URL* ${i.link}\n\n─────────────────\n\n`;
            }

            await conn.reply(m.chat, wait, m)
            await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
            await conn.sendMessage(m.chat, { image: { url: hasil.result[0].thumb }, caption: teks }, { quoted: m });
        } catch (e) {
            throw `Data Tidak Ditemukan!`
        }
    }
}
handler.command = handler.help = ['xnxxdl', 'xnxxsearch'];
handler.tags = ['downloader'];
module.exports = handler;