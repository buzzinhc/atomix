type DateInput = Date | string | number;

function toDate(date: DateInput): Date {
  if (date instanceof Date) return new Date(date.getTime());
  return new Date(date);
}

function padZero(n: number): string {
  return n < 10 ? '0' + n : '' + n;
}

export function formatDate(date: DateInput, pattern: string = 'YYYY-MM-DD HH:mm:ss'): string {
  const d = toDate(date);
  const year = '' + d.getFullYear();
  const month = padZero(d.getMonth() + 1);
  const day = padZero(d.getDate());
  const hours = padZero(d.getHours());
  const minutes = padZero(d.getMinutes());
  const seconds = padZero(d.getSeconds());
  return pattern
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

export function timeAgo(date: DateInput): string {
  const d = toDate(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return '刚刚';
  if (minutes < 60) return minutes + '分钟前';
  if (hours < 24) return hours + '小时前';
  if (days < 30) return days + '天前';
  if (months < 12) return months + '个月前';
  if (years >= 1) return years + '年前';
  return formatDate(d);
}

export function isToday(date: DateInput): boolean {
  const d = toDate(date);
  const now = new Date();
  return (
    d.getFullYear() == now.getFullYear() &&
    d.getMonth() == now.getMonth() &&
    d.getDate() == now.getDate()
  );
}

export function isYesterday(date: DateInput): boolean {
  const d = toDate(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    d.getFullYear() == yesterday.getFullYear() &&
    d.getMonth() == yesterday.getMonth() &&
    d.getDate() == yesterday.getDate()
  );
}

export function addDays(date: DateInput, days: number): Date {
  const d = toDate(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function diffDays(date1: DateInput, date2: DateInput): number {
  const d1 = toDate(date1);
  const d2 = toDate(date2);
  const diff = Math.abs(d1.getTime() - d2.getTime());
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function startOfDay(date: DateInput): Date {
  const d = toDate(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function endOfDay(date: DateInput): Date {
  const d = toDate(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

export function isLeapYear(year: number): boolean {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}
