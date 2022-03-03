import {DailyStars} from '../store/types'
export const convertDataToCorrectNum = (
  dataArray: string[],
  stocktype: string,
): DailyStars[] => {
  return dataArray.map((item: any, i: number) => {
    return { date: i, stars: Number(Number(item[stocktype]).toFixed(2)) };
  });
};
export const chartColors = [
  {label: 'Open', color: '#459ebc'},
  {label: 'High', color: '#fbb662'},
  {label: 'Low', color: '#fd7e7e'},
  {label: 'Close', color: '#53cfc9'}
]

export default{}