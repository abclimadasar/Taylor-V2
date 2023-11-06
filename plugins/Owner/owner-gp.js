import { exec } from 'child_process';
import { promisify } from 'util';

let handler = async (m, { conn, command, text }) => {
    const querys = text.split(' ');
    const pluginsList = Object.keys(global.plugins);
    const uniqueCategories = [];

    for (const plugin of pluginsList) {
        const category = plugin.split('/')[2];
        if (!uniqueCategories.includes(category)) {
            uniqueCategories.push(category);
        }
    }

    if (!querys[0]) {
        const pluginList = uniqueCategories.map((category, index) => `${index + 1}. *${category}*`).join('\n');
        await m.reply(`*List Kategori:*\n${pluginList}`);
    } else if (!querys[1]) {
        const categoryIndex = parseInt(querys[0]) - 1;

        if (!isNaN(categoryIndex) && categoryIndex >= 0 && categoryIndex < uniqueCategories.length) {
            const selectedCategory = uniqueCategories[categoryIndex];
            const pluginNames = pluginsList.filter(plugin => plugin.split('/')[2] === selectedCategory);
            const pluginList = pluginNames.map((plugin, index) => `${index + 1}. *${plugin.split('/').pop().replace('.js', '')}*`).join('\n');
            await m.reply(`*List File dalam Kategori "${selectedCategory}":*\n${pluginList}`);
        } else {
            await m.reply('*Input salah* atau angka di luar rentang yang sesuai.');
        }
    } else if (querys[0] && querys[1] && !isNaN(querys[0]) && !isNaN(querys[1])) {
        const categoryIndex = parseInt(querys[0]);
        const pluginIndex = parseInt(querys[1]);

        if (categoryIndex >= 1 && categoryIndex <= uniqueCategories.length) {
            const selectedCategory = uniqueCategories[categoryIndex - 1];
            const pluginNames = pluginsList.filter(plugin => plugin.split('/')[2] === selectedCategory);

            if (pluginIndex >= 1 && pluginIndex <= pluginNames.length) {
                const selectedPlugin = pluginNames[pluginIndex - 1];
                const commandToExecute = `cat ${selectedPlugin}`;

                const execPromise = promisify(exec);
                try {
                    const { stdout, stderr } = await execPromise(commandToExecute);
                    await m.reply(`/*\nSukses Get Plugin\n${selectedPlugin}\n*/\n\n${stdout}`);
                } catch (error) {
                    await m.reply(`*Error:* ${error.message}`);
                }
            } else {
                await m.reply('*Indeks plugin salah* atau di luar rentang yang sesuai.');
            }
        } else {
            await m.reply('*Indeks kategori salah* atau di luar rentang yang sesuai.');
        }
    } else {
        await m.reply('*Format perintah tidak valid.* Gunakan "gp" untuk menampilkan list kategori, "gp 1" untuk menampilkan list file dalam kategori, atau "gp 1 2" untuk menjalankan operasi tertentu.');
    }
}

handler.help = ['gp'].map(v => v + ' *index*')
handler.tags = ['owner']
handler.command = /^(gp)$/i
handler.rowner = true

export default handler
