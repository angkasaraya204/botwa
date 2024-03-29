let fs = require('fs')
let handler = m => m

handler.all = async function (m, { isBlocked, conn }) {

    if (isBlocked) return
    if (m.isBaileys) return
    if (m.chat.endsWith('broadcast')) return
    let setting = db.data.settings
    let { isBanned } = db.data.chats[m.chat]
    let { banned } = db.data.users[m.sender]

    // ketika ditag
    try {
        if (m.mentionedJid.includes(this.user.jid) && m.isGroup) {
            await this.send2Button(m.chat,
                isBanned ? 'Hai Kiwil Tidak aktif' : banned ? 'Kiwil mau bilang kamu dibanned' : 'Kiwil Disini',
                '© Kiwil',
                isBanned ? 'UNBAN' : banned ? 'PEMILIK Kiwil' : 'MENU',
                isBanned ? '.unban' : banned ? '.owner' : '.?',
                m.isGroup ? 'BAN' : isBanned ? 'UNBAN' : 'DONASI',
                m.isGroup ? '.ban' : isBanned ? '.unban' : '.donasi')
        }
    } catch (e) {
        return
    }

    // ketika ada yang invite/kirim link grup di chat pribadi
    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Buka tautan ini')) && !m.isBaileys && !m.isGroup) {
        await conn.sendButton(m.chat, `〔 Undang Bot ke Grup 〕`.trim(), '© Kiwil', 'PEMILIK Kiwil', ',owner', { contextInfo: { mentionedJid: [global.owner[0] + '@s.whatsapp.net'] } })
    }

    // salam
    let reg = /(ass?alam|اَلسَّلاَمُ عَلَيْكُمْ|السلام عليکم)/i
    let isSalam = reg.exec(m.text)
    if (isSalam && !m.fromMe) {
        m.reply(`wa\'alaikumussalam wr.wb.`)
    }

    // backup db
    if (setting.backup) {
        if (new Date() * 1 - setting.backupDB > 1000 * 60 * 60) {
            let d = new Date
            let date = d.toLocaleDateString('id', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
            await global.db.write()
            this.reply(global.owner[0] + '@s.whatsapp.net', `Database: ${date}`, null)
            this.sendFile(global.owner[0] + '@s.whatsapp.net', fs.readFileSync('./database.json'), 'database.json', '', 0, 0, { mimetype: 'application/json' })
            setting.backupDB = new Date() * 1
        }
    }
}

module.exports = handler