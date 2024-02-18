const fetch = require("node-fetch");

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    if (!args[0]) throw `Masukkan URL!\n\ncontoh:\n${usedPrefix + command} https://twitter.com/gofoodindonesia/status/1229369819511709697`;
    if (!args[0].match(/https?:\/\/(www\.)?(twitter\.com|x\.com)/gi)) throw "URL Tidak Ditemukan!";
    m.reply(wait);
    try {
        const api = await fetch(`https://api.botcahx.eu.org/api/download/twitter2?url=${args[0]}&apikey=${btc}`);
        const res = await api.json();
        const mediaURLs = res.result.mediaURLs;

        const capt = `*Username: ${res.result.user_name} ${res.result.user_screen_name}*\n*Title: ${res.result.text}*\n*Replies: ${res.result.replies}*\n*Retweet: ${res.result.retweets}*`;

        for (const url of mediaURLs) {
            const response = await fetch(url);
            const buffer = await response.buffer();  
            await delay(3000)        
            conn.sendFile(m.chat, buffer, null, capt, m);           
        }
    } catch (e) {
        throw '*Server Down!*';
    }
};

handler.command = handler.help = ['twitterdl'];
handler.tags = ['downloader'];
handler.fail = null;

module.exports = handler;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}