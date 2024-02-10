const uploadImage = require("../lib/uploadImage");
const fetch = require("node-fetch");

let handler = async (m, { conn, text }) => {
    var q = m.quoted ? m.quoted : m;
    var mime = (q.msg || q).mimetype || q.mediaType || "";
    if (/image/g.test(mime) && !/webp/g.test(mime)) {
        await conn.reply(m.chat, wait, m);
        await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
        try {
            const imgmnga = await q.download?.();
            let outmnga = await uploadImage(imgmnga);
            let resmnga = await fetch(
                `https://api.lolhuman.xyz/api/wmit?apikey=${lol}&img=${outmnga}`,
            );
            let convertmnga = await resmnga.json();
            let imnga = convertmnga.result[0];

            let urlss = imnga.urls.map((urless) => urless).join(`\n`);
            let teksmnga = `*Judul* : ${imnga.title}\n*Link* : ${urlss}\n*Part* : ${imnga.part}\n*Mirip* : ${imnga.similarity}`;
            await conn.sendMessage(m.chat, { text: teksmnga }, { quoted: m });
        } catch (e) {
            throw `[ ! ] Identifikasi Gagal.`;
        }
    } else {
        await conn.reply(m.chat, wait, m);
        await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
        try {
            let res2 = await fetch(
                `https://api.lolhuman.xyz/api/wmit?apikey=${lol}&img=${encodeURIComponent(
                    text,
                )}`,
            );
            let convert2 = await res2.json();
            let imnga2 = convert2.result[0];

            let urlss2 = imnga2.urls.map((urless2) => urless2).join(`\n`);
            let teksmnga2 = `*Judul* : ${imnga2.title}\n*Link* : \n${urlss2}\n*Part* : ${imnga2.part}\n*Mirip* : ${imnga2.similarity}`;
            await conn.sendMessage(m.chat, { text: teksmnga2 }, { quoted: m });
        } catch (e) {
            throw `[ ! ] Identifikasi Gagal. ${e.message}`;
        }
    }
};
handler.command = handler.help = ["whatmanga"];
handler.tags = ["wibu"];
module.exports = handler;
