import { BaseScraper } from "./base";
import { ScraperJob, ScraperConfig } from "./types";
import { normalizeJobType, normalizeWorkMode, normalizeLocation } from "./types";

export class LinkedInScraper extends BaseScraper {
  constructor() {
    super({
      name: "LinkedIn",
      sourceUrl: "https://www.linkedin.com/jobs",
      type: "scraper",
    });
  }

  async fetch(): Promise<ScraperJob[]> {
    // LinkedIn requires authentication for most features
    // This is a basic implementation - in production, you'd need proper auth
    // For now, we'll use their public job search API
    
    const jobs: ScraperJob[] = [];
    const searchQueries = [
      { keywords: "software engineer", location: "Kenya" },
      { keywords: "intern", location: "Kenya" },
    ];

    for (const query of searchQueries) {
      try {
        const results = await this.fetchLinkedInJobs(query.keywords, query.location);
        jobs.push(...results);
      } catch (error) {
        this.errors.push(`LinkedIn error: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    return this.deduplicate(jobs);
  }

  private async fetchLinkedInJobs(keywords: string, location: string): Promise<ScraperJob[]> {
    const jobs: ScraperJob[] = [];
    
    // Note: LinkedIn's job search API requires authentication
    // This is a placeholder - in production, you'd use LinkedIn's API with proper auth
    // or a third-party service like Apify
    
    try {
      // Try using LinkedIn's public RSS-like endpoint
      const url = `https://www.linkedin.com/jobs-guest/jobs/api/jobSearchPluto?keywords=${encodeURIComponent(keywords)}&location=${encodeURIComponent(location)}&geoId=103353599&trk=homepage-jobseeker_jobs-search-bar_jobs-search-submit`;
      
      const response = await this.fetchWithRetry(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Accept": "text/html",
        },
      });

      const text = await response.text();
      
      // Parse basic job listings
      const jobMatches = text.match(/<li[^>]*class="job-card-container[^"]*"[^>]*>/gi) || [];
      
      for (const jobHtml of jobMatches.slice(0, 15)) {
        const titleMatch = jobHtml.match(/<span[^>]*class="job-card-list__title[^"]*"[^>]*>([^<]+)</i);
        const companyMatch = jobHtml.match(/<span[^>]*class="job-card-container__company-name[^"]*"[^>]*>([^<]+)</i);
        const linkMatch = jobHtml.match(/<a[^>]*href="\/jobs\/view\/([^"]+)"[^>]*>/i);
        
        if (titleMatch) {
          jobs.push({
            title: this.sanitizeHtml(titleMatch[1]),
            company: companyMatch ? this.sanitizeHtml(companyMatch[1]) : "Unknown",
            location: location,
            description: `${titleMatch[1]} at ${companyMatch?.[1] || "Unknown"}`,
            url: linkMatch ? `https://www.linkedin.com/jobs/view/${linkMatch[1]}` : "https://www.linkedin.com/jobs",
            type: normalizeJobType(titleMatch[1]),
            workMode: "ONSITE",
            postedAt: new Date().toISOString(),
            source: "LinkedIn",
            sourceUrl: this.config.sourceUrl,
          });
        }
      }

      this.errors.push(`LinkedIn: Found ${jobs.length} jobs`);
    } catch (error) {
      this.errors.push(`LinkedIn fetch error: ${error instanceof Error ? error.message : String(error)}`);
    }

    return jobs;
  }
}

export const linkedInScraper = new LinkedInScraper();