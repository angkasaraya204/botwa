const fs = require('fs')

let handler = async (m, { conn, command, usedPrefix }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (/image/.test(mime)) {
  let media = await q.download()
  m.reply(stiker_wait)
  let encmedia = await conn.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
  await fs.unlinkSync(encmedia)
  } else if (/video/.test(mime)) {
  if ((q.msg || q).seconds > 10) return m.reply('maksimal 10 detik!')
  let media = await q.download()
  m.reply(stiker_wait)
  let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
  await fs.unlinkSync(encmedia)
  } else {
  throw `Kirim Gambar/Video Dengan Caption ${usedPrefix + command}\nDurasi Video 1-10 Detik`
  }
    }
handler.help = handler.tags = ['sticker']
handler.command = /^(stiker|s|sticker)$/i
module.exports = handler