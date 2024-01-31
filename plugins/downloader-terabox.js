var fetch = require("node-fetch");

var handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `Contoh:\n${usedPrefix + command} https://terabox.com/s/1ah0l69Zs2pLPH3euBduCig.`
    await conn.reply(m.chat, wait, m)
    await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
    try {
        const restera = await fetch(`https://rest-api.akuari.my.id/downloader/teraboxdl?link=${encodeURIComponent(text)}`);

        const hasiltera = await restera.json();

        let tekstera = `*TERABOX RESULTS*\n\n`;
        let notera = 1;

        for (let itera of hasiltera.linkdl) {
            tekstera += `📑 *No* : ${notera++}\n*Link Download* : ${itera}\n\n─────────────────\n\n`;
        }
        await conn.sendMessage(m.chat, { text: tekstera }, { quoted: m });
    } catch (e) {
        throw `Url tidak valid! ${e.message}`
    }
};

handler.command = handler.help = ['teraboxdl'];
handler.tags = ['downloader'];

module.exports = handler;