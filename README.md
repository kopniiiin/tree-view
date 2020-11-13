# Tree view

[Опубликованное решение](https://kopniiiin.github.io/tree-view-build/)

---

Команды:
* `npm i` - установка зависимостей
* `npm run start` - локальный сервер для разработки
* `npm run build` - сборка бандла в продакшн
* `npm run test` - проверка кода линтерами

---

Инструменты:
* React
* Redux и Redux Thunk
* TypeScript
* Axios
* ESLint (конфиг от Google)
* webpack (конфиг от меня 🙂)

---

Важные моменты:
* Форма создания/изменения объекта отображается в верхней части приложения
* Сообщения об ошибках взаимодействия с сервером отображаются в нижней части приложения
* Возможно создавать/изменять только один объект одновременно
* На поле Title наложены ограничения:
  * Поле обязательно для заполнения
  * Первый символ - цифра или буква
