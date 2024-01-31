var fetch = require("node-fetch");

var handler = async (m, { text, usedPrefix, command }) => {
    if (command == 'nekosearch') {
        if (!text) {
            throw `Contoh:\n${usedPrefix + command} isekai.\nMenampilkan 10 Data!`;
        }
        await conn.reply(m.chat, wait, m)
        await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
        try {
            let detailneko = await fetch(
                `https://api.lolhuman.xyz/api/nekopoisearch?apikey=${lol}&query=${encodeURIComponent(text)}`
            );
            let hasilneko = await detailneko.json();

            let teksneko = `Menampilkan 10 Data Pencarian Hentai!\n\n*Completed RESULTS*\n\n🔍 *KEYWORDS* *${text}*\n\n`;
            let noneko = 1;

            for (let ipneko of hasilneko.result) {
                teksneko += `📑 *No* : ${noneko++}\n*Judul* : ${ipneko.title}\n*Link* : ${ipneko.link}\n\n─────────────────\n\n`;
            }
            
            await conn.sendMessage(m.chat, { image: { url: hasilneko.result[0].thumbnail}, caption: teksneko }, { quoted: m });
        } catch (e) {
            throw `Data Tidak Ditemukan!`
        }
    }

    if (command == 'nekodetail') {
        if (!text) {
            throw `Contoh:\n${usedPrefix + command} https://nekopoi.care/isekai-harem-monogatari-episode-4-subtitle-indonesia/.\nAmbil yang per-episodenya.`;
        }
        await conn.reply(m.chat, wait, m)
        await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

        try {
            let detailneko2 = await fetch(
                `https://api.lolhuman.xyz/api/nekopoi?apikey=${lol}&url=${encodeURIComponent(text)}`
            );
            let hasilneko2 = await detailneko2.json();
            let convdetail = hasilneko2.result;

            let detailnekos = `*Detail Anime:*\n\n*Judul* : ${convdetail.title}\n*Produser* : ${convdetail.producers}\n*Durasi* : ${convdetail.duration}\n*Sinopsis* : ${convdetail.sinopsis}\n\n`;

            let downloadList = `*Daftar Download:*\n\n`;
            for (let quality in convdetail.link) {
                downloadList += `*${quality}*\n`;
                for (let source in convdetail.link[quality]) {
                    downloadList += `*${source}* : ${convdetail.link[quality][source]}\n`;
                }
                downloadList += '\n';
            }

            await conn.sendMessage(m.chat, { image: { url: convdetail.thumbnail }, caption: detailnekos + downloadList }, { quoted: m });
        } catch (e) {
            throw `Data Tidak Ditemukan!`
        }
    }
};

handler.command = handler.help = ['nekosearch', 'nekodetail'];
handler.tags = ['wibu'];

module.exports = handler;