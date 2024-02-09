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
//Daftar terlebih dahulu https://api.botcahx.eu.org

//INI OPTIONAL BOLEH DI ISI BOLEH JUGA ENGGA//
global.lann = 'angkasakey'
//Daftar https://api.betabotz.eu.org 

global.APIs = {   
  btc: 'https://api.botcahx.eu.org',
  lol: 'https://api.lolhuman.xyz',
  zoner: 'https://api.zonerweb.biz.id',
  akuari: 'https://api.akuari.my.id',
}
global.APIKeys = { 
  'https://api.botcahx.eu.org': 'ganskiwilkey',
  'https://api.lolhuman.xyz': 'angkasakey',
  'https://api.zonerweb.biz.id': 'angkasakey',
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
