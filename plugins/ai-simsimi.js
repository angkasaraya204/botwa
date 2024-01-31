let fetch = require('node-fetch')

let handler = async (m, { text }) => {
  if (!text) throw `Masukan pertanyaan!`
  await conn.reply(m.chat, wait, m);
  await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

  try {
    let res = await fetch(`https://api.lolhuman.xyz/api/simi?apikey=${lol}&text=${encodeURIComponent(text)}&badword=false`)
    let json = await res.json()
    await m.reply(json.result)
  } catch (e) {
    throw `Internal server eror! ${e.messae}`
  }
}

handler.command = handler.help = ['simi']
handler.tags = ['ai']

module.exports = handler
