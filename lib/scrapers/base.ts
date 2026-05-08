import { ScraperConfig, ScraperJob, ScraperResult } from "./types";

export abstract class BaseScraper {
  protected config: ScraperConfig;
  protected jobs: ScraperJob[] = [];
  protected errors: string[] = [];

  constructor(config: ScraperConfig) {
    this.config = config;
  }

  abstract fetch(): Promise<ScraperJob[]>;

  async scrape(): Promise<ScraperResult> {
    try {
      this.jobs = [];
      this.errors = [];
      
      const jobs = await this.fetch();
      this.jobs = this.deduplicate(jobs);
      
      return {
        success: true,
        jobs: this.jobs,
        errors: this.errors,
        scrapedAt: new Date(),
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.errors.push(message);
      
      return {
        success: false,
        jobs: this.jobs,
        errors: this.errors,
        scrapedAt: new Date(),
      };
    }
  }

  protected deduplicate(jobs: ScraperJob[]): ScraperJob[] {
    const seen = new Set<string>();
    return jobs.filter(job => {
      const key = `${job.title}-${job.company}-${job.location}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  protected async fetchWithRetry(
    url: string,
    options: RequestInit = {},
    retries = 3
  ): Promise<Response> {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, {
          ...options,
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Accept": "application/json",
            ...options.headers,
          },
        });

        if (!response.ok && response.status !== 429) {
          throw new Error(`HTTP ${response.status}`);
        }

        if (response.status === 429) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
          continue;
        }

        return response;
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }

    throw new Error("Max retries reached");
  }

  protected sanitizeHtml(text: string): string {
    return text
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/\s+/g, " ")
      .trim();
  }

  getConfig(): ScraperConfig {
    return this.config;
  }
}