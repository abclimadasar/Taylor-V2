
export async function before(m, { isAdmin, isBotAdmin }) {
  if (m.key.remoteJid != 'status@broadcast') return false;

  // Initialize this.story array if it doesn't exist
  this.story = this.story ? this.story : [];

  const { mtype, text, sender } = m;
  const name = m.sender.split('@')[0];
  const chat = global.db.data.chats[m.chat];

  if (mtype === 'imageMessage' || mtype === 'videoMessage') {
    const caption = text ? text : '';
    try {
      let buffer = await m.download();
      await this.sendFile(sender, buffer, '', caption, m, false, { mentions: [m.sender] });

      // Save the message to this.story array
      this.story.push({ type: mtype, quoted: m, sender: m.sender, caption: caption, buffer: buffer });
    } catch (e) {
      console.log(e);
      await this.reply(sender, caption, m, { mentions: [m.sender] });
    }
  } else if (mtype === 'audioMessage') {
    try {
      let buffer = await m.download();
      await this.sendFile(sender, buffer, '', '', m, false, { mimetype: m.mimetype });

      // Save the message to this.story array
      this.story.push({ type: mtype, quoted: m, sender: m.sender, buffer: buffer });
    } catch (e) {
      console.log(e);
    }
  } else if (mtype === 'extendedTextMessage') {
    const pesan = text ? text : '';
    await this.reply(sender, pesan, m, { mentions: [m.sender] });

    // Save the message to this.story array
    this.story.push({ type: mtype, quoted: m, sender: m.sender, message: pesan });
  }

  if (chat.viewStory) return true;
}