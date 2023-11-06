import { exec } from 'child_process';
import { promisify } from 'util';
import axios from 'axios';
import fs from 'fs';
import base64 from 'base-64';

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
        m.reply(`*List Kategori:*\n${pluginList}`);
    } else if (!querys[1]) {
        const categoryIndex = parseInt(querys[0]) - 1;

        if (!isNaN(categoryIndex) && categoryIndex >= 0 && categoryIndex < uniqueCategories.length) {
            const selectedCategory = uniqueCategories[categoryIndex];
            const pluginNames = pluginsList.filter(plugin => plugin.split('/')[2] === selectedCategory);
            const pluginList = pluginNames.map((plugin, index) => `${index + 1}. *${plugin.split('/').pop().replace('.js', '')}*`).join('\n');
            m.reply(`*List File dalam Kategori "${selectedCategory}":*\n${pluginList}`);
        } else {
            m.reply('*Input salah* atau angka di luar rentang yang sesuai.');
        }
    } else if (querys[0] && querys[1] && !isNaN(querys[0]) && !isNaN(querys[1])) {
        const categoryIndex = parseInt(querys[0]);
        const pluginIndex = parseInt(querys[1]);

        if (categoryIndex >= 1 && categoryIndex <= uniqueCategories.length) {
            const selectedCategory = uniqueCategories[categoryIndex - 1];
            const pluginNames = pluginsList.filter(plugin => plugin.split('/')[2] === selectedCategory);

            if (pluginIndex >= 1 && pluginIndex <= pluginNames.length) {
                const selectedPlugin = pluginNames[pluginIndex - 1];
                if (querys[0] && querys[1] && querys[2] && querys[3] && !isNaN(querys[0]) && !isNaN(querys[1])) {
                await uploadFileToGitHub(selectedPlugin, querys[2], querys[3]);
                const combinedPath = `${querys[2]}/tree/master/${selectedPlugin.replace('./', '')}`;
                m.reply(`*Sukses Upload Plugin*\n*- File:* ${selectedPlugin}\n*- To:* \n${combinedPath}`);
                } else {
                 m.reply("Input Github Repo Link Or Github Token")
                 }
            } else {
                m.reply('*Indeks plugin salah* atau di luar rentang yang sesuai.');
            }
        } else {
            m.reply('*Indeks kategori salah* atau di luar rentang yang sesuai.');
        }
    } else {
        m.reply('*Format perintah tidak valid.* Gunakan "upgh" untuk menampilkan list kategori, "upgh 1" untuk menampilkan list file dalam kategori, atau "upgh 1 2" untuk menjalankan operasi tertentu.');
    }
}

handler.help = ['upgh'].map(v => v + ' *index*')
handler.tags = ['owner']
handler.command = /^(upgh)$/i
handler.rowner = true

export default handler

async function uploadFileToGitHub(filePath, githubLink, token) {
  const file = fs.readFileSync(filePath).toString();
  console.log(file);
  const content = base64.encode(file);
  console.log(content);

  try {
    await uploadFileApi(token, content, filePath, githubLink);
  } catch (error) {
    console.log(error);
  }
}

async function uploadFileApi(token, content, filePath, githubLink) {
  const data = JSON.stringify({
    "message": "txt file",
    "content": content
  });

  const config = {
    method: 'put',
    url: `https://api.github.com/repos/${githubLink.split('/')[3]}/${githubLink.split('/')[4]}/contents/${filePath}`,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data: data
  };

  try {
    const response = await axios(config);
    console.log(JSON.stringify(response.data));
  } catch (error) {
    throw error;
  }
}