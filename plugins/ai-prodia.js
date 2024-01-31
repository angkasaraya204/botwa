const fetch = require('node-fetch');

let handler = async (m, { text, usedPrefix, command, conn }) => {
  if (command == 'aiprodia') {
    if (!text) throw `*Contoh:* ${usedPrefix}${command} Seekor harimau berukuran besar setinggi gedung sedang menyerang manusia di tengah padatnya kota\nSemua ai prompt contohnya emang sama`;
    await conn.reply(m.chat, wait, m)
    await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
    
    try {
      const res = `https://api.akuari.my.id/ai/prodia?prompt=${encodeURIComponent(text)}`
      conn.sendFile(m.chat, res, 'image.jpg', `Result: ${text}`, m);
    } catch (error) {
      throw 'Model sedang loading, silakan coba lagi dalam beberapa menit.'
    }
  }

  if (command == 'aiprodia2') {
    if (!text.includes('?')) {
      throw `Tolong gunakan prompt dengan benar. Gunakan koma *[ ? ]* untuk memisahkan argumen.\n*Contoh:* ${usedPrefix}${command} hanya ganti warna baju menjadi merah?https://radarpekalongan.disway.id/upload/27264892365cfdcac039267a2f6251c4.jpeg`;
    }
    await conn.reply(m.chat, wait, m)
    await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

    try {
      let response = `https://api.akuari.my.id/ai/prodia2?prompt=${encodeURIComponent(text)}?imageurl=${encodeURIComponent(text)}`
      conn.sendFile(m.chat, response, 'image.jpg', `Result: ${text}`, m)
    } catch (error) {
      throw 'Model sedang loading, silakan coba lagi dalam beberapa menit.'
    }
  }
};

handler.command = handler.help = ['prodia', 'prodia2'];
handler.tags = ['ai'];
module.exports = handler;