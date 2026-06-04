import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import {
  formatDate,
  timeAgo,
  isToday,
  isYesterday,
  addDays,
  diffDays,
  startOfDay,
  endOfDay,
  isLeapYear,
  getDaysInMonth,
} from '../../src/date';

describe('formatDate', () => {
  it('should format with default pattern', () => {
    const date = new Date(2024, 2, 15, 10, 30, 45);
    expect(formatDate(date)).toBe('2024-03-15 10:30:45');
  });

  it('should format with custom pattern', () => {
    const date = new Date(2024, 0, 5, 8, 5, 9);
    expect(formatDate(date, 'YYYY/MM/DD')).toBe('2024/01/05');
    expect(formatDate(date, 'HH:mm:ss')).toBe('08:05:09');
    expect(formatDate(date, 'YYYY年MM月DD日')).toBe('2024年01月05日');
  });

  it('should handle string input', () => {
    expect(formatDate('2024-06-01T12:00:00')).toBe('2024-06-01 12:00:00');
  });

  it('should handle timestamp input', () => {
    const ts = new Date(2024, 0, 1, 0, 0, 0).getTime();
    expect(formatDate(ts)).toBe('2024-01-01 00:00:00');
  });

  it('should pad single digit values', () => {
    const date = new Date(2024, 0, 1, 1, 1, 1);
    expect(formatDate(date, 'MM-DD HH:mm:ss')).toBe('01-01 01:01:01');
  });
});

describe('timeAgo', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 5, 15, 12, 0, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return 刚刚 for less than 60 seconds ago', () => {
    const now = new Date(2024, 5, 15, 11, 59, 30);
    expect(timeAgo(now)).toBe('刚刚');
  });

  it('should return minutes ago', () => {
    const d = new Date(2024, 5, 15, 11, 55, 0);
    expect(timeAgo(d)).toBe('5分钟前');
  });

  it('should return hours ago', () => {
    const d = new Date(2024, 5, 15, 9, 0, 0);
    expect(timeAgo(d)).toBe('3小时前');
  });

  it('should return days ago', () => {
    const d = new Date(2024, 5, 13, 12, 0, 0);
    expect(timeAgo(d)).toBe('2天前');
  });

  it('should return months ago', () => {
    const d = new Date(2024, 3, 15, 12, 0, 0);
    expect(timeAgo(d)).toBe('2个月前');
  });

  it('should return years ago', () => {
    const d = new Date(2022, 5, 15, 12, 0, 0);
    expect(timeAgo(d)).toBe('2年前');
  });

  it('should handle string input', () => {
    const d = new Date(2024, 5, 15, 11, 59, 30);
    expect(timeAgo(d.toISOString())).toBe('刚刚');
  });
});

describe('isToday', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 5, 15, 12, 0, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return true for today', () => {
    expect(isToday(new Date(2024, 5, 15, 0, 0, 0))).toBe(true);
    expect(isToday(new Date(2024, 5, 15, 23, 59, 59))).toBe(true);
  });

  it('should return false for other days', () => {
    expect(isToday(new Date(2024, 5, 14))).toBe(false);
    expect(isToday(new Date(2024, 5, 16))).toBe(false);
  });

  it('should handle string input', () => {
    expect(isToday('2024-06-15')).toBe(true);
    expect(isToday('2024-06-14')).toBe(false);
  });

  it('should handle timestamp input', () => {
    expect(isToday(new Date(2024, 5, 15).getTime())).toBe(true);
  });
});

describe('isYesterday', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 5, 15, 12, 0, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return true for yesterday', () => {
    expect(isYesterday(new Date(2024, 5, 14, 8, 0, 0))).toBe(true);
  });

  it('should return false for today', () => {
    expect(isYesterday(new Date(2024, 5, 15))).toBe(false);
  });

  it('should return false for other days', () => {
    expect(isYesterday(new Date(2024, 5, 13))).toBe(false);
    expect(isYesterday(new Date(2024, 5, 16))).toBe(false);
  });

  it('should handle string input', () => {
    expect(isYesterday('2024-06-14')).toBe(true);
  });
});

