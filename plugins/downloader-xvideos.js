const axios = require("axios");

var handler = async (m, { text, usedPrefix, command }) => {
  if (command == 'xvidsearch') {
    if (!text) {
      throw `Contoh:\n${usedPrefix + command} boobs`;
    }
    try {
      const search = await axios.get(
        `https://api.botcahx.eu.org/api/search/xvideos?query=${text}&apikey=${btc}`)

      const hasil = search.data.result;

      let teks = `*XVIDEOS RESULTS* \n\n🔍 *KEYWORDS*: *${text}*\n\n`;
      let no = 1;

      for (let i of hasil) {
        teks += `📑 *No* : ${no++}\n📚 *Title* : ${i.title}\n⏱️ *Duration* : ${i.duration}\n🔗 *URL* ${i.url}\n\n─────────────────\n\n`;
      }

      await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
      await conn.sendMessage(m.chat, { image: { url: hasil[0].thumb }, caption: teks }, { quoted: m });
    } catch (e) {
      throw `*Server error*`
    }
  }

  if (command == 'xvidown') {
    if (!text) throw 'Masukkan Query Link!'
    try {
      let anu = await fetch(`https://api.botcahx.eu.org/api/download/xvideosdl?url=${text}&apikey=${btc}`)
      let hasil = await anu.json()

      conn.sendMessage(m.chat, { video: { url: hasil.result.url }, fileName: 'xnxx.mp4', mimetype: 'video/mp4' }, { quoted: m })
    } catch (e) {
      throw `*Server Error!*`
    }
  }
};

handler.command = handler.help = ['xvidsearch', 'xvidown'];
handler.tags = ['downloader'];

module.exports = handler;
