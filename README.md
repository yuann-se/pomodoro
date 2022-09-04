# pomodoro

**Трекер задач по методу Помодоро** 🍅

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## Функционал

<details>
<summary markdown="span"> Работа со списками задач (добавить, редактировать, удалить, завершить)</summary>
:bookmark_tabs:
  
Пользователь может запланировать несколько задач и для каждой
задать примерное количество «помидоров» (временных интервалов), которое необходимо, чтобы её
выполнить. 
  
  Верхняя задача из списка — это текущая задача. При успешном завершении задача переходит в список выполненных задач.
 </details>

<details>
 <summary markdown="span"> Работа с таймером (старт, стоп, пауза, продолжить, пропустить, завершить)</summary>
:alarm_clock:
  
Интревалы работы чередуются с более короткими интервалами отдыха. 
  
  Пользователь может поставить таймер на паузу, если его отвлекли, а также полностью прекратить выполнение задачи, удалив ее, либо отметив завершенной. 
 </details>
 
 <details>
<summary markdown="span"> Статистика использования таймера (общее время, время на паузе, остановки и др.)</summary>
:bar_chart:
  
На этой странице отображается статистика по использованию приложения и
некоторые полезные метрики. 
  
  Пользователь может посмотреть столбчатую
диаграмму с количеством часов, когда он работал с таймером. Может выбрать
неделю, за которую он хочет посмотреть статистику. Может посмотреть
дополнительные метрики, такие как:
  
- Фокус (отношение времени, потраченного на
законченные «помидорки», к общему времени работы с таймером)

- Время на паузе

- Остановки
</details>

## Особенности

- Состояние приложение сохраняется при перезагрузке
- По истечении таймера раздаётся сигнал и появляется модальное окно с уведомлением
- Верстка на гридах

## Запуск

`npm start` для запуска в режиме разработки

:star: **Поменять интервалы работы таймера можно в файле settings.ts в директории src**

:star: **В целях демонстрации страницы со статистикой Local Storage заполняется моковыми данными за 3 недели (не включая текущий день).
Необходимо будет обновить страницу**

**Посмотреть на Vercel --> [pomodoro](https://pomodoro-task-tracker.vercel.app/)** :rainbow:

<img src="https://drive.google.com/uc?export=view&id=1RdD9XvSRWD54TOamGYeQV--09o3ZlJzt" width="200" />

## Превью

**Главная:**

<img src="https://drive.google.com/uc?export=view&id=1vtGCXddUMOQyHFGyBGtXu-o_glefKOKZ" width="600" />

**Статистика:**

<img src="https://drive.google.com/uc?export=view&id=1e1QCKQp13z3iI5iIfaKptP-WvRLzm1g7" width="600" />
