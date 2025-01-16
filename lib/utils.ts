import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * It formats the number according to the decimal point and with unit
 * @param {number} amount The amount to be formatted with units
 * @param {number} decimals Decimals
 * @returns
 */
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

/**
 * Formats the number in terms of USD
 * @param {number} num Number to be formatted
 * @param {string} style "currency" | "percent"
 * @returns
 */
export const formatNumber = (
  num: number,
  style: "currency" | "percent" = "currency"
) => {
  if (!num) return 0;

  return new Intl.NumberFormat("en-US", {
    style,
    currency: "USD",
    minimumFractionDigits: style === "percent" ? 2 : 2,
    maximumFractionDigits: style === "percent" ? 2 : 2,
  }).format(style === "percent" ? num / 100 : num);
};
