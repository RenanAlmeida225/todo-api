import { IDateFormat } from './model/iDateFormat';

export class DateFormart implements IDateFormat {
	format(date: Date) {
		const year = date.getFullYear();
		const month =
			date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
		const days = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
		const hours =
			date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
		const minutes =
			date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
		const seconds =
			date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
		return `${year}-${month}-${days} ${hours}:${minutes}:${seconds}`;
	}
}
