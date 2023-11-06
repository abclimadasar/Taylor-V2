import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
let handler = async (m, { conn, text, command, usedPrefix }) => {
let imgr = flaaa.getRandom()

    conn.quizz = conn.quizz ? conn.quizz : {}
    let id = m.chat
    if (!text)
      return m.reply(
        `Please use this command like this: ${usedPrefix}quizz easy/medium/hard`
      );
    if (id in conn.quizz) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.quizz[id][0])
        throw false
    }
    
  let json = await quizApi(text)
  let caption = `            *『  quizz Answers  』*\n\n📒  *quizz:* ${json[0].soal}
  
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}quizzh untuk bantuan
Bonus: ${poin} XP
    `.trim()
    conn.quizz[id] = [
        await conn.sendFile(m.chat, imgr + command, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.quizz[id]) conn.reply(m.chat, `Waktu habis!\\n\n🎋  *Answer:* ${json[0].jawaban}\n
`, conn.quizz[id][0])
            delete conn.quizz[id]
        }, timeout)
    ]
}
handler.help = ['quizz']
handler.tags = ['game']
handler.command = /^quizz/i

export default handler

const buttons = [
    ['Hint', '/quizzh'],
    ['Nyerah', 'menyerah']
]

async function quizApi(difficulty) {
  const response = await fetch('https://quizapi.io/api/v1/questions?apiKey=MrSORkLFSsJabARtQhyloo7574YX2dquEAchMn8x&difficulty=' + difficulty + '&limit=1');
  const quizData = await response.json();

  const transformedData = quizData.map(({ question, answers, correct_answers }) => ({
    soal: question,
    hint: Object.values(answers).filter(value => value !== null),
    jawaban: Object.entries(correct_answers)
      .reduce((acc, [key, value]) => (value === 'true' ? answers[key.replace('_correct', '')] : acc), null)
  }));

  return transformedData;
}
