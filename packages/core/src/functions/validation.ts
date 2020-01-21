import { dateRegEx } from '../appointment';

export function validateDate(date: string): boolean {
  const regex: RegExp = dateRegEx;
  return regex.test(date);
}

export function validateHour(hour: number): boolean {
  let hourIsValid: boolean;
  hourIsValid = Number.isInteger(hour);
  hourIsValid = hour >= 10;
  hourIsValid = hour <= 18;
  return hourIsValid;
}
