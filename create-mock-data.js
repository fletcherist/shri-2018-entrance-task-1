const { models, sequelize } = require('./models');

/* Fisher–Yates shuffle */
function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

const ONE_MINUTE = 1000 * 60
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const randomFromArray = array => array[Math.floor(Math.random() * array.length)]
const getNextDay = date => {
  const newDate = date
  return new Date(newDate.getTime() + ONE_DAY)
}
const delay = ms => new Promise(resolve => setTimeout(resolve, delay))

const MOCK_USERS = [
  {
    login: 'veged',
    avatarUrl: 'https://avatars3.githubusercontent.com/u/15365?s=460&v=4',
    homeFloor: 0,
    username: 'Sergey Berezhnoy'
  },
  {
    login: 'alt-j',
    avatarUrl: 'https://avatars1.githubusercontent.com/u/3763844?s=400&v=4',
    homeFloor: 3,
    username: 'Andrey Morozov'
  },
  {
    login: 'yeti-or',
    avatarUrl: 'https://avatars0.githubusercontent.com/u/1813468?s=460&v=4',
    homeFloor: 2,
    username: 'Vasiliy'
  },
  {
    login: 'fletcherist',
    avatarUrl: 'https://avatars2.githubusercontent.com/u/15146860?s=400&u=ad90f76cc64e2b4807f883286c6a7335531f954e&v=4',
    homeFloor: 7,
    username: 'Phil Romanov'
  }
]

const MOCK_ROOMS = [
  {
    title: '404',
    capacity: 5,
    floor: 4
  },
  {
    title: 'Деньги',
    capacity: 4,
    floor: 2
  },
  {
    title: 'Карты',
    capacity: 10,
    floor: 2
  },
  {
    title: 'Ствола',
    capacity: 8,
    floor: 2
  },
  {
    title: 'Синий кит',
    capacity: 50,
    floor: 5 // not sure
  },
  {
    title: 'Инь',
    capacity: 3,
    floor: 3
  },
  {
    title: 'Янь',
    capacity: 15,
    floor: 3
  },
  {
    title: 'Серафим',
    capacity: 10,
    floor: 6
  }
]

const MOCK_TITLES = [
  'ШРИ 2018 - начало', '👾 Хакатон 👾', '🍨 Пробуем kefir.js',
  '💣 Лекция в ШРИ', 'Обсуждаем планы на вечер', 'title is undefined (joke)',
  'Обед', '🔊 Смотрим Хурал', '🕔 Ежедневный стендап', '♠️ Планируем будущее',
  '📩 Демо Почты', '🎎 Смотрим Игру Престолов', '📚 Ежедневная встреча маркетинга', '♔ Играем в шахматы',
  'Демо по фронтенду', '💣 Технологический холивар 💣', 'Лекция по алгоритмам и структурам данных',
  'Митап по анализу данных', 'Воркшоп', 'Еженедельный отчёт'
]

const createEventEnd = timeStart => new Date(timeStart.getTime() + ONE_MINUTE * randomIntFromInterval(30, 120))
const createGapBetweenEvents = timeEnd => new Date(timeEnd.getTime() + ONE_MINUTE * randomIntFromInterval(20, 70))
const flatten = arr => Array.isArray(arr) ? arr.reduce((done,curr) => done.concat(flatten(curr)), []) : arr

const EVENTS_COUNT = 7
const DAY_COUNT = 15
function createEventsForRoom(dateStart) {
  const eventsArray = []
  let timeStart = dateStart
  timeStart.setHours(8)
  timeStart.setMinutes(0)
  timeStart.setSeconds(0)
  for (let i = 0; i < EVENTS_COUNT; i++) {
    let timeEnd = createEventEnd(timeStart)
    eventsArray.push({
      title: randomFromArray(MOCK_TITLES),
      dateStart: timeStart,
      dateEnd: timeEnd
    })
    timeStart = createGapBetweenEvents(timeEnd)
  }

  return eventsArray
}

function createData () {
  let usersPromise = models.User.bulkCreate(MOCK_USERS);
  let roomsPromise = models.Room.bulkCreate(MOCK_ROOMS);

  let eventsInRooms = []
  let currentDate = new Date()
  for (let i = 0; i < DAY_COUNT; i++) {
    const dailyEvents = flatten(
      MOCK_ROOMS.map(room => {
        return createEventsForRoom(currentDate)
      })
    )
    currentDate = getNextDay(currentDate)
    eventsInRooms = eventsInRooms.concat(dailyEvents)
  }

  let eventsPromise = models.Event.bulkCreate(eventsInRooms);

  Promise.all([usersPromise, roomsPromise, eventsPromise])
    .then(() => Promise.all([
      models.User.findAll(),
      models.Room.findAll(),
      models.Event.findAll()
    ]))
    .then(function ([users, rooms, events]) {
      let promises = []
      let roomIndex = 0

      events.forEach((event, index) => {
        const RANDOM_USER_ID = randomIntFromInterval(0, users.length - 2)

        promises.push(events[index].setRoom(rooms[Math.max(roomIndex)]))
        promises.push(events[index].setUsers([users[RANDOM_USER_ID], users[RANDOM_USER_ID + 1]]))

        if ((index + 1) % EVENTS_COUNT === 0) {
          if (roomIndex === MOCK_ROOMS.length - 1) {
            roomIndex = 0
          } else {
            roomIndex += 1
          }
        }
      })

      return Promise.all(promises);
    })
    .catch(error => console.log(error));
}

sequelize.sync()
  .then(createData);
