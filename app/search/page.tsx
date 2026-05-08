import { Suspense } from "react";
import { SearchBar } from "@/components/features/search-bar";
import { FilterPanel } from "@/components/features/filter-panel";
import { OpportunityCard } from "@/components/features/opportunity-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/prisma";
import { SlidersHorizontal, Grid, List, X } from "lucide-react";

async function getOpportunities(searchParams: { q?: string; type?: string }) {
  const where: any = { isApproved: true };

  if (searchParams.q) {
    where.OR = [
      { title: { contains: searchParams.q, mode: "insensitive" } },
      { description: { contains: searchParams.q, mode: "insensitive" } },
      { location: { contains: searchParams.q, mode: "insensitive" } },
    ];
  }

  if (searchParams.type) {
    where.type = searchParams.type.toUpperCase();
  }

  const opportunities = await prisma.opportunity.findMany({
    where,
    include: { company: true },
    orderBy: { postedAt: "desc" },
  });

  return opportunities;
}

function SearchContent({ searchParams }: { searchParams: { q?: string; type?: string } }) {
  const query = searchParams.q || "";
  const typeFilter = searchParams.type || "";

  const mapOpportunity = (opp: any) => ({
    id: opp.id,
    title: opp.title,
    company: { name: opp.company.name, logo: opp.company.logo || "" },
    location: opp.location,
    type: opp.type.toLowerCase() as any,
    salary: opp.salaryMin ? { min: opp.salaryMin, max: opp.salaryMax } : undefined,
    postedAt: opp.postedAt.toISOString(),
    description: opp.description,
    skills: [] as string[],
    educationLevel: opp.educationLevel || "",
    workMode: opp.workMode.toLowerCase() as any,
  });

  const activeFilters: string[] = [];
  if (typeFilter) activeFilters.push(typeFilter);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Sidebar - Desktop */}
      <div className="hidden lg:block w-72 flex-shrink-0">
        <FilterPanel />
      </div>

      {/* Results */}
      <div className="flex-1">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-gray-600">
              Showing <span className="font-semibold text-navy-900">all</span> opportunities
              {query && (
                <>
                  {" "}for <span className="font-semibold text-navy-900">&quot;{query}&quot;</span>
                </>
              )}
            </p>
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {activeFilters.map((filter) => (
                  <Badge key={filter} variant="secondary" className="capitalize">
                    {filter}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <OpportunityCard 
            key="placeholder" 
            opportunity={{
              id: "1",
              title: "Frontend Developer Internship",
              company: { name: "TechCorp Africa" },
              location: "Nairobi, Kenya",
              type: "internship",
              salary: { min: 500, max: 800 },
              postedAt: new Date().toISOString(),
              workMode: "hybrid"
            }} 
          />
        </div>
      </div>
    </div>
  );
}

function SearchLoading() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="hidden lg:block w-72 flex-shrink-0">
        <Skeleton className="h-96 w-full" />
      </div>
      <div className="flex-1">
        <Skeleton className="h-12 w-full mb-6" />
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-72 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; type?: string };
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-900 mb-4">Search Opportunities</h1>
        <SearchBar variant="full" defaultValue={searchParams.q || ""} />
      </div>

      <Suspense fallback={<SearchLoading />}>
        <SearchContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}