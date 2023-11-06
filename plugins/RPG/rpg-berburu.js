let handler = async (m, { conn }) => {
  let __timers = (new Date() - global.db.data.users[m.sender].lastberbru)
  let _timers = (500000 - __timers)
  let timers = clockString(_timers)
  let user = global.db.data.users[m.sender]

  if (new Date() - global.db.data.users[m.sender].lastberbru > 500000) {
    let attempts = 0;
    let habitats = {
      'Hutan 🌿': ['🐃 Banteng', '🐅 Harimau', '🐐 Kambing', '🐒 Monyet', '🐗 Babihutan', '🐖 Babi'],
      'Sabana 🦁': ['🐘 Gajah', '🐐 Kambing', '🐄 Sapi', '🐖 Babi'],
      'Taman Panda 🐼': ['🐼 Panda'],
      'Danau 🐊': ['🐊 Buaya', '🐄 Sapi', '🐖 Babi'],
      'Lembah 🐂': ['🐂 Kerbau', '🐄 Sapi', '🐖 Babi'],
      'Kebun 🐔': ['🐔 Ayam']
    }
    let results = {}

    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomAnimal(habitat) {
      let animalsInHabitat = habitats[habitat];
      return animalsInHabitat[Math.floor(Math.random() * animalsInHabitat.length)];
    }

    function displayResults() {
      let res = `*🏞️ HASIL BERBURU ${conn.getName(m.sender)} 🏞️*\n\n`;
      for (let habitat in results) {
        res += `*${habitat}*\n`;
        for (let animal in results[habitat]) {
          let count = results[habitat][animal];
          let animalName = animal.split(' ')[1];
          res += `${animal}: ${count} ekor\n`;
          user[animalName.toLowerCase()] += count;
        }
        res += '\n';
      }
      res += `*${author}* 🏕️`;
      conn.reply(m.chat, res, null);
    }

    m.reply(`🏞️ *${conn.getName(m.sender)} Sedang Berburu 🌿*\n\n`);
    
    let interval = setInterval(() => {
      attempts++;
      let habitat = Object.keys(habitats)[Math.floor(Math.random() * Object.keys(habitats).length)];
      let animal = getRandomAnimal(habitat);
      if (!results[habitat]) results[habitat] = {};
      if (!results[habitat][animal]) results[habitat][animal] = 0;
      results[habitat][animal] += getRandomNumber(1, 5);
      m.reply(`*🌿 HABITAT: ${habitat} 🌿*\n${animal}: ${results[habitat][animal]} ekor`);
      
      if (attempts === getRandomNumber(3, 7)) {
        clearInterval(interval);
        setTimeout(() => displayResults(), 2000);
        user.lastberburu = new Date() * 1;
      }
    }, 5000);

  } else {
    let hsl = `*⏳ HASIL BERBURU ${conn.getName(m.sender)} ⏳*\n\n`;
    let isEmpty = true;
    for (let animal in user) {
      if (user[animal] > 0) {
        hsl += `${animal}: ${user[animal]} ekor\n`;
        isEmpty = false;
      }
    }
    if (isEmpty) hsl += 'Tidak ada hewan yang kamu dapatkan.\n';
    hsl += `\n*${author}* 🏕️`;
    m.reply(hsl);
  }
}

handler.help = ['berburu']
handler.tags = ['rpg']
handler.command = /^(berburu)$/i
handler.group = true

export default handler

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return ['\n' + d, ' *Hari ☀️*\n ', h, ' *Jam 🕐*\n ', m, ' *Menit ⏰*\n ', s, ' *Detik ⏱️* '].map(v => v.toString().padStart(2, 0)).join('')
}
