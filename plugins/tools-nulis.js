let fetch = require("node-fetch");
let handler = async (m, { conn, text }) => {
    if (!text) throw "Masukkan teksnya!";
    await conn.reply(m.chat, wait, m);
    await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
    try {
        let buff =
            `https://api.lolhuman.xyz/api/nulis?apikey=${lol}&text=` +
            {
                text,
                nama: conn.getName(m.sender),
                kelas: " ",
            };
        await conn.sendFile(m.chat, buff, "nulis.jpg", "", m);
    } catch (e) {
        throw `Data Tidak Ditemukan! ${e.message}`;
    }
};
handler.help = ['n'].map(v => v + 'ulis <teks>')
handler.tags = ['tools']
handler.command = /^nulis$/i

module.exports = handler;
