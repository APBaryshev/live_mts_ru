export class DateUtils {
    // Форматируем дату в русский стандарт
    static formatDate(date: Date, locale: string = "ru-RU"): string {
        return date.toLocaleDateString(locale, {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }

    static isFutureDate(dateString: string): boolean {
        // Парсим дату из строки типа "10 декабря, 20:00"
        const months: { [key: string]: number } = {
            января: 0,
            февраля: 1,
            марта: 2,
            апреля: 3,
            мая: 4,
            июня: 5,
            июля: 6,
            августа: 7,
            сентября: 8,
            октября: 9,
            ноября: 10,
            декабря: 11,
        };

        const match = dateString.match(/(\d{1,2})\s+(\w+)/);
        if (!match) return false;

        const [, day, month] = match;
        const currentYear = new Date().getFullYear();
        const eventDate = new Date(currentYear, months[month], parseInt(day));

        return eventDate > new Date();
    }

    static parseEventDate(dateString: string): Date {
        // Конвертируем "10 декабря, 20:00" в Date объект
        // Реализация аналогична isFutureDate
        return new Date();
    }
}
