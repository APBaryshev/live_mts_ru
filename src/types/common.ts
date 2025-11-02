export interface EventCard {
    title: string;
    date: string;
    venue: string;
    price: string;
    discount?: string;
}

export interface NavigationItem {
    name: string;
    testId: string;
    url: string;
}

export interface CarouselSection {
    title: string;
    events: EventCard[];
}

export interface User {
    phone: string;
    password: string;
    isLoggedIn: boolean;
}
