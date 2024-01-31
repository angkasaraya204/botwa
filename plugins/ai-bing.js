const fetch = require('node-fetch');
const uploadImage = require('../lib/uploadImage');

let handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (command == 'bingai') {
    if (!text) throw `Contoh : ${usedPrefix + command} Siapa presiden Indonesia?\n\nSemua ai chat contohnya emang sama`;
    await conn.reply(m.chat, wait, m);
    await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

    var q = m.quoted ? m.quoted : m
    var mime = (q.msg || q).mimetype || q.mediaType || ''
    if (/image/g.test(mime) && !/webp/g.test(mime)) {
      let buffer = await q.download()
      try {
        let media = await uploadImage(buffer)
        let combinedText = decodeURIComponent(text) + " " + media;
        let response = await fetch(
          `https://api.botcahx.eu.org/api/search/bing-chat?text=${combinedText}&apikey=${btc}`
        )
        let data = await response.json()
        await conn.sendMessage(m.chat, { text: data.message }, m);
      } catch (e) {
        throw `Reply gambar dengan ${usedPrefix + command} pertanyaan ${e.message}`
      }
    } else {
      try {
        let response = await fetch(
          `https://api.botcahx.eu.org/api/search/bing-chat?text=${encodeURIComponent(text)}&apikey=${btc}`
        )
        let data = await response.json()
        await conn.sendMessage(m.chat, { text: data.message }, m);
      } catch (e) {
        throw `Terjadi kesalahan dalam menjawab pertanyaan`
      }
    }
  }

  if (command == 'bingimg') {
    if (!text) throw `Contoh: ${usedPrefix + command} anak berlari menggunakan pakaian merah 3d animation`;
    await conn.reply(m.chat, wait, m);
    await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
    try {
      let response = `https://rest-api.akuari.my.id/ai/bing-ai2?text=${encodeURIComponent(text)}`
      await conn.sendFile(m.chat, response, 'bingimg.jpg', `Result: ${text}`, m)
    } catch (error) {
      throw 'Model sedang loading, silakan coba lagi dalam beberapa menit.'
    }
  }
}

handler.command = handler.help = ['bingai', 'bingimg']
handler.tags = ['ai']
module.exports = handler

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
