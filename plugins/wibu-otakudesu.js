const { isNull } = require("lodash");
var fetch = require("node-fetch");

var handler = async (m, { text, command, usedPrefix, conn }) => {
    if (command == 'otakudesu-ongoing') {
        await conn.reply(m.chat, wait, m)
        await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
        try {
            const searchongoing = await fetch(`https://otakudesu-unofficial-api.rzkfyn.xyz/v1/ongoing-anime`)
            const hasilongoing = await searchongoing.json();

            let teksongoing = `Menampilkan 25 Data On Going Anime!\n\n🔍 *On Going RESULTS*\n\n`;
            let noongoing = 1;

            for (let ipongoing of hasilongoing.data) {
                teksongoing += `📑 *No* : ${noongoing++}\n*Judul* : ${ipongoing.title}\n*Eps* : ${ipongoing.current_episode}\n*Hari Rilis* : ${ipongoing.release_day}\n*Tgl Rilis* : ${ipongoing.newest_release_date}\n*Slug* : _${ipongoing.slug}_\n\n─────────────────\n\n`;
            }
            await conn.sendMessage(m.chat, { image: { url: hasilongoing.data[0].poster }, caption: teksongoing }, { quoted: m });
        } catch (e) {
            throw `Data Tidak Ditemukan!`
        }
    }

    if (command == 'otakudesu-completed') {
        await conn.reply(m.chat, wait, m)
        await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
        try {
            const searchcomplete = await fetch(
                `https://otakudesu-unofficial-api.rzkfyn.xyz/v1/complete-anime`
            );
            const hasilcomplete = await searchcomplete.json();

            let tekscomplete = `Menampilkan 25 Data Completed Anime!\n\n🔍 *Completed RESULTS*\n\n`;
            let nocomplete = 1;

            for (let ipcomplete of hasilcomplete.data) {
                tekscomplete += `📑 *No* : ${nocomplete++}\n*Judul* : ${ipcomplete.title}\n*Eps* : ${ipcomplete.episode_count}\n*Rating* : ${ipcomplete.rating}\n*Rilis* : ${ipcomplete.last_release_date}\n*Slug* : _${ipcomplete.slug}_\n\n─────────────────\n\n`;
            }
            await conn.sendMessage(m.chat, { image: { url: hasilcomplete.data[0].poster }, caption: tekscomplete }, { quoted: m });
        } catch (e) {
            throw `Data Tidak Ditemukan!`
        }
    }

    if (command == 'otakudesu-search') {
        if (!text) {
            throw `Contoh:\n${usedPrefix + command} isekai.\nMenampilkan 15 Data!`
        }
        await conn.reply(m.chat, wait, m)
        await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
        try {
            const searchotaku = await fetch(
                `https://otakudesu-unofficial-api.rzkfyn.xyz/v1/search/${encodeURIComponent(text)}/`
            );
            const hasilotaku = await searchotaku.json();

            let teksotaku = `Menampilkan 15 Data Pencarian Anime!\n\n*Completed RESULTS*\n\n🔍 *KEYWORDS* *${text}*\n\n`;
            let nootaku = 1;

            for (let ipotaku of hasilotaku.data) {
                let genreList = ipotaku.genres.map(genre => genre.name).join(', ');
                teksotaku += `📑 *No* : ${nootaku++}\n*Judul* : ${ipotaku.title}\n*Genre* : ${genreList}\n*Status* : ${ipotaku.status}\n*Rating* : ${ipotaku.rating}\n*Slug* : _${ipotaku.slug}_\n\n─────────────────\n\n`;
            }
            await conn.sendMessage(m.chat, { image: { url: hasilotaku.data[0].poster }, caption: teksotaku }, { quoted: m });
        } catch (e) {
            throw `Data Tidak Ditemukan!`
        }
    }

    if (command == 'otakudesu-detail') {
        if (!text) {
            throw `Contoh:\n${usedPrefix + command} _blck-clover-sub-indo_\n(slugnya tanpa kode "_" italic).\nMenampilkan Detail Anime!`
        }
        await conn.reply(m.chat, wait, m)
        await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
        try {
            const searchdetail = await fetch(
                `https://otakudesu-unofficial-api.rzkfyn.xyz/v1/anime/${encodeURIComponent(text)}/`
            );
            const hasildetail = await searchdetail.json();
            const convdetail = hasildetail.data;
            
            let detailnime = `*Detail Anime:*\n\n`;
            if ( convdetail.synopsis == "" ) {
                detailnime += `*Judul* : ${convdetail.title}\n`;
                detailnime += `*Jp Judul* : ${convdetail.japanese_title}\n`;
                detailnime += `*Rating* : ${convdetail.rating}\n`;
                detailnime += `*Produser* : ${convdetail.produser}\n`;
                detailnime += `*Tipe* : ${convdetail.type}\n`;
                detailnime += `*Status* : ${convdetail.status}\n`;
                detailnime += `*Total Eps* : ${convdetail.episode_count}\n`;
                detailnime += `*Durasi* : ${convdetail.duration}\n`;
                detailnime += `*Rilis* : ${convdetail.release_date}\n`;
                detailnime += `*Studio* : ${convdetail.studio}\n`;
                detailnime += `*Genres* : ${convdetail.genres.map(genre2 => genre2.name).join(', ')}\n\n`;
                detailnime += `*Sinopsis:* _Belum Ada_\n\n`;
            } else {
                detailnime += `*Judul* : ${convdetail.title}\n`;
                detailnime += `*Jp Judul* : ${convdetail.japanese_title}\n`;
                detailnime += `*Rating* : ${convdetail.rating}\n`;
                detailnime += `*Produser* : ${convdetail.produser}\n`;
                detailnime += `*Tipe* : ${convdetail.type}\n`;
                detailnime += `*Status* : ${convdetail.status}\n`;
                detailnime += `*Total Eps* : ${convdetail.episode_count}\n`;
                detailnime += `*Durasi* : ${convdetail.duration}\n`;
                detailnime += `*Rilis* : ${convdetail.release_date}\n`;
                detailnime += `*Studio* : ${convdetail.studio}\n`;
                detailnime += `*Genres* : ${convdetail.genres.map(genre2 => genre2.name).join(', ')}\n\n`;
                detailnime += `*Sinopsis* : ${convdetail.synopsis}\n\n`;
            }

            let detailList = `*Batch Anime:*\n\n`;
            if ( convdetail.batch == null ) {
                detailList += `_Belum Ada_\n\n`;
            } else {
                detailList += `*Slug* : ${convdetail.batch.slug}\n`;
                detailList += `*Upload* : ${convdetail.batch.uploaded_at}\n`;
                detailList += `*Link* : ${convdetail.batch.otakudesu_url}\n\n`;
            }

            let episodeList = `*Daftar Episode:*\n\n`;
            for (let episode of convdetail.episode_lists) {
                episodeList += `*Judul Episode* : ${episode.episode}\n`;
                episodeList += `*Slug* : \n_${episode.slug}_\n`;
                episodeList += `*Link* : ${episode.otakudesu_url}\n\n`;
            }

            await conn.sendMessage(m.chat, { image: { url: convdetail.poster }, caption: detailnime + detailList + episodeList }, { quoted: m });
        } catch (e) {
            throw `Data Tidak Ditemukan!`
        }
    }
    
    if (command == 'otakudesu-eps') {
        if (!text) {
            throw `Contoh:\n${usedPrefix + command} _bkclrv-episode-1-sub-indo_\n(slug epsnya tanpa kode "_" italic).\nMenampilkan Batch Anime!`
        }
        await conn.reply(m.chat, wait, m)
        await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
        try {
            const searchbatch = await fetch(
                `https://otakudesu-unofficial-api.rzkfyn.xyz/v1/episode/${encodeURIComponent(text)}/`
            );
            const hasilbatch = await searchbatch.json();
            
            let detailEps = `*Detail Episode:*\n\n`;
            detailEps += `*Judul* : ${hasilbatch.data.episode}\n`;
            detailEps += `*Stream Url* : ${hasilbatch.data.stream_url}\n\n(Whatsapp tidak mendukung streaming video seperti telegram)\n\n`;

            let downloadList = `*Daftar Download:*\n\n`;
            for (let downld of hasilbatch.data.download_urls.mp4) {
                let downloadUrls = downld.urls.map(link2 => `${link2.provider}: ${link2.url}`).join('\n');
                downloadList += `*Kualitas* : ${downld.resolution}\n`;
                downloadList += `*Download Link* : \n${downloadUrls}\n\n`;
            }
            await conn.sendMessage(m.chat, { text: detailEps + downloadList }, { quoted: m });
        } catch (e) {
            throw `Data Tidak Ditemukan!`;
        }
    }
};

handler.command = handler.help = ['otakudesu-ongoing', 'otakudesu-completed', 'otakudesu-search', 'otakudesu-detail', 'otakudesu-eps'];
handler.tags = ['wibu'];

module.exports = handler;