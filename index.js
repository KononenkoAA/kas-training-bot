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
      `Привет, <b>${ctx.message.from.first_name}</b> 🤗`,
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
  ctx.replyWithMarkdown(
    `*${ctx.message.from.first_name}*, я закрыл клавиатуру, но ты можешь ее вызвать снова.

Просто нажми 👉 /start
`,
    {
      reply_markup: {
        remove_keyboard: true,
      },
    }
  );
});
bot.command("inst", async (ctx) => {
  await ctx.replyWithHTML(helpText.inst, {
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
bot.command("pay", async (ctx) => {
  await ctx.replyWithHTML(helpText.pay, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Оплати тренировку прямо сейчас",
            url: "https://www.tinkoff.ru/rm/kononenko.artem14/OFN0S99169",
            callback_data: "payOnline",
          },
        ],
      ],
    },
  });
});
bot.command("timetable", async (ctx) => {
  await ctx.reply(helpText.timetable);
});

//Реакция на команду help
bot.help((ctx) => ctx.reply(helpText.help));

//Рекация на ключевые слова
bot.on("message", async (ctx) => {
  const msg = ctx.message.text.toLowerCase();

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
    ctx.reply(helpText.timetable);
  }
  if (msg.includes("распсиание")) {
    ctx.reply(helpText.timetable);
  }
  if (msg.includes("распиание")) {
    ctx.reply(helpText.timetable);
  }

  if (msg.includes("оплата")) {
    ctx.reply(helpText.pay, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Оплати тренировку прямо сейчас",
              url: "https://www.tinkoff.ru/rm/kononenko.artem14/OFN0S99169",
              callback_data: "payOnline",
            },
          ],
        ],
      },
    });
  }
  if (msg.includes("стоимость")) {
    ctx.reply(helpText.pay, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Оплати тренировку прямо сейчас",
              url: "https://www.tinkoff.ru/rm/kononenko.artem14/OFN0S99169",
              callback_data: "payOnline",
            },
          ],
        ],
      },
    });
  }
  if (msg.includes("сколько стоит")) {
    ctx.reply(helpText.pay, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Оплати тренировку прямо сейчас",
              url: "https://www.tinkoff.ru/rm/kononenko.artem14/OFN0S99169",
              callback_data: "payOnline",
            },
          ],
        ],
      },
    });
  }

  if (msg.includes("адрес")) {
    ctx.reply(helpText.adress, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Смотри адрес на картах",
              url: "https://goo.gl/maps/gTnDtdGi5c9zGtkQ7",
              callback_data: "payOnline",
            },
          ],
        ],
      },
    });
  }
  if (msg.includes("гео")) {
    ctx.reply(helpText.adress, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Смотри адрес на картах",
              url: "https://goo.gl/maps/gTnDtdGi5c9zGtkQ7",
              callback_data: "payOnline",
            },
          ],
        ],
      },
    });
  }

  if (msg.includes("инста")) {
    ctx.reply(
      helpText.inst,
      {
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
      },
      {
        reply_markup: {
          remove_keyboard: true,
        },
      }
    );
  }
  if (msg.includes("телеграм")) {
    ctx.reply(helpText.telegram);
  }
});

//Автоматическая рассылка сообщения в группу
function keyboardInst() {
  bot.telegram.sendMessage(CHAT_ID, helpText.text, {
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
nodecron.schedule("1 7 * * *", keyboardInst);

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
