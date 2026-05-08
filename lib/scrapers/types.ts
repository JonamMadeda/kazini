export interface ScraperJob {
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  salary?: string;
  description: string;
  url: string;
  type: JobType;
  workMode: "REMOTE" | "ONSITE" | "HYBRID";
  postedAt: string;
  source: string;
  sourceUrl: string;
}

export interface ScraperResult {
  success: boolean;
  jobs: ScraperJob[];
  errors: string[];
  scrapedAt: Date;
}

export interface ScraperConfig {
  name: string;
  sourceUrl: string;
  type: "api" | "scraper";
  rateLimit?: number;
}

export type JobType = "JOB" | "INTERNSHIP" | "REMOTE" | "GRADUATE" | "PART_TIME" | "APPRENTICESHIP" | "CONTRACT";

export function isValidJobType(type: string): type is JobType {
  return ["JOB", "INTERNSHIP", "REMOTE", "GRADUATE", "PART_TIME", "APPRENTICESHIP", "CONTRACT"].includes(type);
}
export type WorkMode = "REMOTE" | "ONSITE" | "HYBRID";

export function normalizeJobType(type: string): JobType {
  const lower = type.toLowerCase();
  if (lower.includes("intern")) return "INTERNSHIP";
  if (lower.includes("graduate") || lower.includes("trainee")) return "GRADUATE";
  if (lower.includes("remote")) return "REMOTE";
  if (lower.includes("part") || lower.includes("part-time")) return "PART_TIME";
  if (lower.includes("contract")) return "CONTRACT";
  if (lower.includes("apprentice")) return "APPRENTICESHIP";
  return "JOB";
}

export function normalizeWorkMode(location: string, url: string): WorkMode {
  const lower = location.toLowerCase() + " " + url.toLowerCase();
  if (lower.includes("remote") || lower.includes("work from home")) return "REMOTE";
  if (lower.includes("hybrid")) return "HYBRID";
  return "ONSITE";
}

export function normalizeLocation(location: string): string {
  return location
    .replace(/remote/gi, "")
    .replace(/hybrid/gi, "")
    .replace(/\s+/g, " ")
    .trim() || "Remote";
}

export function extractSalary(salary: string): { min?: number; max?: number } | undefined {
  if (!salary) return undefined;
  
  const numbers = salary.match(/\d+/g);
  if (!numbers) return undefined;
  
  const nums = numbers.map(n => parseInt(n) * 1000);
  if (nums.length === 1) {
    return { min: nums[0] };
  }
  return { min: Math.min(...nums), max: Math.max(...nums) };
}