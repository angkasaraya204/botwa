var fetch = require("node-fetch");

var handler = async (m, { text, usedPrefix, command }) => {
    if (command == 'pixivdl') {
        if (!text) throw 'Masukkan Id 8 digit!'
        await conn.reply(m.chat, wait, m)
        await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
        try {
            const downpxv = `https://rest-api.akuari.my.id/downloader/pixiv?id=${encodeURIComponent(text)}&ext=.jpg`
            await conn.sendFile(m.chat, downpxv, 'pixivdl.jpg', '', m);
        } catch (e) {
            throw `Data Tidak Ditemukan!`
        }
    }

    if (command == 'pixivsearch') {
        if (!text) {
            throw `Contoh:\n${usedPrefix + command} milf.\nMenampilkan 10 Data!`;
        }
        await conn.reply(m.chat, wait, m)
        await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
        try {
            const searchpxv = await fetch(
                `https://rest-api.akuari.my.id/search/pixiv?query=${encodeURIComponent(text)}`
            );
            const hasilpxv = await searchpxv.json();

            let tekspxv = `*PIXIV RESULTS* \n\n🔍 *KEYWORDS* *${text}*\n\n`;
            let nopxv = 1;

            for (let ipxv of hasilpxv.result) {
                tekspxv += `📑 *No* : ${nopxv++}\n*Id* : ${ipxv.pid}\n*Judul* : ${ipxv.title}\n*Author* : ${ipxv.author}\n*Tags* : ${ipxv.tags}\n\n─────────────────\n\n`;
            }
            await conn.sendMessage(m.chat, { image: { url: hasilpxv.result[0].urls.regular }, caption: tekspxv }, { quoted: m });
        } catch (e) {
            throw `Data Tidak Ditemukan!`
        }
    }
};

handler.command = handler.help = ['pixivdl', 'pixivsearch'];
handler.tags = ['wibu'];

module.exports = handler;