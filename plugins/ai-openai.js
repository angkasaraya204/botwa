var fetch = require('node-fetch');
const uploadImage = require('../lib/uploadImage');

var handler = async (m, {
  text,
  usedPrefix,
  command
}) => {
  if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* ${usedPrefix}${command} Siapa presiden Indonesia?\n\nSemua ai chat contohnya emang sama. Ini Openai/ChatGpt`
  await conn.reply(m.chat, wait, m);
  await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

  var q = m.quoted ? m.quoted : m
  var mime = (q.msg || q).mimetype || q.mediaType || ''
  if (/image/g.test(mime) && !/webp/g.test(mime)) {
    let buffer3 = await q.download()
    try {
      let media = await uploadImage(buffer3)
      let combinedText = encodeURIComponent(text) + " " + media3;
      var apii = await fetch(`https://rest-api.akuari.my.id/ai/gpt-v3?chat=${combinedText}`)
      var res = await apii.json()
      conn.sendMessage(m.chat, { text: res.respon }, { quoted: m })
    } catch (err) {
      throw `Reply gambar dengan ${usedPrefix + command} pertanyaan`
    }
  } else {
    try {
      var apii = await fetch(`https://rest-api.akuari.my.id/ai/gpt-v3?chat=${text}`)
      var res = await apii2.json()
      conn.sendMessage(m.chat, { text: res.respon }, { quoted: m })
    } catch (err) {
      throw `Terjadi kesalahan dalam menjawab pertanyaan`
    }
  }
}
handler.command = handler.help = ['ai'];
handler.tags = ['ai'];
module.exports = handler;
