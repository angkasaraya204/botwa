var fetch = require("node-fetch");
let PDFDocument = require('pdfkit');
let fs = require('fs');

var handler = async (m, { text, usedPrefix, command }) => {
    if (command == 'nhensearch') {
        if (!text) {
            throw `Contoh:\n${usedPrefix + command} miku.\nMenampilkan 25 Data!`;
        }
        await conn.reply(m.chat, wait, m)
        await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
        try {
            let nhen = await fetch(
                `https://api.lolhuman.xyz/api/nhentaisearch?apikey=${lol}&query=${encodeURIComponent(text)}`
            );
            let nhenhasil = await nhen.json();
            let convnhen = nhenhasil.result;

            let tekspages = `Menampilkan 25 Data Pencarian Komik!\n\n*Completed RESULTS*\n\n🔍 *KEYWORDS* *${text}*\n\n`
            let nonhen = 1;

            for (let inhen of convnhen) {
                tekspages += `📑 *No* : ${nonhen++}\n*Id* : _${inhen.id}_\n*Judul* : ${inhen.title_native}\n*Eng* : ${inhen.title_english}\n*Jp* : ${inhen.title_japanese}\n*Total Hal* : ${inhen.page}\n\n─────────────────\n\n`;
            }
            
            await conn.sendMessage(m.chat, {text: tekspages}, m);
        } catch (e) {
            throw `Data Tidak Ditemukan!`
        }
    }

    if (command == 'nhendetail') {
        if (!text) {
            throw `Contoh:\n${usedPrefix + command} miku.\nMenampilkan 25 Data!`;
        }
        await conn.reply(m.chat, wait, m)
        await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
        try {
            let nhendet = await fetch(
                `https://api.lolhuman.xyz/api/nhentai/${encodeURIComponent(text)}?apikey=${lol}`
            );
            let nhendethasil = await nhendet.json();
            let inhendet = nhendethasil.result;

            let tekspages = `*Judul* : ${inhendet.title_native}\n*Jp* : ${inhendet.title_romaji}\n*Tags* : ${inhendet.tags}`;

            await conn.sendMessage(m.chat, {image: {url: inhendet.image[0]}, caption: tekspages}, {quoted: m});
        } catch (e) {
            throw `Data Tidak Ditemukan!`
        }
    }

    if (command == 'nhendl') {
        if (!text) {
            throw `Contoh:\n${usedPrefix + command} 402034.`;
            // throw `Segera`;
        }
        await conn.reply(m.chat, wait, m)
        await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

        try {
            let nhendl = await fetch(
                `https://api.lolhuman.xyz/api/nhentai/${encodeURIComponent(text)}?apikey=${lol}`
            );
            let nhendlhasil = await nhendl.json();
            let nhendlconv = nhendlhasil.result;

            const doc = new PDFDocument;
            const stream = doc.pipe(fs.createWriteStream(`./media/dwnlds/output.pdf`));
        
            let i = 0;
            for (let url of nhendlconv.image) {
                let response = await fetch(url);
                let buffer = await response.buffer();
                fs.writeFileSync(`./media/dwnlds/image${i}.jpg`, buffer);
                
                // Jika ini bukan gambar pertama, tambahkan halaman baru
                if (i > 0) {
                    doc.addPage();
                }

                // Tambahkan gambar ke halaman dengan ukuran penuh
                doc.image(`./media/dwnlds/image${i}.jpg`, 0, 0, { width: doc.page.width, height: doc.page.height });

                // Hapus gambar setelah ditambahkan ke PDF
                fs.unlinkSync(`./media/dwnlds/image${i}.jpg`);
                i++;
            }
        
            doc.end();

            stream.on('finish', function() {
                // Hapus file PDF setelah selesai ditulis
                fs.unlinkSync(`./media/dwnlds/output.pdf`);
            });
        
            await conn.sendFile(m.chat, `./media/dwnlds/output.pdf`, `Images.pdf`, 'Nih', m);
        } catch (error) {
            throw `Data Tidak Ditemukan! ${error.message}`
        }
    }
};

handler.command = handler.help = ['nhensearch', 'nhendetail','nhendl'];
handler.tags = ['wibu'];

module.exports = handler;