let handler = async (m, { conn, text }) => {
    let name = m.fromMe ? conn.user : conn.contacts[m.sender]

  conn.reply(m.chat,`${pickRandom(global.kiwil)}`, m)
    let mentionedJid = [m.sender]
}
handler.customPrefix = //i
handler.command = new RegExp
module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.kiwil = [
'halo kak',
'knp kak',
'kak jalan yuk>_<',
'jangan ganggu kiwil lagi sibuk',
'bentar ewe dulu ama ilman',
'kiwil lagi makan',
'kiwil disini',
'Donasi dulu',
'kiwil pengen punya adik, tapi gk dibolehin ama ilman:(',
'bagi duit dulu/',
'Silahkan ketik .menu ya kak',
'kiwil istirahat dulu',
]
