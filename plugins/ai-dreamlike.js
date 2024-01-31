const fetch = require("node-fetch");

let handler = async (m, { text, usedPrefix, command, conn }) => {
    if (!text) {
        throw `Contoh:\n${usedPrefix + command} actual 8K portrait photo of gareth person, portrait, happy colors, bright eyes, clear eyes, warm smile, smooth soft skin, big dreamy eyes, beautiful intricate colored hair, symmetrical, anime wide eyes, soft lighting, detailed face, by makoto shinkai, stanley artgerm lau, wlop, rossdraws, concept art, digital painting, looking into camera`;
    }
    await conn.reply(m.chat, wait, m);
    await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

    try {
        const resdream = await fetch(
            "https://api-inference.huggingface.co/models/jayavibhav/anime-dreamlike",
            {
                headers: { 
                    Authorization: "Bearer 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",
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: decodeURIComponent(text),
            }
        ).then(res => res.buffer());
        await conn.sendFile(m.chat, resdream, 'dreamlike.jpg', `Result: ${text}`, m);
    } catch (error) {
        throw 'Model sedang loading, silakan coba lagi dalam beberapa menit.'
    }
};

handler.command = handler.help = ['dreamlike'];
handler.tags = ['ai'];
module.exports = handler;