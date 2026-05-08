import { BaseScraper } from "./base";
import { ScraperJob, ScraperConfig } from "./types";
import { normalizeJobType, normalizeWorkMode, normalizeLocation } from "./types";

interface JoobleJob {
  title: string;
  company: string;
  location: string;
  salary?: string;
  type: string;
  description: string;
  link: string;
  updated: string;
}

export class JoobleScraper extends BaseScraper {
  private apiKey: string;

  constructor(apiKey?: string) {
    super({
      name: "Jooble",
      sourceUrl: "https://jooble.org/api",
      type: "api",
    });
    this.apiKey = apiKey || process.env.JOOBLE_API_KEY || "";
  }

  async fetch(): Promise<ScraperJob[]> {
    if (!this.apiKey) {
      this.errors.push("Jooble API key not configured");
      return [];
    }

    const jobs: ScraperJob[] = [];
    const searchParams = [
      { keywords: "software developer", location: "Kenya" },
      { keywords: "frontend developer", location: "Africa" },
      { keywords: "backend developer", location: "Nigeria" },
      { keywords: "data scientist", location: "South Africa" },
    ];

    for (const params of searchParams) {
      try {
        const results = await this.fetchJobs(params.keywords, params.location);
        jobs.push(...results);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        this.errors.push(`Jooble error for ${params.keywords}: ${message}`);
      }
    }

    return this.deduplicate(jobs);
  }

  private async fetchJobs(keywords: string, location: string): Promise<ScraperJob[]> {
    const response = await this.fetchWithRetry("https://jooble.org/api/11fd3f83-e44a-4356-93aa-3718d3f19f5e", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keywords,
        location,
        page: 1,
        perPage: 20,
      }),
    });

    const data = await response.json();
    const jobs: ScraperJob[] = [];

    if (!data.jobs) return jobs;

    for (const job of data.jobs) {
      jobs.push({
        title: job.title,
        company: job.company,
        location: normalizeLocation(job.location || location),
        salary: job.salary,
        description: this.sanitizeHtml(job.description || ""),
        url: job.link,
        type: normalizeJobType(job.title),
        workMode: normalizeWorkMode(job.location || "", job.link),
        postedAt: job.updated ? new Date(job.updated).toISOString() : new Date().toISOString(),
        source: "Jooble",
        sourceUrl: this.config.sourceUrl,
      });
    }

    return jobs;
  }
}

export const joobleScraper = new JoobleScraper();