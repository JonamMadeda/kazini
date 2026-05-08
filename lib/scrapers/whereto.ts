import { BaseScraper } from "./base";
import { ScraperJob, ScraperConfig } from "./types";
import { normalizeJobType, normalizeWorkMode } from "./types";

export class WheretoScraper extends BaseScraper {
  constructor() {
    super({
      name: "Y Combinator Whereto",
      sourceUrl: "https://www.ycombinator.com/jobs",
      type: "scraper",
    });
  }

  async fetch(): Promise<ScraperJob[]> {
    const jobs: ScraperJob[] = [];

    try {
      const response = await this.fetchWithRetry("https://www.ycombinator.com/jobs", {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Accept": "text/html",
        },
      });

      const html = await response.text();
      
      // Extract job listings from YC Whereto
      const jobCards = html.match(/<a[^>]*class="[^"]*job-card[^"]*"[^>]*href="\/jobs\/(\d+)[^"]*"[^>]*>/gi) || [];
      
      for (const card of jobCards.slice(0, 30)) {
        const idMatch = card.match(/jobs\/(\d+)/);
        const titleMatch = card.match(/<span[^>]*>([^<]+)<\/span>/i);
        
        if (idMatch && titleMatch) {
          jobs.push({
            title: this.sanitizeHtml(titleMatch[1]),
            company: "YC Startup", // Will need to fetch more details
            location: "Remote",
            description: `Job opportunity at Y Combinator startup`,
            url: `https://www.ycombinator.com/jobs/${idMatch[1]}`,
            type: "JOB",
            workMode: "REMOTE",
            postedAt: new Date().toISOString(),
            source: "Y Combinator Whereto",
            sourceUrl: this.config.sourceUrl,
          });
        }
      }

      this.errors.push(`Y Combinator: Found ${jobs.length} jobs`);
    } catch (error) {
      this.errors.push(`Y Combinator error: ${error instanceof Error ? error.message : String(error)}`);
    }

    return jobs;
  }
}

export const wheretoScraper = new WheretoScraper();