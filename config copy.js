global.owner = ['isi no hp']  
global.mods = ['isi no hp'] 
global.prems = ['isi no hp']
global.nameowner = ''
global.numberowner = 'isi no hp' 
global.mail = '' 
global.gc = ''
global.instagram = ''
global.wm = 'Kiwil'
global.wait = '_*Tunggu sedang di proses...*_'
global.eror = '_*Server Error*_'
global.stiker_wait = '*⫹⫺ Stiker sedang dibuat...*'
global.packname = 'Dibuat Oleh'
global.author = 'Bot WhatsApp'
global.autobio = true //set false untuk mematikan autobio
global.maxwarn = '2' // Peringatan maksimum

//INI WAJIB DI ISI!//
global.btc = 'API key' 
global.lol = 'API key' 
global.zoner = 'API key'
global.resbot = 'API key'

global.APIs = {   
  btc: 'https://api.botcahx.eu.org',
  lol: 'https://api.lolhuman.xyz',
  zoner: 'https://api.zonerweb.biz.id',
  akuari: 'https://api.akuari.my.id',
  resbot: 'https://api2.autoresbot.com',
}

global.APIKeys = { 
  'https://api.botcahx.eu.org': 'API key',
  'https://api.lolhuman.xyz': 'API key',
  'https://api.zonerweb.biz.id': 'API key',
  'https://api2.autoresbot.com': 'API key',
}

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})
