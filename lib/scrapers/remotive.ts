import { BaseScraper } from "./base";
import { ScraperJob, ScraperConfig } from "./types";
import { normalizeJobType, normalizeWorkMode, normalizeLocation, extractSalary } from "./types";

interface RemotiveJob {
  id: number;
  url: string;
  title: string;
  company_name: string;
  company_logo?: string;
  category: string;
  tags: string[];
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  salary?: string;
  description: string;
}

interface RemotiveResponse {
  "job-count": number;
  jobs: RemotiveJob[];
}

export class RemotiveScraper extends BaseScraper {
  constructor() {
    super({
      name: "Remotive",
      sourceUrl: "https://remotive.com/api/remote-jobs",
      type: "api",
    });
  }

  async fetch(): Promise<ScraperJob[]> {
    try {
      const response = await this.fetchWithRetry(
        "https://remotive.com/api/remote-jobs?limit=100"
      );

      const data: RemotiveResponse = await response.json();
      const jobs: ScraperJob[] = [];

      for (const job of data.jobs) {
        const workMode = normalizeWorkMode(job.candidate_required_location, job.url);
        
        jobs.push({
          title: job.title,
          company: job.company_name,
          companyLogo: job.company_logo,
          location: normalizeLocation(job.candidate_required_location) || "Remote",
          salary: job.salary,
          description: this.sanitizeHtml(job.description),
          url: job.url,
          type: this.detectJobType(job.title, job.category, job.tags),
          workMode,
          postedAt: new Date(job.publication_date).toISOString(),
          source: "Remotive",
          sourceUrl: this.config.sourceUrl,
        });
      }

      this.errors.push(`Fetched ${jobs.length} jobs from Remotive`);
      return jobs;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.errors.push(`Remotive scraper error: ${message}`);
      return [];
    }
  }

  private detectJobType(
    title: string,
    category: string,
    tags: string[]
  ): ScraperJob["type"] {
    const text = `${title} ${category} ${tags.join(" ")}`.toLowerCase();
    
    if (text.includes("intern") || text.includes("student")) return "INTERNSHIP";
    if (text.includes("graduate") || text.includes("trainee") || text.includes("entry")) return "GRADUATE";
    if (text.includes("part-time") || text.includes("part time")) return "PART_TIME";
    
    return "REMOTE";
  }
}

export const remotiveScraper = new RemotiveScraper();