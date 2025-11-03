export class DateUtils {
    // Форматирование даты
    static formatDate(date: Date, locale: string = "ru-RU"): string {
        return date.toLocaleDateString(locale, {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }

    // Проверка будущей даты
    static isFutureDate(dateString: string): boolean {
        try {
            const eventDate = this.parseEventDate(dateString);
            return eventDate > new Date();
        } catch {
            return false;
        }
    }

    // Полный парсинг дат событий MTS Live
    static parseEventDate(dateString: string): Date {
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

        // Обрабатываем разные форматы MTS Live:
        // "10 декабря, 20:00", "10 дек, 20:00", "10 декабря 2024, 20:00"

        const patterns = [
            // "10 декабря, 20:00"
            /(\d{1,2})\s+(\w+),\s*(\d{1,2}):(\d{2})/,
            // "10 декабря 2024, 20:00"
            /(\d{1,2})\s+(\w+)\s+(\d{4}),\s*(\d{1,2}):(\d{2})/,
            // "10 дек, 20:00" (сокращенные месяцы)
            /(\d{1,2})\s+(\w{3}),\s*(\d{1,2}):(\d{2})/,
        ];

        for (const pattern of patterns) {
            const match = dateString.match(pattern);
            if (match) {
                let day: string, month: string, year: string, hours: string, minutes: string;

                if (match.length === 5) {
                    // Формат "10 декабря, 20:00"
                    [, day, month, hours, minutes] = match;
                    year = new Date().getFullYear().toString();
                } else if (match.length === 6) {
                    // Формат "10 декабря 2024, 20:00"
                    [, day, month, year, hours, minutes] = match;
                } else {
                    continue; // Пропускаем если не подошел формат
                }

                // Обрабатываем сокращенные названия месяцев
                const fullMonth = this.getFullMonthName(month);
                const monthIndex = months[fullMonth];

                if (monthIndex !== undefined) {
                    return new Date(parseInt(year), monthIndex, parseInt(day), parseInt(hours), parseInt(minutes));
                }
            }
        }

        throw new Error(`Не удалось распознать дату: ${dateString}`);
    }

    // Вспомогательный метод для полных названий месяцев
    private static getFullMonthName(shortName: string): string {
        const monthMap: { [key: string]: string } = {
            янв: "января",
            фев: "февраля",
            мар: "марта",
            апр: "апреля",
            май: "мая",
            июн: "июня",
            июл: "июля",
            авг: "августа",
            сен: "сентября",
            окт: "октября",
            ноя: "ноября",
            дек: "декабря",
        };
        return monthMap[shortName] || shortName;
    }

    // Проверка что дата сегодня
    static isToday(date: Date): boolean {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }

    // Проверка что дата в текущем месяце
    static isThisMonth(date: Date): boolean {
        const today = new Date();
        return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    }

    // Добавление дней к дате
    static addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    // Форматирование для отображения времени
    static formatTime(date: Date, locale: string = "ru-RU"): string {
        return date.toLocaleTimeString(locale, {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    // Получение завтрашней даты в формате MTS Live
    static getTomorrowDate(): string {
        const tomorrow = this.addDays(new Date(), 1);
        return this.formatDate(tomorrow);
    }
}
