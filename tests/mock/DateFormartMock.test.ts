import { IDateFormat } from '../../src/core/util/model/iDateFormat';

export class DateFormartMock implements IDateFormat {
	format(date: Date): string {
		return '2000-02-01 13:00:00';
	}
}
