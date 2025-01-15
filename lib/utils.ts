import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// const formatToUnit = (value: number): string => {
//   let formattedValue = value;
//   let unit = "";

//   if (value >= 1e9) {
//     formattedValue = value / 1e9;
//     unit = "B"; // Billion
//   } else if (value >= 1e6) {
//     formattedValue = value / 1e6;
//     unit = "M"; // Million
//   } else if (value >= 1e3) {
//     formattedValue = value / 1e3;
//     unit = "K"; // Thousand
//   }

//   return `${formattedValue.toLocaleString(undefined, {
//     minimumFractionDigits: 1,
//     maximumFractionDigits: 1,
//   })}${unit}`;
// };

export const formatWithUnits = (
  amount: number,
  decimals: number = 0
): string => {
  const factor = Math.pow(10, decimals);
  const value = decimals ? amount / factor : amount;

  // Determine the unit and value based on thresholds
  let formattedValue = value;
  let unit = "";

  if (value >= 1e9) {
    formattedValue = value / 1e9;
    unit = "B"; // Billion
  } else if (value >= 1e6) {
    formattedValue = value / 1e6;
    unit = "M"; // Million
  } else if (value >= 1e3) {
    formattedValue = value / 1e3;
    unit = "K"; // Thousand
  }

  return `${formattedValue.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${unit}`;
};
