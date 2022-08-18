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

//Реакция на команду start
function keyboardStart(ctx) {
  ctx.replyWithHTML("Hi", {
    reply_markup: Markup.keyboard([
      ["📅 Расписание", "📍 Адрес площадки"],
      ["💵 Стоимость тренировки"],
      ["Инстаграм", "Телеграм "],
    ]),
  });
}
bot.start(async (ctx) => {
  try {
    await ctx.replyWithHTML(
      `Привет, <b>${ctx.message.from.first_name}</b> 🤗
Что ты хочешь узнать?

Или закрой меню 👉 /stop 
      `,
      Markup.keyboard([
        ["📅 Расписание", "📍 Адрес площадки"],
        ["💵 Стоимость тренировки"],
        ["Инстаграм", "Телеграм "],
      ])
    );
  } catch (error) {
    console.error(error);
  }
});

//Команды через слеш
bot.command("stop", (ctx) => {
  try {
    ctx.replyWithMarkdown(
      `${ctx.message.from.first_name}, я закрыл меню, но ты можешь вызвать его снова.
  
Просто нажми 👉 /start`,
      {
        reply_markup: {
          remove_keyboard: true,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
});

bot.command("inst", async (ctx) => {
  try {
    await ctx.replyWithHTML(helpText.inst);
  } catch (error) {
    console.error(error);
  }
});
bot.command("pay", async (ctx) => {
  try {
    await ctx.replyWithHTML(helpText.pay);
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
      ctx.reply(
        helpText.helloBot,
        Markup.keyboard([
          ["📅 Расписание", "📍 Адрес площадки"],
          ["💵 Стоимость тренировки"],
          ["Инстаграм", "Телеграм "],
        ])
      );
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
      });
    }
    if (msg.includes("стоимость")) {
      ctx.replyWithHTML(helpText.pay, {
        reply_markup: {
          remove_keyboard: true,
        },
      });
    }
    if (msg.includes("сколько стоит")) {
      ctx.replyWithHTML(helpText.pay, {
        reply_markup: {
          remove_keyboard: true,
        },
      });
    }

    if (msg.includes("адрес")) {
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

bot.on("new_chat_member", async (ctx) => {
  if (ctx.message.new_chat_members) {
    await ctx.reply(`Привет, ${ctx.message.new_chat_member.first_name} 😜
  
Мы всегда рады сежей кровушке 🩸😁

Чтобы узнать основную информацию нажми 👉 /start
  `);
  } else {
    ctx.reply("Добро пожаловать в самый спортивный чат Каша 🥳");
  }
});

//Автоматическая рассылка сообщения в группу
function keyboardInst() {
  bot.telegram.sendMessage(CHAT_ID, helpText.text, {
    parse_mode: "HTML",
  });
}
nodecron.schedule("30 7 * * *", keyboardInst);

//Код чтобы heroku пробуждался каждые 20 минут
const request = require("request");
const ping = () =>
  request(
    "https://git.heroku.com/kas-training-bot.git",
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
