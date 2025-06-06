const axios = require('axios');

let PriyaPrefix = [
  'ai',
  'shika',// Add Your Prefix Here
];

const axiosInstance = axios.create();

module.exports = {
  config: {
    name: 'ai',
    version: '2.2.0',
    role: 0,
    category: 'AI',
    author: 'Priyanshi || Priyansh',
    shortDescription: 'Artificial Intelligence',
    longDescription: 'Ask Anything To Ai For Your Answers',
  },

  onStart: async function () {},

  onChat: async function ({ message, event, args, api, threadID, messageID }) {
    const command = args[0].toLowerCase();

    // Help Command
    if (command === '🟢') {
      const helpMessage = `
      🌟 *AI Commands* 🌟
      - Prefixes: ${PriyaPrefix.join(', ')}
      - Add Prefix: addprefix <prefix>
      - AI Query: ${PriyaPrefix[0]} <your query>
      - Say Hi: hi
      `;
      await message.reply(helpMessage);
      return;
    }

    // Add New Prefix Command
    if (command === 'addprefix') {
      const newPrefix = args[1];
      if (newPrefix && !PriyaPrefix.includes(newPrefix)) {
        PriyaPrefix.push(newPrefix);
        await message.reply(`New prefix "${newPrefix}" added successfully!`);
      } else {
        await message.reply('Please provide a valid and unique prefix.');
      }
      return;
    }

    // Check for prefixes in the message
    const ahprefix = PriyaPrefix.find((p) => event.body && event.body.toLowerCase().startsWith(p));
    if (!ahprefix) {
      return;
    }

    const priya = event.body.substring(ahprefix.length).trim();
    if (!priya) {
      await message.reply('𝐌𝐨𝐢 𝐢 𝐚𝐦 𝐃𝐚𝐧𝐚𝐤𝐫𝐨 𝐀𝐢 𝐕2👾 𝐐𝐮𝐞𝐥𝐥𝐞 𝐞𝐬𝐭 𝐯𝐨𝐭𝐫𝐞 𝐪𝐮𝐞𝐬𝐭𝐢𝐨𝐧 ?👾');
      return;
    }

    const apply = [
      '𝚎𝚗𝚝𝚎𝚛 (𝚚)*',
      '𝙷𝚘𝚠 𝙲𝚊𝚗 𝙸 𝙷𝚎𝚕𝚙 𝚈𝚘𝚞?',
      '𝚀𝚞𝚊𝚛𝚢 𝙿𝚕𝚎𝚊𝚜𝚎....',
      '𝙷𝚘𝚠 𝙲𝚊𝚗 𝙸 𝙰𝚜𝚜𝚒𝚜𝚝 𝚈𝚘𝚞?',
      '𝙶𝚛𝚎𝚎𝚝𝚒𝚗𝚐𝚜!',
      '𝙸𝚜 𝚃𝚑𝚎𝚛𝚎 𝚊𝚗𝚢𝚝𝚑𝚒𝚗𝚐 𝙴𝚕𝚜𝚎 𝙸 𝙲𝚊𝚗 𝙳𝚘?'
    ];
    const randomapply = apply[Math.floor(Math.random() * apply.length)];

    if (command === 'hi') {
      await message.reply(randomapply);
      return;
    }

    const encodedPrompt = encodeURIComponent(args.join(' '));

    await message.reply('𝐃𝐀𝐍𝐀𝐊𝐑𝐎 𝐀𝐈 recherche la réponse...........⏳🕔');

    try {
      const response = await axiosInstance.get(`https://priyansh-ai.onrender.com/gemini/ai?query=${encodedPrompt}`);
      const Priya = response.data;
      const priyares = `${Priya}`;
      await message.reply(priyares);
    } catch (error) {
      await message.reply('Oops! 𝐣𝐞 𝐯𝐢𝐞𝐧𝐬 𝐝𝐞 𝐬𝐡𝐨𝐩𝐩𝐞𝐫 𝐮𝐧 𝐛𝐢𝐠 𝐛𝐮𝐠. 𝐫𝐞́𝐞𝐬𝐬𝐚𝐲𝐞𝐫 𝐩𝐥𝐮𝐬 𝐭𝐚𝐫𝐝.');
    }
  }
};
