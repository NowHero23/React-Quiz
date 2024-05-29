import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function count(arr: number[]) {
  let sum = 0;
  arr.forEach((item: number) => {
    sum += item;
  });
  return sum;
}
