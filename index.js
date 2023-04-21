

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('6240794176:AAEjQXgb79w3kMs9NcTwp074lF38L8yD_mA', {polling: true});
const chatId = '325769685';


const axios = require('axios');

const OPENAI_API_KEY = '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';
const apiUrl = 'https://api.openai.com/v1/chat/completions';

bot.on('message', (msg) => {

    const text = msg.text;
    console.log(`Получено сообщение от пользователя: "${text}"`);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
    };

    const data = {
        'model': 'gpt-3.5-turbo',
        'messages': [{'role': 'user', 'content': `${text}`}],
        'temperature': 1
    };

    axios.post(apiUrl, data, {headers})
        .then(response => {
            console.log(response.data.choices[0].message.content);
            bot.sendMessage(chatId, response.data.choices[0].message.content)
                .then(() => {
                    console.log('Повідомлення успішно відправлено з клавіатурою!');
                })
                .catch((error) => {
                    console.error('Помилка відправки повідомлення з клавіатурою:', error);
                });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

