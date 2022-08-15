const { Telegraf, Markup } = require("telegraf");

require("dotenv").config();

const nodecron = require("node-cron");
const schedule = require("node-schedule");
const { v1: uuidv1 } = require("uuid");
const bot = new Telegraf(process.env.BOT_TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10,
    },
  },
});
const helpText = require("./text");

//Реакция на команду start
bot.start(async (ctx) => {
  try {
    await ctx.replyWithHTML(
      `Привет, <b>${
        ctx.message.from.first_name ? ctx.message.from.first_name : "незнакомец"
      }</b> 🤗 
  
Что ты хочешь узнать?
  
Или закрой клавиатуру 👉 /stop
  `,
      {
        reply_markup: Markup.keyboard([
          ["📅 Расписание", "📍 Адрес площадки"],
          ["💵 Стоимость тренировки"],
          ["Инстаграм", "Телеграм "],
        ]),
      }
    );
  } catch (error) {
    console.error(error);
  }
});

//Реакция на команду help
bot.help((ctx) => ctx.reply(helpText.help));

//Рекация на ключевые слова
bot.hears("hi", (ctx) => ctx.reply("Hey there"));

//Реакции на команды через слеш
bot.command("inst", async (ctx) => {
  await ctx.replyWithHTML("<b>Мой профиль</b>", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Подпишись на спортивный инстаграм тренера",
            url: "https://instagram.com/artem.online.trainer?igshid=YmMyMTA2M2Y=",
            callback_data: "sportInst",
          },
        ],
        [
          {
            text: "Подпишись на life тренера",
            url: "https://instagram.com/kononenkoaa?igshid=YmMyMTA2M2Y=",
            callback_data: "lifeInst",
          },
        ],
      ],
    },
  });
});

//Отправка сообщения в группу
function keyboardInst() {
  bot.telegram.sendMessage(-758856781, helpText.text, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Подпишись на спортивный инстаграм тренера",
            url: "https://instagram.com/artem.online.trainer?igshid=YmMyMTA2M2Y=",
            callback_data: "sportInst",
          },
        ],
        [
          {
            text: "Подпишись на life тренера",
            url: "https://instagram.com/kononenkoaa?igshid=YmMyMTA2M2Y=",
            callback_data: "lifeInst",
          },
        ],
      ],
    },
  });
}
nodecron.schedule("47 15 * * *", keyboardInst);

// function action(name, url, text) {
//   bot.action("name", async (ctx) => {
//     try {
//       await ctx.answerCbQuery();
//       await ctx.replyWithHTML("text", {
//         disable_web_page_preview: true,
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   });
// }

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

console.log("бот запущен");
