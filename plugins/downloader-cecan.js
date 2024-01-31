let fetch = require('node-fetch')

let handler = async (m, { conn, command }) => {
    let api1 = `https://api.botcahx.eu.org/api/cecan/${command}?apikey=${btc}`
    let buffer = await fetch(api1)
        .then(res => res.buffer())
        .catch(async (err) => {
            console.log(`API 1 failed with error: ${err}.`)
        })
    await conn.reply(m.chat, wait, m)
    await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
    conn.sendFile(m.chat, buffer, 'hasil.jpg', `Random ${command}`, m)
}

handler.command = ['china','vietnam','thailand','indonesia','korea','japan','malaysia','justinaxie','jeni','jiso','ryujin','rose','hijaber']
handler.tags = ['downloader'];
handler.limit = true;
module.exports = handler;
