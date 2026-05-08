import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const USD_TO_KSH = 150;

export function formatSalary(salary: { min?: number; max?: number; currency?: string }): string {
  const convertToKSH = (amount: number) => Math.round(amount * USD_TO_KSH);

  const formatKSH = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (salary.min && salary.max) {
    return `${formatKSH(convertToKSH(salary.min))} - ${formatKSH(convertToKSH(salary.max))}`;
  }
  if (salary.min) {
    return `From ${formatKSH(convertToKSH(salary.min))}`;
  }
  if (salary.max) {
    return `Up to ${formatKSH(convertToKSH(salary.max))}`;
  }
  return "Competitive";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}