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

const CHAT_ID = "-1001778392567";

bot.start(async (ctx) => {
  try {
    await ctx.replyWithHTML(
      `Привет, <b>${ctx.message.from.first_name}</b> 🤗
Что ты хочешь узнать?
      `,
      {
        reply_markup: {
          keyboard: [
            [{ text: "📅 Расписание" }, { text: "📍 Адрес площадки" }],
            [{ text: "💵 Стоимость тренировки" }],
            [{ text: "Инстаграм" }, { text: "Телеграм" }],
            [{ text: "Закрыть меню" }],
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      },

      ctx.telegram.deleteMessage(ctx.chat.id, ctx.message_id)
      // setTimeout(del, 5 * 1000)
    );
  } catch (error) {
    console.error(error);
  }
});

// let res = ctx.message;
// console.log(res);

// bot.command("del", async (ctx) => {
//   let res = await ctx.reply("deleting");
//   console.log(res);

//   let result = await ctx.telegram.deleteMessage(ctx.chat.id, res.message_id);
//   console.log(result);
// });

// const mess = await ctx.reply();
// setTimeout(async (ctx)=>{
// await ctx.telegram.deleteMessage(из mess вытягивай всю инфу)
// },30*1000)

//Команды через слеш

// bot.command("stop", (ctx) => {
//   try {
//     ctx.replyWithMarkdown(
//       `${ctx.message.from.first_name}, я закрыл меню, но ты можешь вызвать его снова.

// Просто нажми 👉 /start`,
//       {
//         reply_markup: {
//           remove_keyboard: true,
//         },
//       }
//     );
//   } catch (error) {
//     console.error(error);
//   }
// });

bot.command("inst", async (ctx) => {
  try {
    await ctx.replyWithHTML(helpText.inst, {
      disable_web_page_preview: true,
    });
  } catch (error) {
    console.error(error);
  }
});
bot.command("adress", async (ctx) => {
  try {
    await ctx.replyWithHTML(helpText.adress, {
      disable_web_page_preview: true,
    });
  } catch (error) {
    console.error(error);
  }
});
bot.command("pay", async (ctx) => {
  try {
    await ctx.replyWithHTML(helpText.pay, { disable_web_page_preview: true });
  } catch (error) {
    console.error(error);
  }
});
bot.command("timetable", async (ctx) => {
  try {
    await ctx.reply(helpText.timetable);
  } catch (error) {
    console.error(error);
  }
});

//Реакция на команду help
bot.help((ctx) => {
  try {
    ctx.reply(helpText.help);
  } catch (error) {
    console.error(error);
  }
});

//Рекация на ключевые слова
bot.on("message", async (ctx) => {
  const msg = ctx.message.text.toLowerCase();

  if (ctx.message.text !== undefined) {
    if (msg.includes("бот")) {
      ctx.reply(helpText.helloBot, {
        reply_markup: {
          keyboard: [
            [{ text: "📅 Расписание" }, { text: "📍 Адрес площадки" }],
            [{ text: "💵 Стоимость тренировки" }],
            [{ text: "Инстаграм" }, { text: "Телеграм" }],
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      });
    }

    if (msg.includes("Закрыть меню")) {
      ctx.reply(helpText.timetable, {
        reply_markup: {
          remove_keyboard: true,
        },
      });
    }

    if (msg.includes("расписание")) {
      ctx.reply(helpText.timetable, {
        reply_markup: {
          remove_keyboard: true,
        },
      });
    }
    if (msg.includes("распсиание")) {
      ctx.reply(helpText.timetable, {
        reply_markup: {
          remove_keyboard: true,
        },
      });
    }
    if (msg.includes("распиание")) {
      ctx.reply(helpText.timetable, {
        reply_markup: {
          remove_keyboard: true,
        },
      });
    }

    if (msg.includes("оплата")) {
      ctx.replyWithHTML(helpText.pay, {
        reply_markup: {
          remove_keyboard: true,
        },
        disable_web_page_preview: true,
      });
    }
    if (msg.includes("стоимость")) {
      ctx.replyWithHTML(helpText.pay, {
        reply_markup: {
          remove_keyboard: true,
        },
        disable_web_page_preview: true,
      });
    }
    if (msg.includes("сколько стоит")) {
      ctx.replyWithHTML(helpText.pay, {
        reply_markup: {
          remove_keyboard: true,
        },
        disable_web_page_preview: true,
      });
    }

    if (msg.includes("адрес")) {
      ctx.replyWithHTML(helpText.adress, {
        reply_markup: {
          remove_keyboard: true,
        },
      });
    }
    if (msg.includes("локация")) {
      ctx.replyWithHTML(helpText.adress, {
        reply_markup: {
          remove_keyboard: true,
        },
      });
    }
    if (msg.includes("гео")) {
      ctx.replyWithHTML(helpText.adress, {
        reply_markup: {
          remove_keyboard: true,
        },
      });
    }

    if (msg.includes("инста")) {
      ctx.replyWithHTML(helpText.inst, {
        reply_markup: {
          remove_keyboard: true,
        },
      });
    }
    if (msg.includes("телеграм")) {
      ctx.reply(helpText.telegram, {
        reply_markup: {
          remove_keyboard: true,
        },
      });
    }
  } else {
    ctx.reply("ботик не в ресурсе 😴");
  }
});

bot.on("new_chat_member", (ctx) => {
  if (ctx.message.new_chat_member) {
    ctx.reply(`Привет, ${ctx.message.new_chat_member.first_name} 😜
  
Мы всегда рады сежей кровушке 🩸😁

Чтобы узнать основную информацию нажми 👉 /start
  `);
  } else {
    ctx.reply("Добро пожаловать в самый спортивный чат Каша 🥳");
  }
});

//Удаление сообщений бота

//Автоматическая рассылка сообщения в группу
function keyboardInst() {
  bot.telegram.sendMessage(CHAT_ID, helpText.text, {
    parse_mode: "HTML",
  });
}
// function baseInfo() {
//   bot.telegram.sendMessage(CHAT_ID, helpText.baseInfo, {
//     parse_mode: "HTML",
//     reply_markup: {
//       inline_keyboard: [
//         [
//           {
//             text: "Инфо по треням",
//             url: "https://telegra.ph/Trenirovki-v-Kashe-08-19",
//           },
//         ],
//       ],
//     },
//   });
// }

nodecron.schedule("30 7 * * *", keyboardInst);
// nodecron.schedule("5 13 * * *", baseInfo);

//Код чтобы heroku пробуждался каждые 20 минут
const request = require("request");
const ping = () =>
  request(
    "https://kas-training-bot.herokuapp.com/",
    (error, response, body) => {
      console.log("error:", error); // Print the error if one occurred
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      console.log("body:", body); // Print body of response received
    }
  );
setInterval(ping, 20 * 60 * 1000); //каждые 20 мин

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
