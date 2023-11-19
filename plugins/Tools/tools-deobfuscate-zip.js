import fs from 'fs';
import AdmZip from 'adm-zip';
import { Deobfuscator } from "deobfuscator"

const handler = async (m, { args, command }) => {
    try {
        const q = m.quoted || m;
        const mime = (q.msg || q).mimetype || '';

        if (mime !== "application/zip") {
            return m.reply('Invalid media type. Only "application/zip" is allowed.');
        }

        // Download the media file
        const buffer = await q.download();

        // Check the file size here
        const fileSizeInBytes = buffer.length;
        const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

        if (fileSizeInMB > 3) {
            return m.reply('Input file size is too large. It must be below 3 MB.');
        }

        const zip = new AdmZip(buffer);
        const obfuscatePromises = [];
        const start = new Date();

        const obfuscatedFiles = [];
        const errorFiles = [];

        for (const zipEntry of zip.getEntries()) {
            if (zipEntry.entryName.endsWith('.js')) {
                obfuscatePromises.push(
                    (zipEntry => {
                        const jsCode = zipEntry.getData().toString('utf8');
                        try {
                            const obfuscatedCode = Decrypt(jsCode);
                            zip.updateFile(zipEntry.entryName, Buffer.from(obfuscatedCode, 'utf8'));
                            obfuscatedFiles.push(zipEntry.entryName);
                        } catch (error) {
                            console.error(`Gagal mengobfuskasi ${zipEntry.entryName}: ${error.message}`);
                            errorFiles.push(zipEntry.entryName);
                        }
                    })(zipEntry)
                );
            }
        }

        await Promise.all(obfuscatePromises);
        const outputZipPath = Buffer.from(zip.toBuffer()).toString('base64');
        const end = new Date();
        const processingTime = (end - start) / 1000;

        let message = `*Proses selesai dalam ${processingTime} detik.*\n`;

        if (obfuscatedFiles.length > 0) {
            message += `*File yang diobfus: ${obfuscatedFiles.length}*\n`;
            /*for (const file of obfuscatedFiles) {
                message += `- ${file}\n`;
            }*/
        }

        if (errorFiles.length > 0) {
            message += `*File yang mengalami kesalahan: ${errorFiles.length}*\n`;
            /*for (const file of errorFiles) {
                message += `- ${file}\n`;
            }*/
        }

        const fileName = await q.fileName || "ObfuscateZip.zip";

        // Send the obfuscated file
        await conn.sendFile(m.chat, Buffer.from(outputZipPath, 'base64'), fileName, fileName, m);

        await m.reply(message);
    } catch (err) {
        console.error(`Terjadi kesalahan: ${err.message}`);
        return m.reply(`Terjadi kesalahan saat mengobfuskasi file: ${err.message}`);
    }
};

handler.command = /^(deobfuszip|deobfuscatezip|deczip)$/i;

export default handler;

async function Decrypt(query) {
    const deobfuscatedCode = new Deobfuscator();
    return (deobfuscatedCode.deobfuscateSource(query));
}