import { NextResponse } from "next/server";
import { runAllScrapers } from "@/lib/scrapers";

// This runs automatically every hour via Vercel Cron
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  
  // Only allow requests with cron secret or from Vercel cron
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log("🔄 [CRON] Starting scheduled scrape...");
    const startTime = Date.now();
    
    const result = await runAllScrapers();
    
    const duration = Date.now() - startTime;
    console.log(`✅ [CRON] Completed in ${duration}ms`);
    
    return NextResponse.json({
      success: true,
      totalScraped: result.total,
      saved: result.saved,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ [CRON] Scraper failed:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET(new Request("http://localhost"));
}