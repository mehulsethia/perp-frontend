import fromExponential from "from-exponential";

export const trim = (number: number = 0, precision?: number) => {
  const array = fromExponential(number).split(".");
  if (array.length === 1) return fromExponential(number);
  //@ts-ignore
  array.push(array.pop().substring(0, precision));
  const trimmedNumber = array.join(".");
  return trimmedNumber;
};

export const formatValue = (value: string | number): string => {
  return Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 });
};

export const formatValueDigits = (value: string | number, digits: number): string => {
  return Number(value).toLocaleString(undefined, {
    maximumFractionDigits: digits,
  });
};
