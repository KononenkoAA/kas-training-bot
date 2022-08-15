const help = `
Вы можете управлять мной, посылая эти команды:

/start - запустить бота
/stop - закрыть клавиатуру
/inst - посмотреть инстаграм
/command - быстрые команды бота (пока нет их)

`;

//Текст для приветсвия
const arrGoodMoning = [
  "доброе утро ☺️",
  "всем привет!))",
  "доброе бодрое утро ☺️",
  "всем хауюшки 😎",
  "сегодня лучший день, чтобы быть активными 💪",
  "всем хай👋",
  "всем коза 🤘",
  "гууууд монинг 🙃",
  "доброе утречко 😜",
  "приветосы 👀",
  "привет всем 😉",
  "я рад вас пробудить своим сообщением 😁",
];

//Выбор текста для приветсвия случайным образом
const randomGoodMoning = Math.floor(Math.random() * arrGoodMoning.length);
const textGoodMoning = arrGoodMoning[randomGoodMoning];

//Текст для цитаты
const arrQuotes = [
  "Здоровье до того перевешивает все остальные блага жизни, что поистине здоровый нищий счастливее больного короля. Артур Шопенгауэр.",

  "Требуй от себя невозможного и получишь максимум. Дмитрий Вячеславович Клоков.",

  "Не огорчайся неудачам. Падают все. Только кто-то встает быстрее, а кто-то продолжает валяться и ныть. Майк Тайсон. Все цитаты легендарного Майка Тайсона",

  "Кто рассчитывает обеспечить себе здоровье, пребывая в лени, тот поступает так же глупо, как и человек, думающий молчанием усовершенствовать свой голос. Плутарх",

  "Если у тебя все в порядке с желудком, грудью, ногами, никакие царские сокровища не смогут ничего прибавить. Гораций",

  "Сила – это здоровье. Здоровье без силы невозможно. Айшек Норам",

  "Как жизнь может быть самым ценным для человека, если чем меньше здоровья, тем меньше жизни? Чтобы отобрать жизнь, не нужно лишать жизни, достаточно отобрать здоровье. Евгений Витальевич Антонюк",

  "Ты можешь сказать, что у тебя плохая генетика, плохой обмен веществ, а можешь просто поднять свою задницу с дивана и начать работать над собой, задаться целью и верить в себя. В этом случае ты обязательно добьёшься успеха. Арнольд Шварценеггер",

  "Спорт очень хорошо помогает избавиться от всех вредных привычек. Жан Поль Бельмондо",

  "Победит не тот, кто сильнее, а тот, кто готов идти до конца. Федор Емельяненко",

  "Сила зависит не от физических способностей, а от несгибаемой воли. Махатма Ганди",

  "Здоровье гораздо более зависит от наших привычек и питания, чем от врачебного искусства. Джон Леббок",

  "Пять составляющих пути к победе – это стойкость, скорость, сила, мастерство и воля. Причем воля – это самое главное! Кен Доэрти",

  "В здоровом теле — здоровый дух. Ювенал",

  "Человек может жить до 100 лет. Мы сами своей невоздержанностью, своей беспорядочностью, своим безобразным обращением с собственным организмом сводим этот нормальный срок до гораздо меньшей цифры. Павлов И.П.",

  "Спорт не воспитывает характер, а выявляет его. Хейвуд Браун",

  "Мы всегда должны выходить за пределы. Арнольд Шварценеггер",

  "Здоровый человек есть самое драгоценное произведение природы. Карлейль Т",

  "Никакое усилие не бывает напрасным: Сизиф развивал мускулы. Поль Валери",

  "Я не ожидаю подходящего настроения. Если его ожидать, ничего не достигнешь. Перл Бак",

  "Никто не хочет вставать в 4 утра и идти бегать, когда еще совершенно темно, но это необходимо. Единственная причина, почему я это делаю так рано – это потому, что я верю в то, что никто другой не делает это. И это дают мне маленькое преимущество. Майк Тайсон",

  "Единственная красота, которую я знаю, — это здоровье. Христиан Иоганн Генрих Гейне",

  "Сделайте хотя бы раз то, что, по словам окружающих, вам не по плечу. После этого вы уже никогда не будете обращать внимание на их правила и ограничения. Джеймс Кук",

  "Мне нравится, что я делаю то, чего не делают остальные, поэтому я победитель! Джей Катлер",

  "Если человек сам следит за своим здоровьем, то трудно найти врача, который знал бы лучше полезное для его здоровья, чем он сам. Сократ",

  "Если вы можете мечтать об этом, вы можете это сделать. Уолт Дисней",

  "Успех - это идти от неудачи к неудаче, не теряя энтузиазма. Уинстон Черчилль",

  "Не считай дни, извлекай из них пользу. Мухаммед Али",

  "Не ждите. Время никогда не будет подходящим. Наполеон Хилл",

  "Неисследованная жизнь не стоит того, чтобы ее жить. Сократ",

  "Усердно работайте, мечтайте по-крупному",

  "Я не потерпел неудачу. Я просто нашел 10 000 способов, которые не работают. Томас Эдисон",

  "Мотивация - это то, что заставляет вас начать. Привычка - это то, что заставляет вас продолжать. Джим Рюн",

  "Вы должны выучить правила игры. А затем вы должны играть лучше, чем кто-либо другой. Альберт Эйнштейн",

  "Если вы потратите свою жизнь на то, чтобы быть лучшим во всем, вы никогда не станете великим ни в чем. Том Рат",

  "Сначала они не замечают тебя, затем смеются над тобой, потом борются с тобой, а потом ты побеждаешь. Махатма Ганди",

  "Мечтатели - это спасители мира. Джеймс Аллен",

  "Лучшая месть - это огромный успех. Фрэнк Синатра",

  "Измени свои мысли и ты изменишь мир. Норман Винсент Пил",

  "Упорный труд побеждает талант, когда талант не трудится. Неизвестный",

  "По моему опыту, существует только одна мотивация, и это - желание. Никакие причины или принципы не могут его сдержать и или противостоять ему. Джейн Смайли",

  "Мужество - первое из человеческих качеств, потому что это качество, которое гарантирует все остальные. Уинстон Черчилль",

  "Победа - это еще не все, главное это постоянное желание побеждать. Винс Ломбарди",

  "Чтобы справиться с собой, используйте голову; чтобы справиться с другими, используйте свое сердце. Элеонора Рузвельт",

  "Неудача никогда не одолеет меня, если моя решимость добиться успеха достаточно сильна. Ог Мандино",

  "Жизнь на 10% состоит из того, что с вами происходит, и на 90% из того, как вы на это реагируете. Чарльз Р. Свиндолл",

  "Сначала делайте тяжелую работу. Легкая работа сама о себе позаботится. Дейл Карнеги",

  "Один из важных ключей к успеху - уверенность в себе. Важный ключ к уверенности в себе - подготовка. Артур Эш",

  "Если вы поставите перед собой абсурдно высокие цели, и это обернется неудачей, ваша неудача будет выше успеха всех остальных. Джеймс Кэмерон",
];

//Выбор цитат для приветсвия случайным образом
const randomQuotes = Math.floor(Math.random() * arrQuotes.length);
const textQuotes = arrQuotes[randomQuotes];

const text = `
Друзья, ${textGoodMoning}

Цитата дня: 

\"${textQuotes}\"

Запустить бота 👉 /start
`;



module.exports.help = help;
module.exports.text = text;


