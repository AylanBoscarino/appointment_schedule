export const minHour: number = 10;
export const maxHour: number = 18;
export const scheduleDays: number = 15;

export function listAvailableHours(): number[] {
  let list = [];
  for (let i = minHour; i <= maxHour; i++) {
    list.push(i);
  }
  return list;
}
