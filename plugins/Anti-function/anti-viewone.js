import { downloadContentFromMessage } from '@adiwajshing/baileys';
import fetch from 'node-fetch';

export async function before(m) {
  const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : (m.fromMe ? this.user.jid : m.sender);
  const pp = await this.profilePictureUrl(who).catch(_ => hwaifu.getRandom());
  const name = await this.getName(who);

  const chat = global.db.data.chats[m.chat];
  if (!chat.viewonce) return;

  if (m.mtype == 'viewOnceMessage') {
    const msg = m.message.viewOnceMessage.message;
    const type = Object.keys(msg)[0];
    const media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video');
    let buffer = Buffer.from([]);

    for await (const chunk of media) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    if (/video/.test(type)) {
      this.sendFile(m.chat, buffer, author, msg[type].caption || '', m, null, fakefb);
      throw new Error('[View Once Video] Detected');
    } else if (/image/.test(type)) {
      this.sendFile(m.chat, buffer, author, msg[type].caption || '', m, null, fakefb);
      throw new Error('[View Once Image] Detected');
    }
  }
}
