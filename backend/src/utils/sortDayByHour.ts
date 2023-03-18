import { DataType } from '@prisma/client';

export type DataInput = {
  time: string;
  record: string | boolean | number;
};

type SortByHourObject = {
  [key: string]: number[];
};

export async function sortDayByHour(
  dataInputArray: DataInput[],
  dataType: DataType
): Promise<SortByHourObject> {
  return new Promise((resolve) => {
    const result = dataInputArray.reduce((acc: any, current: DataInput) => {
      const entryDate = new Date(current.time);
      const entryHour = entryDate.getUTCHours();
      if (!Array.isArray(acc[entryHour])) {
        acc[entryHour] = [];
        if (!Number.isNaN(+`${current.record}`)) {
          acc[entryHour].push(+current.record);
          return acc;
        }
        return acc;
      }
      if (!Number.isNaN(+`${current.record}`)) {
        acc[entryHour].push(+current.record);
        return acc;
      }
      return acc;
    }, {});

    resolve(result);
  });
}

export async function reduceDataByHours(data: SortByHourObject) {
  return new Promise((resolve) => {
    const dataArray: { [x: string]: number }[] = [];
    for (const [key, value] of Object.entries(data)) {
      if (!Array.isArray(value)) return NaN;

      const average = +(
        value.reduce((acc: any, curr: any) => {
          return acc + curr;
        }, 0) / value.length
      ).toFixed(2);

      dataArray.push({ [key]: average });
    }

    resolve(dataArray);
  });
}
