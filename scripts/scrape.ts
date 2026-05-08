import { runAllScrapers } from "@/lib/scrapers";

async function main() {
  console.log("🔄 Running all scrapers...\n");
  const result = await runAllScrapers();
  
  console.log("\n📈 Summary:");
  console.log(`- Total jobs scraped: ${result.total}`);
  console.log(`- New jobs saved to DB: ${result.saved}`);
  
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Scraper failed:", err);
  process.exit(1);
});