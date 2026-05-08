import { runAllScrapers } from "@/lib/scrapers";

export async function GET() {
  try {
    console.log("🔄 Manual scrape triggered...");
    const result = await runAllScrapers();
    
    return Response.json({
      success: true,
      totalScraped: result.total,
      saved: result.saved,
      message: `Scraped ${result.total} jobs, saved ${result.saved} new jobs to database`
    });
  } catch (error) {
    return Response.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}