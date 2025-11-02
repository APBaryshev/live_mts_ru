import { expect, type Locator, type Page } from '@playwright/test';

export class Header {
	page: Page;
	banner: Locator;
	logo: Locator;
	aboutProduct: Locator;
	issue: Locator;
	solution: Locator;
	download: Locator;
	forWhom: Locator;
	support: Locator;
	whereToBuy: Locator;
	contacts: Locator;

	constructor(page: Page) {
		this.page = page;
		this.banner = page.getByRole('banner');
		this.logo = page.locator('id=logotip');
		// this.aboutProduct = page.locator('id=#product');
		this.aboutProduct = page.getByRole('link', { name: 'О продукте' });
		this.issue = page.getByRole('link', { name: 'Проблема' });
		this.solution = page.getByRole('link', { name: 'Решение' });
		this.download = page.getByRole('link', { name: 'Скачать' });
		this.forWhom = page.getByRole('link', { name: 'Для кого' });
		this.support = page.getByRole('link', { name: 'Техподдержка', exact: true });
		this.whereToBuy = page.getByRole('link', { name: 'Где купить' });
		this.contacts = page.getByRole('link', { name: 'Контакты' });
	}

	async goto() {
		await this.page.goto('https://granulex.ru/');
	}

	async checkHeaderVisible() {
		await expect(this.banner).toBeVisible();
		await expect(this.logo).toBeVisible();
		await expect(this.aboutProduct).toBeVisible();
		await expect(this.issue).toBeVisible();
		await expect(this.solution).toBeVisible();
		await expect(this.download).toBeVisible();
		await expect(this.forWhom).toBeVisible();
		await expect(this.support).toBeVisible();
		await expect(this.whereToBuy).toBeVisible();
		await expect(this.contacts).toBeVisible();
	}

	async checkLinksAction() {
		await this.aboutProduct.click();
		await expect(
			this.page.getByText('Гранулярное восстановление объектов каталога', { exact: true }),
		).toBeVisible();
		await this.issue.click();
		await expect(this.page.getByText('Суть проблемы')).toBeVisible();
		await this.solution.click();
		await expect(this.page.getByRole('main').getByText('Решение')).toBeVisible();
		await this.download.click();
		await expect(this.page.getByRole('main').getByText('Скачать')).toBeVisible();
		await this.forWhom.click();
		await expect(this.page.getByRole('main').getByText('Для кого')).toBeVisible();
		await this.support.click();
		await expect(this.page.getByText('Техническая поддержка')).toBeVisible();
		await this.whereToBuy.click();
		await expect(this.page.getByRole('main').getByText('Где купить')).toBeVisible();
		await this.contacts.click();
		await expect(this.page.getByRole('main').getByText('Контакты')).toBeVisible();
	}
}
