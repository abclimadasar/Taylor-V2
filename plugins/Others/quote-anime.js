import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  try {
    const { quote, character, anime } = text ? await quotesByName(text) : await quotesRandom();
    conn.reply(m.chat, `Quotes:\n${quote}\n\n~ Character:\n${character}\n~Anime:\n${anime}`, m);
  } catch (error) {
    console.error("Error in quotesanime handler:", error);
    conn.reply(m.chat, "Terjadi kesalahan dalam mengeksekusi perintah.", m);
  }
};

handler.help = ['quotesanime'];
handler.tags = ['anime', 'quotes'];
handler.command = /^(quotesanime|kataanime)$/i;

async function quotesRandom() {
  try {
    const { quote, character, anime } = await (await fetch("https://animechan.xyz/api/random")).json();
    return { quote, character, anime };
  } catch (error) {
    console.error("Error fetching random quote:", error);
    return null;
  }
}

async function quotesByName(name) {
  try {
    const { quote, character, anime } = await (await fetch(`https://animechan.xyz/api/random/character?name=${name}`)).json();
    return { quote, character, anime };
  } catch (error) {
    console.error(`Error fetching ${name}'s quote:`, error);
    return null;
  }
}

export default handler;
