global.owner = ['6285718796820']  
global.mods = ['6285718796820'] 
global.prems = ['6285718796820']
global.nameowner = ''
global.numberowner = '6285718796820' 
global.mail = '' 
global.gc = ''
global.instagram = ''
global.wm = ''
global.wait = '_*Tunggu sedang di proses...*_'
global.eror = '_*Server Error*_'
global.stiker_wait = '*⫹⫺ Stiker sedang dibuat...*'
global.packname = 'Made With'
global.author = 'Bot WhatsApp'
global.autobio = false //set false untuk mematikan autobio
global.maxwarn = '2' // Peringatan maksimum

//INI WAJIB DI ISI!//
global.btc = 'angkasakey' 
global.lol = 'angkasakey' 
global.zoner = 'angkasakey'
global.resbot = '096457035424d8fa3aca2e156435eae4'
//Daftar terlebih dahulu https://api.botcahx.eu.org

global.APIs = {   
  btc: 'https://api.botcahx.eu.org',
  lol: 'https://api.lolhuman.xyz',
  zoner: 'https://api.zonerweb.biz.id',
  akuari: 'https://api.akuari.my.id',
  resbot: 'https://api2.autoresbot.com',
}

global.APIKeys = { 
  'https://api.botcahx.eu.org': 'ganskiwilkey',
  'https://api.lolhuman.xyz': 'angkasakey',
  'https://api.zonerweb.biz.id': 'angkasakey',
  'https://api2.autoresbot.com': '096457035424d8fa3aca2e156435eae4',
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
