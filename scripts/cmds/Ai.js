const axios = require('axios');

let PriyaPrefix = [
  'ai',
  'shika', // Add Your Prefix Here
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

  onChat: async function ({ message, event, args, api}) {
    if (!args || args.length === 0) return;

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
      if (newPrefix &&!PriyaPrefix.includes(newPrefix)) {
        PriyaPrefix.push(newPrefix);
        await message.reply(`✅ Nouveau préfixe "${newPrefix}" ajouté avec succès!`);
} else {
        await message.reply('⚠️ Veuillez fournir un préfixe valide et unique.');
}
      return;
}

    // Check for valid prefix
    const ahprefix = PriyaPrefix.find((p) => event.body?.toLowerCase().startsWith(p));
    if (!ahprefix) return;

    const prompt = event.body.substring(ahprefix.length).trim();
    if (!prompt) {
      await message.reply('𝐌𝐨𝐢 𝐢 𝐚𝐦 𝐃𝐚𝐧𝐚𝐤𝐫𝐨 𝐀𝐢 𝐕2👾 𝐐𝐮𝐞𝐥𝐥𝐞 𝐞𝐬𝐭 𝐯𝐨𝐭𝐫𝐞 𝐪𝐮𝐞𝐬𝐭𝐢𝐨𝐧?👾');
      return;
}

    // Random greeting for "hi"
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

    await message.reply('𝐃𝐀𝐍𝐀𝐊𝐑𝐎 𝐀𝐈 recherche la réponse...........⏳🕔');

    try {
      const encodedPrompt = encodeURIComponent(prompt);
      const response = await axiosInstance.get(`https://fuku-api-v4.onrender.com/ask?prompt=${encodedPrompt}`);
      const replyText = response.data;

      await message.reply(`${replyText}`);
} catch (error) {
      console.error("Erreur API:", error.message);
      await message.reply('❌ Une erreur est survenue. Réessaie plus tard!');
}
}
};
