let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        let who;
        if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
        else who = m.chat;
        let user = global.db.data.users[who];
        if (!who) throw `tag or mention someone!`;
        let txt = text.replace('@' + who.split`@`[0], '').trim();
        if (!txt) throw `where the number of days?`;
        if (isNaN(txt)) return m.reply(`only number!\n\nexample:\n${usedPrefix + command} @${m.sender.split`@`[0]} 7`);
        var jumlahHari = 86400000 * txt;
        var now = Date.now();

        if (now < user.premiumTime) user.premiumTime += jumlahHari;
        else user.premiumTime = now + jumlahHari;

        user.premium = true;
        global.prems = Object.keys(global.db.data.users).filter(key => global.db.data.users[key].premium);
        
        m.reply(`✔️ Success
📛 *Name:* ${user.name}
📆 *Days:* ${txt} days
📉 *Countdown:* ${msToTime(user.premiumTime - now)}`);
    } catch (error) {
        m.reply(`An error occurred: ${error}`);
    }
}

handler.help = ['addprem [@user] <days>'];
handler.tags = ['owner'];
handler.command = /^(add|tambah|\+)p(rem)?$/i;
handler.group = true;
handler.rowner = true;

function msToTime(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
    let h = isNaN(ms) ? '--' : Math.floor((ms % 86400000) / 3600000);
    let m = isNaN(ms) ? '--' : Math.floor((ms % 3600000) / 60000);
    let s = isNaN(ms) ? '--' : Math.floor((ms % 60000) / 1000);
    return [d, ' *Days ☀️*\n ', h, ' *Hours 🕐*\n ', m, ' *Minute ⏰*\n ', s, ' *Second ⏱️* '].map(v => v.toString().padStart(2, '0')).join('');
}

export default handler;
