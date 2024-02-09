const fetch = require('node-fetch');
const uploadImage = require('../lib/uploadImage')

let handler = async (m, { conn, usedPrefix, command}) => {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/^image/.test(mime) && !/webp/.test(mime)) {
      const img = await q.download();
      const out = await uploadImage(img);
      m.reply(wait);
      if (command == 'reminihd') {
        const reminihd = await fetch(`https://api.botcahx.eu.org/api/tools/remini-v3?url=${out}&resolusi=4&apikey=${btc}`);
        const imagereminihd = await reminihd.json();
        const urlreminihd = imagereminihd.url;
        conn.sendFile(m.chat, urlreminihd, 'reminihd.jpg', '', m);
      } else if (command == 'removebg') {
        const removebg = await fetch(`https://api.botcahx.eu.org/api/tools/removebg?url=${out}&apikey=${btc}`);
        const imageremovebg = await removebg.json();
        const urlremovebg = imageremovebg.url.result;
        conn.sendFile(m.chat, urlremovebg, 'removebg.jpg', '', m);
      }
    } else {
      m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim.`);
    }
  } catch (e) {
    console.error(e);
    throw `🚩 *Server Error*`
  }
}

handler.command = handler.help = ['reminihd', 'removebg'];
handler.tags = ['tools'];

module.exports = handler;
