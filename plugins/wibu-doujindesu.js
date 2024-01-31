var fetch = require("node-fetch");

var handler = async (m, { text, usedPrefix, command }) => {
    if (command == 'doudesusearch') {
        if (!text) {
            // throw `Contoh:\n${usedPrefix + command} 434243.`;
            throw `Segera.`;
        }
        
    }

    if (command == 'doudesudl') {
        if (!text) {
            // throw `Contoh:\n${usedPrefix + command} 434243.`;
            throw `Segera.`;
        }
        // await conn.reply(m.chat, wait, m)
        // await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
        // try {
        //     const searchdoudesu = await fetch(
        //         `https://api.lolhuman.xyz/api/doujindesu?apikey=${lol}&url=${encodeURIComponent(text)}`
        //     );
        //     const hasildoudesu = await searchdoudesu.json();
        //     let idoudesu = hasildoudesu.result;

        //     let teksdl = `*Judul* : ${idoudesu.title}\n*Link Download* : ${idoudesu.link_dl}`;
            
        //     await conn.sendMessage(m.chat, { text: teksdl }, { quoted: m });
        // } catch (e) {
        //     throw `Data Tidak Ditemukan!`
        // }
    }
};

handler.command = handler.help = ['doudesusearch', 'doudesudl'];
handler.tags = ['wibu'];

module.exports = handler;