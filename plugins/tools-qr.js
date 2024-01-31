let qrcode = require("qrcode")

let handler = async (m, { conn, text }) => {
  if (!text) throw 'teksnya mana?'
  await conn.sendFile(m.chat, await qrcode.toDataURL(text.slice(0, 2048), { scale: 8 }), 'qrcode.png', '', m)
}

handler.command = handler.help = ['qrcode']
handler.tags = ['tools']
handler.fail = null

module.exports = handler
