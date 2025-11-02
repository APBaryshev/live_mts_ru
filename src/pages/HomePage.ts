import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from '../components/HeaderComponent';
import { EventCardsComponent } from '../components/EventCardsComponent'

// Конкретная страница - наследует общую логику

export class HomePage extends BasePage {
  readonly header: HeaderComponent;
  readonly eventCards: EventCardsComponent;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.eventCards = new EventCardsComponent(page);
  }

  async open(): Promise<void> {
    await this.navigateTo('https://live.mts.ru');
    await this.waitForPageLoad();
  }

  // Quick access to popular categories
  async openConcerts(): Promise<void> {
    await this.header.navigateToCategory('Концерты');
  }

  async openTheater(): Promise<void> {
    await this.header.navigateToCategory('Спектакли');
  }

  async openStandup(): Promise<void> {
    await this.header.navigateToCategory('Стендап');
  }
}