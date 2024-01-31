var fetch = require('node-fetch');
const uploadImage = require('../lib/uploadImage');

var handler = async (m, {
  text,
  usedPrefix,
  command
}) => {
  if (!text) throw `Contoh : ${usedPrefix + command} Siapa presiden Indonesia?\n\nSemua ai chat contohnya emang sama`;
  await conn.reply(m.chat, wait, m);
  await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || ''
  if (/image/g.test(mime) && !/webp/g.test(mime)) {
    let buffer = await q.download()
    try {
      let media = await uploadImage(buffer)
      let jsons = await fetch(
        `https://api.botcahx.eu.org/api/search/bard-img?url=${media}&text=${encodeURIComponent(text)}&apikey=${btc}`
      )
      let data = await jsons.json()
      conn.sendMessage(m.chat, { text: data.result }, { quoted: m })
    } catch (err) {
      throw `Reply gambar dengan ${usedPrefix + command} pertanyaan`
    }
  } else {
    try {
      var apii = await fetch(`https://api.botcahx.eu.org/api/search/bard-ai?apikey=${btc}&text=${encodeURIComponent(text)}`)
      var res = await apii.json()
      await m.reply(res.message)
    } catch (err) {
      throw `Terjadi kesalahan dalam menjawab pertanyaan`
    }
  }
}
handler.command = handler.help = ['bardai'];
handler.tags = ['ai'];
module.exports = handler;
