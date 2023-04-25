import { test, expect, describe } from 'vitest';
import {
	isoDate,
	subtractDays,
} from '../../src/background/infrastructure/utils/date-utils';

describe('iso date', () => {
	test('should get the ISO date from a normal Date object.', () => {
		const date = new Date('2021-01-01');
		const result = isoDate(date);
		expect(result).toBe('2021-01-01');
	});
});

describe('subtract days', () => {
	test('should subtract days from a date', () => {
		const date = new Date('2021-01-01');
		const result = subtractDays(date, 1);
		expect(result.toString()).equals(new Date('2020-12-31').toString());
	});
});
