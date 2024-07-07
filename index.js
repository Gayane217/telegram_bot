const TelegramBot = require('node-telegram-bot-api')

const token = '7260697198:AAH0qvakOr5ZSkMQAam7W_MW6HX5gJsdjKw'

const bot = new TelegramBot(token, {polling: true})

bot.on('text', (msg) => {
  const chatId = msg.chat.id

  bot.sendMessage(chatId, "Received your message")
})

bot.setMyCommands([
  { command: 'start', description: 'Bot starts work' }
])

const inline_keyboard = [
  [
    { text: 'Paper', callback_data: 'paper' },
  ],
  [
    { text: 'Stone', callback_data: 'stone' },
  ],
  [
    { text: 'Scissors', callback_data: 'scissors' },
  ]
]

let winCount = 0
let loseCount = 0

bot.on('text', (msg) => {
  const chatId = msg.chat.id

  if (msg.text === '/start') {
    bot.sendMessage(chatId, "Inline keyboard", {
      reply_markup: { inline_keyboard }
    })
  }
})

bot.on('callback_query', (query) => {
  const { chat } = query.message
  let randEl = Math.floor(Math.random() * inline_keyboard.length)
  let randChoise = inline_keyboard[randEl][0].callback_data

  if (query.data === randChoise) {
    bot.sendPhoto(chat.id, './assets/draw.png', {
      caption: 'Draw ' + winCount + ':' + loseCount,
      reply_markup: { inline_keyboard }
    })
  } else if (
    query.data === 'stone' && randChoise === 'paper'
    || query.data === 'paper' && randChoise === 'scissors'
    || query.data === 'scissors' && randChoise === 'stone'
  ) {
    loseCount++
    bot.sendPhoto(chat.id, './assets/lose.jpg', {
      caption: 'Lose ' + winCount + ':' + loseCount,
      reply_markup: { inline_keyboard }
    })
  } else if (
    query.data === 'stone' && randChoise === 'scissors'
    || query.data === 'paper' && randChoise === 'stone'
    || query.data === 'scissors' && randChoise === 'paper'
  ) {
    winCount++
    bot.sendPhoto(chat.id, './assets/win.png', {
      caption: 'Win ' + winCount + ':' + loseCount,
      reply_markup: { inline_keyboard }
    })
  }

  bot.answerCallbackQuery(query.id)
})




