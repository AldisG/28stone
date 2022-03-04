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
export const initial = {
  start: {
    opacity: 0,
    y: -30,
  },
  end: {
    opacity: 1,
    y: 0,
  },
};
export const animateSearch = {
  animate: { opacity: 1, y: 0 },
  initial: { opacity: 0, y: 20 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 },
};
export const animateDetails = {
  animate: { opacity: 1, x: 0 },
  initial: { opacity: 0, x: 120 },
  exit: { opacity: 0, y: -120 },
  transition: { duration: 2.5 },
};
export default{}