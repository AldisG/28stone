import {DailyStars} from '../store/types'

export const convertDataToCorrectNum = (
  dataArray: string[],
  stocktype: string,
  datesData: string[]
): DailyStars[] => {
  return dataArray.map((item: any, i: number) => {
    return { date: i, stars: Number(Number(item[stocktype]).toFixed(2)) };
  });
};
export default{}