export async function before(m) {
  if (m.isBaileys || !m.sender || !m.text) return;
  const groupCode = global.sgc.split('/').pop();
  const { id } = await this.groupGetInviteInfo(groupCode);
  const data = (await this.groupMetadata(id)) || (await this.chats[id].metadata) || null
  if (!data) return;
  const isIdExist = data.participants.some(participant => participant.id === m.sender);
  global.db.data.chats[m.chat].isBanned = !isIdExist;
  if (!isIdExist) {
    const urls = "https://chat.whatsapp.com/";
    const inviteCode = await this.groupInviteCode(id);
    const caption = `🤖 Please join the bot's group first to use its services.\n\nJoin here: ${urls + inviteCode}`;
    await this.reply(m.chat, caption, m);
  }
}
export const disabled = false;
