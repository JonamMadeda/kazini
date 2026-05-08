import { prisma } from "@/lib/prisma";
import { ScraperJob, normalizeJobType, normalizeWorkMode, extractSalary } from "./types";
import { remotiveScraper } from "./remotive";
import { joobleScraper } from "./jooble";
import { indeedScraper } from "./indeed";
import { linkedInScraper } from "./linkedin";
import { wheretoScraper } from "./whereto";

export async function runAllScrapers() {
  console.log("🚀 Starting scrapers...");
  
  const scrapers = [
    remotiveScraper,
    joobleScraper,
    // indeedScraper, // Often blocked
    // linkedInScraper, // Requires auth
    // wheretoScraper, // Complex HTML parsing
  ];

  const allJobs: ScraperJob[] = [];

  for (const scraper of scrapers) {
    try {
      console.log(`📡 Running ${scraper.getConfig().name} scraper...`);
      const result = await scraper.scrape();
      
      if (result.success && result.jobs.length > 0) {
        allJobs.push(...result.jobs);
        console.log(`✅ ${scraper.getConfig().name}: Found ${result.jobs.length} jobs`);
      }
      
      if (result.errors.length > 0) {
        console.warn(`⚠️ ${scraper.getConfig().name} errors:`, result.errors);
      }
    } catch (error) {
      console.error(`❌ ${scraper.getConfig().name} failed:`, error);
    }
  }

  console.log(`\n📊 Total jobs collected: ${allJobs.length}`);

  // Save to database
  const savedCount = await saveJobsToDatabase(allJobs);
  console.log(`✅ Saved ${savedCount} jobs to database`);

  return {
    total: allJobs.length,
    saved: savedCount,
  };
}

async function saveJobsToDatabase(jobs: ScraperJob[]): Promise<number> {
  let savedCount = 0;

  for (const job of jobs) {
    try {
      // Find or create company
      let company = await prisma.company.findFirst({
        where: { name: { equals: job.company, mode: "insensitive" } },
      });

      if (!company) {
        company = await prisma.company.create({
          data: {
            name: job.company,
            logo: job.companyLogo || null,
            location: job.location,
            industry: "Technology",
          },
        });
      }

      // Check if job already exists
      const existing = await prisma.opportunity.findFirst({
        where: {
          title: job.title,
          companyId: company.id,
        },
      });

      if (!existing) {
        const salary = extractSalary(job.salary || "");
        
        await prisma.opportunity.create({
          data: {
            title: job.title,
            description: job.description,
            location: job.location,
            type: job.type,
            workMode: job.workMode,
            salaryMin: salary?.min || null,
            salaryMax: salary?.max || null,
            companyId: company.id,
            postedAt: new Date(job.postedAt),
            isApproved: true,
          },
        });

        savedCount++;
      }
    } catch (error) {
      console.error(`Error saving job ${job.title}:`, error);
    }
  }

  return savedCount;
}

export async function getScraperStatus() {
  const sources = await prisma.source.findMany({
    include: {
      logs: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  return sources;
}