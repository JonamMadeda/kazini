import { runAllScrapers } from "@/lib/scrapers";

// Run scraper on startup and then every hour
const SCRAPE_INTERVAL = 60 * 60 * 1000; // 1 hour

let isRunning = false;

export function startScraperScheduler() {
  console.log("📦 Starting scraper scheduler...");
  
  // Run immediately on startup
  runScraper();
  
  // Then run every hour
  setInterval(() => {
    runScraper();
  }, SCRAPE_INTERVAL);
}

async function runScraper() {
  if (isRunning) {
    console.log("⏳ Scraper already running, skipping...");
    return;
  }
  
  isRunning = true;
  
  try {
    console.log("🔄 [SCHEDULER] Starting scheduled scrape...");
    const result = await runAllScrapers();
    console.log(`✅ [SCHEDULER] Completed: ${result.total} scraped, ${result.saved} saved`);
  } catch (error) {
    console.error("❌ [SCHEDULER] Failed:", error);
  } finally {
    isRunning = false;
  }
}

// Export for use in API routes
export { runScraper };