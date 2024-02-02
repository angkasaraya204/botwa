let handler = async (m, { text, conn }) => {
    if (!text) throw `Masukan link!`
    await conn.reply(m.chat, wait, m);
    await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
    try {
        const resouo = await fetch(`https://api.lolhuman.xyz/api/ouo?apikey=${lol}&url=${encodeURIComponent(text)}`);
        let jsonouo = await resouo.json();
        await conn.reply(m.chat, `Link: ${jsonouo.result}`, m);
    } catch (err) {
        throw `🚩 Terjadi kesalahan ${err.message}`;
    }
};
handler.command = handler.help = ["byouo"];
handler.tags = ["bypass"];

module.exports = handler;