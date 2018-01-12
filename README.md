# Приложение для создания и редактирования информации о встречах сотрудников

Пройдёмся по ошибкам:

## Ошибка 1

**[Фикс](https://github.com/fletcherist/shri-2018-entrance-task-1/commit/116f0e593c8ce4a9a336a7f80ebe389e64b63acc#diff-18c449caa39363f82bacb4f7489e7783R4)**

`Node`-приложение не запускалось, потому что была неправильно был инициализирован модуль для работы с `sqlite`

## Ошибка 2



**[Фикс]()**

## Поле Username в таблице
Я также добавил в схему поле `username` с именами пользователей, поскольку его не было, а были только логины.


<img height=300 src='https://pp.userapi.com/c840620/v840620100/448b8/M5rJ6JwKhCQ.jpg'/>


## Мокаем данные
Я попробовал сделать диаграмму, максимально похожую на макет. Смотрите сами:

<img height=300 src='https://pp.userapi.com/c840620/v840620100/448f0/EK_CloNPHDs.jpg'/>


Данные мокались на месяц вперёд, с расчётом на то, чтобы вы зашли там, скажем, в конце января и не увидели пустое расписание.


[Коммит, где мокаем данные](https://github.com/fletcherist/shri-2018-entrance-task-1/commit/d1c032f29ab6756076ee69a9a9cd049ad4dfaffe#diff-329d3df6b8b3e1e2cdf0937013f7e7d4R3)


## Деплой
Следующим логичным шагом стал деплой приложения на **Heroku**


https://yandex-rooms-graphql.herokuapp.com/


С самого начала я хотел раздеплоить третье задание на `gh-pages`, поэтому мне понадобась поддержка кроссдоменных запросов.

[Коммит с поддержкой CORS](https://github.com/fletcherist/shri-2018-entrance-task-1/commit/a51bcf524bc19d39141ce05f2ccf13c1e1a162ef)







## Запуск
```
npm i
npm run dev
```

Для сброса данных в базе:
```
npm run reset-db
```
