import axios from 'axios';
import cheerio from 'cheerio';
import PhoneNumber from 'awesome-phonenumber';

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, "Masukkan Nomor!", null);

  const number = text.replace(/[^0-9]/g, "").replace(/^08/, "62");
  if (!number.startsWith("62")) return conn.reply(m.chat, "Only INDONESIA number!", null);

  if (number + "@s.whatsapp.net" === conn.user.jid) return conn.reply(m.chat, "Is that bot number ?", null);

  const isValid = await conn.isOnWhatsApp(number + "@s.whatsapp.net");
  if (!isValid) return conn.reply(m.chat, "Number not in WhatsApp!", null);

  const internationalNumber = PhoneNumber("+" + number).getNumber("international");

  try {
    const { data, headers } = await axios.get("https://www.whatsapp.com/contact/noclient/");
    const email = (await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")).data[0];
    const $ = cheerio.load(data);
    const $form = $("form");
    const url = new URL($form.attr("action"), "https://www.whatsapp.com").href;
    const form = new URLSearchParams({
      jazoest: $form.find("input[name=jazoest]").val(),
      lsd: $form.find("input[name=lsd]").val(),
      step: "submit",
      country_selector: "INDONESIA",
      phone_number: internationalNumber,
      email,
      email_confirm: email,
      platform: "ANDROID",
      your_message: "Perdido/roubado: desative minha conta",
      __user: "0",
      __a: "1",
      __csr: "",
      __req: "8",
      __hs: "19316.BP:whatsapp_www_pkg.2.0.0.0.0",
      dpr: "1",
      __ccg: "UNKNOWN",
      __rev: "1006630858",
      __comment_req: "0"
    });

    const { data: resData } = await axios.post(url, form, { headers: { cookie: headers["set-cookie"] || "" } });
    const payload = String(resData);

    if (payload.includes(`"payload":true`)) {
      conn.reply(m.chat, `WhatsApp Support
Hai,
Terima kasih atas pesan Anda.
Kami telah mengaktifkan kembali akun anda.`, null);
    } else if (payload.includes(`"payload":false`)) {
      conn.reply(m.chat, `Halo, 
Kami menerima pesan Anda.
Kami tahu bahwa saat ini Anda tidak memiliki akses ke WhatsApp dan kami sedang bekerja
untuk memenuhi pesanan Anda.
Kami berterima kasih atas kesabaran Anda dan akan menghubungi Anda sesegera mungkin.
Untuk informasi lebih lanjut, silakan baca peraturan kami.`, null);
    } else conn.reply(m.chat, await import("utils").format(resData), null);
  } catch (err) {
    conn.reply(m.chat, `${err}`, null);
  }
};

handler.help = ['unbannedwa'];
handler.tags = ['owner'];
handler.command = /^(unbannedwa|unbanwa)$/i;
handler.owner = true;

export default handler;
