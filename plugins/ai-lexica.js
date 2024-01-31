let fetch = require('node-fetch')
let handler = async (m, { text, usedPrefix, command, conn }) => {
    if (!text) throw `*Contoh:* ${usedPrefix}${command} Seekor harimau berukuran besar setinggi gedung sedang menyerang manusia di tengah padatnya kota\nSemua ai prompt contohnya emang sama`;
    await conn.reply(m.chat, wait, m)
    await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
    try {
        let response = `https://api.akuari.my.id/ai/lexica?prompt=${encodeURIComponent(text)}`
        conn.sendFile(m.chat, response, 'image.jpg', `Result: ${text}`, m)
    } catch (e) {
        throw 'Model sedang loading, silakan coba lagi dalam beberapa menit.'
    }

}
handler.command = handler.help = ['lexica']
handler.tags = ['ai']
module.exports = handler