describe('addDays', () => {
  it('should add days', () => {
    const date = new Date(2024, 0, 1);
    const result = addDays(date, 10);
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(11);
  });

  it('should subtract days with negative number', () => {
    const date = new Date(2024, 0, 10);
    const result = addDays(date, -5);
    expect(result.getDate()).toBe(5);
  });

  it('should handle month overflow', () => {
    const date = new Date(2024, 0, 30);
    const result = addDays(date, 5);
    expect(result.getMonth()).toBe(1);
    expect(result.getDate()).toBe(4);
  });

  it('should not mutate the original date', () => {
    const date = new Date(2024, 0, 1);
    const originalTime = date.getTime();
    addDays(date, 10);
    expect(date.getTime()).toBe(originalTime);
  });

  it('should handle string input', () => {
    const result = addDays('2024-01-01', 5);
    expect(result.getDate()).toBe(6);
  });

  it('should handle timestamp input', () => {
    const ts = new Date(2024, 0, 1).getTime();
    const result = addDays(ts, 3);
    expect(result.getDate()).toBe(4);
  });
});

describe('diffDays', () => {
  it('should calculate difference in days', () => {
    const d1 = new Date(2024, 0, 1);
    const d2 = new Date(2024, 0, 11);
    expect(diffDays(d1, d2)).toBe(10);
  });

  it('should return absolute value', () => {
    const d1 = new Date(2024, 0, 11);
    const d2 = new Date(2024, 0, 1);
    expect(diffDays(d1, d2)).toBe(10);
  });

  it('should return 0 for same day', () => {
    const d1 = new Date(2024, 0, 1, 0, 0, 0);
    const d2 = new Date(2024, 0, 1, 23, 59, 59);
    expect(diffDays(d1, d2)).toBe(0);
  });

  it('should handle cross-month dates', () => {
    const d1 = new Date(2024, 0, 30);
    const d2 = new Date(2024, 1, 3);
    expect(diffDays(d1, d2)).toBe(4);
  });

  it('should handle string input', () => {
    expect(diffDays('2024-01-01', '2024-01-11')).toBe(10);
  });

  it('should handle timestamp input', () => {
    const d1 = new Date(2024, 0, 1).getTime();
    const d2 = new Date(2024, 0, 6).getTime();
    expect(diffDays(d1, d2)).toBe(5);
  });
});

describe('startOfDay', () => {
  it('should return start of day', () => {
    const date = new Date(2024, 5, 15, 14, 30, 45, 500);
    const result = startOfDay(date);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(5);
    expect(result.getDate()).toBe(15);
  });

  it('should handle string input', () => {
    const result = startOfDay('2024-06-15T18:30:00');
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
  });

  it('should handle timestamp input', () => {
    const ts = new Date(2024, 5, 15, 14, 30).getTime();
    const result = startOfDay(ts);
    expect(result.getHours()).toBe(0);
  });
});

describe('endOfDay', () => {
  it('should return end of day', () => {
    const date = new Date(2024, 5, 15, 14, 30, 45, 500);
    const result = endOfDay(date);
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(5);
    expect(result.getDate()).toBe(15);
  });

  it('should handle string input', () => {
    const result = endOfDay('2024-06-15T08:00:00');
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
  });

  it('should handle timestamp input', () => {
    const ts = new Date(2024, 5, 15, 14, 30).getTime();
    const result = endOfDay(ts);
    expect(result.getMilliseconds()).toBe(999);
  });
});

describe('isLeapYear', () => {
  it('should return true for leap years', () => {
    expect(isLeapYear(2024)).toBe(true);
    expect(isLeapYear(2000)).toBe(true);
    expect(isLeapYear(1600)).toBe(true);
  });

  it('should return false for non-leap years', () => {
    expect(isLeapYear(2023)).toBe(false);
    expect(isLeapYear(1900)).toBe(false);
    expect(isLeapYear(2100)).toBe(false);
  });

  it('should handle edge cases', () => {
    expect(isLeapYear(4)).toBe(true);
    expect(isLeapYear(100)).toBe(false);
    expect(isLeapYear(400)).toBe(true);
  });
});

describe('getDaysInMonth', () => {
  it('should return correct days for regular months', () => {
    expect(getDaysInMonth(2024, 1)).toBe(31);
    expect(getDaysInMonth(2024, 4)).toBe(30);
    expect(getDaysInMonth(2024, 6)).toBe(30);
    expect(getDaysInMonth(2024, 7)).toBe(31);
  });

  it('should handle February in leap year', () => {
    expect(getDaysInMonth(2024, 2)).toBe(29);
  });

  it('should handle February in non-leap year', () => {
    expect(getDaysInMonth(2023, 2)).toBe(28);
  });

  it('should handle December', () => {
    expect(getDaysInMonth(2024, 12)).toBe(31);
  });

  it('should handle all months', () => {
    const expected = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (let i = 0; i < 12; i++) {
      expect(getDaysInMonth(2023, i + 1)).toBe(expected[i]);
    }
  });
});
