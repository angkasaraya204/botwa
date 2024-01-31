const fetch = require("node-fetch");

let handler = async (m, { text, usedPrefix, command, conn }) => {
    if (!text) {
        throw `Ini prompt genereator anime, nanti otomatis di lanjutin.\n\nContoh:\n${usedPrefix + command} 1girl, spy x`;
    }
    await conn.reply(m.chat, wait, m);
    await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

    try {
        const resprompt = await fetch(
            "https://api-inference.huggingface.co/models/FredZhang7/anime-anything-promptgen-v2",
            {
                headers: { 
                    Authorization: "Bearer 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",
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: decodeURIComponent(text),
            }
        ).then(res => res.json());
        let messageprompt = '';
        for (let i = 0; i < resprompt.length; i++) {
            messageprompt += `Lanjutannya: ${resprompt[i].generated_text}`;
        }
        await conn.sendMessage(m.chat, { text: messageprompt }, { quoted: m });
    } catch (error) {
        throw 'Model sedang loading, silakan coba lagi dalam beberapa menit.'
    }
};

handler.command = handler.help = ['promptgen'];
handler.tags = ['ai'];
module.exports = handler;