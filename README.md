### Решение тестового задание
#### (разработка еще не завершена)

1. Требования
   - Сервис должен базироваться на node.js 12+
   - Сервис должен быть написан на Typescript
   - Сервис может использовать любые пакеты с npm
   - Сервис в качестве единственной базы данных должен использовать PostgreSQL
   - Каждый используемый SQL-запрос должен находится в отдельном файле с расширением .sql (удобно
использовать, например, pg-promise)
   - Необходимо иметь возможность запустить 2, 5 и более дополнительных инстансов сервиса, при этом это
не должно влиять на суть работы сервиса
   - Пользовательский интерфейс сервиса — http+html; нет требований к качеству и построению;
рекомендуется использовать рендеринг на сервере и полные перезагрузки страниц; можно сделать в виде
отдельного сервиса
   - Рекомендуем использовать docker-compose для запуска сервисов и базы данных
   - Сервис может получать данные из сторонних API
   - Иметь настраиваемое общее на все инстансы ограничение на частоту запросов к внешнему API (единица —
количество запросов в минуту)
2. Функционал через сценарий
   - Пользователь через интерфейс добавляет биткоин-адрес в список отслеживаемых
   - Отображается постоянно:
      - Последняя (максимальная) высота блока в блокчейне; дата и время последней проверки
      - Список отслеживаемых адресов:
         - Адрес
         - Баланс в биткоинах
         - Дата-время последней проверки, абсолютное и относительное (“5 секунд назад”) время
      - Сколько инстансов сервиса сейчас запущено
   - Пользователь может убрать адрес из списка отслеживаемых
3. Как передать
   - Git-репозиторий
   - В ридми достаточная инструкция по отработки всех нужных сценариев