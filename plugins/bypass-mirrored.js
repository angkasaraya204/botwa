let handler = async (m, { text, conn }) => {
    if (!text) throw `Masukan link!`
    await conn.reply(m.chat, wait, m);
    await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
    try {
        const resmirrored = await fetch(`https://api.lolhuman.xyz/api/mirrorcreator?apikey=${lol}&url=${encodeURIComponent(text)}`);
        let jsonmirrored = await resmirrored.json();
        let messagemirrored = `*Link* : \n\n`;
        Object.entries(jsonmirrored.result).forEach(([key, value]) => {
            messagemirrored += `*${key}*: ${value}\n`;
        });
        await conn.reply(m.chat, `${messagemirrored}`, m);
    } catch (err) {
        throw `🚩 Terjadi kesalahan ${err.message}`;
    }
};
handler.command = handler.help = ["bymirrored"];
handler.tags = ["bypass"];

module.exports = handler;