import { BaseScraper } from "./base";
import { ScraperJob, ScraperConfig, isValidJobType } from "./types";
import { normalizeJobType, normalizeWorkMode, normalizeLocation } from "./types";

export class IndeedScraper extends BaseScraper {
  constructor() {
    super({
      name: "Indeed",
      sourceUrl: "https://www.indeed.com",
      type: "scraper",
    });
  }

  async fetch(): Promise<ScraperJob[]> {
    const jobs: ScraperJob[] = [];
    const searchQueries = [
      { q: "software engineer", l: "Kenya" },
      { q: "web developer", l: "Nigeria" },
      { q: "data analyst", l: "South Africa" },
      { q: "internship software", l: "Kenya" },
    ];

    for (const query of searchQueries) {
      try {
        const results = await this.scrapeSearch(query.q, query.l);
        jobs.push(...results);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        this.errors.push(`Indeed error for ${query.q}: ${message}`);
      }
    }

    return this.deduplicate(jobs);
  }

  private async scrapeSearch(query: string, location: string): Promise<ScraperJob[]> {
    const jobs: ScraperJob[] = [];
    const baseUrl = "https://www.indeed.com/jobs";
    const params = new URLSearchParams({
      q: query,
      l: location,
      start: "0",
    });

    try {
      const response = await this.fetchWithRetry(`${baseUrl}?${params}`, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
        },
      });

      const html = await response.text();
      
      // Extract job cards from HTML
      const jobCards = html.match(/<a\s+[^>]*class="[^"]*jobTitle[^"]*"[^>]*>.*?<\/a>/gi) || [];
      
      for (const card of jobCards.slice(0, 20)) {
        const titleMatch = card.match(/title="([^"]+)"/i);
        const linkMatch = card.match(/href="([^"]+)"/i);
        
        if (titleMatch && linkMatch) {
          const title = titleMatch[1];
          const relativeLink = linkMatch[1];
          
          // Extract company and location from surrounding context
          const companyMatch = html.match(new RegExp(`href="${relativeLink.replace("/", "\\/")}"[^>]*>\\s*([^<]+)`, "i"));
          const company = companyMatch ? companyMatch[1].trim() : "Unknown Company";
          
          const jobType = normalizeJobType(title);
          const jobUrl = `https://www.indeed.com${relativeLink}`;
          jobs.push({
            title,
            company: this.sanitizeHtml(company),
            location: location,
            description: `${title} at ${company} in ${location}`,
            url: jobUrl,
            type: isValidJobType(jobType) ? jobType : "JOB",
            workMode: "ONSITE",
            postedAt: new Date().toISOString(),
            source: "Indeed",
            sourceUrl: this.config.sourceUrl,
          });
        }
      }

      this.errors.push(`Indeed: Fetched ${jobs.length} jobs for "${query}" in ${location}`);
    } catch (error) {
      this.errors.push(`Indeed scrape error: ${error instanceof Error ? error.message : String(error)}`);
    }

    return jobs;
  }
}

export const indeedScraper = new IndeedScraper();