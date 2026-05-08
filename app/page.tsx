import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchBar } from "@/components/features/search-bar";
import { OpportunityCard } from "@/components/features/opportunity-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { prisma } from "@/lib/prisma";
import { ChevronRight, Sparkles, TrendingUp, Globe, Award, Users, Briefcase } from "lucide-react";

const trendingSkills = [
  "React", "Python", "TypeScript", "Machine Learning", "Data Science",
  "UI/UX", "Cloud Computing", "Cybersecurity", "DevOps", "Blockchain",
];

async function getOpportunities() {
  const opportunities = await prisma.opportunity.findMany({
    where: { isApproved: true },
    include: { company: true },
    orderBy: { postedAt: "desc" },
    take: 6,
  });
  return opportunities;
}

async function getCategoryCounts() {
  const [internships, jobs, remote, graduate] = await Promise.all([
    prisma.opportunity.count({ where: { type: "INTERNSHIP", isApproved: true } }),
    prisma.opportunity.count({ where: { type: "JOB", isApproved: true } }),
    prisma.opportunity.count({ where: { workMode: "REMOTE", isApproved: true } }),
    prisma.opportunity.count({ where: { type: "GRADUATE", isApproved: true } }),
  ]);

  return { internships, jobs, remote, graduate };
}

export default async function HomePage() {
  const opportunities = await getOpportunities();
  const { internships, jobs, remote, graduate } = await getCategoryCounts();

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

  const categories = [
    { name: "Internships", count: internships, icon: Briefcase, href: "/search?type=internship", color: "bg-blue-500" },
    { name: "Jobs", count: jobs, icon: Users, href: "/search?type=job", color: "bg-green-500" },
    { name: "Remote", count: remote, icon: Globe, href: "/search?type=remote", color: "bg-purple-500" },
    { name: "Graduate", count: graduate, icon: Award, href: "/search?type=graduate", color: "bg-orange-500" },
  ];

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-50 to-white pt-16 pb-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1 h-3 w-3" />
              AI-Powered Career Discovery
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6 tracking-tight">
              Discover Your Next
              <span className="text-secondary"> Career</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              The smartest African-first career opportunity discovery platform.
              Find internships, jobs, remote work, and graduate programs that match your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/search">Find Opportunities</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link href="/search?type=internship">Browse Internships</Link>
              </Button>
            </div>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <SearchBar variant="hero" />
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-navy-900/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-navy-900 mb-2">
              {internships + jobs + remote + graduate}+
            </div>
            <div className="text-gray-600">Active Opportunities</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-navy-900 mb-2">4</div>
            <div className="text-gray-600">Partner Companies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-navy-900 mb-2">3</div>
            <div className="text-gray-600">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-navy-900 mb-2">500+</div>
            <div className="text-gray-600">Success Stories</div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-900">Browse Categories</h2>
          <Link href="/search" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${category.color}`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-navy-900 transition-colors">{category.name}</h3>
                  <p className="text-gray-600 text-sm">{category.count} opportunities</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-900">Featured Opportunities</h2>
          <Link href="/search" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="internship">Internships</TabsTrigger>
            <TabsTrigger value="job">Jobs</TabsTrigger>
            <TabsTrigger value="remote">Remote</TabsTrigger>
            <TabsTrigger value="graduate">Graduate</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {opportunities.map((opp) => (
                <OpportunityCard key={opp.id} opportunity={mapOpportunity(opp)} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="internship" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {opportunities.filter(o => o.type === "INTERNSHIP").map((opp) => (
                <OpportunityCard key={opp.id} opportunity={mapOpportunity(opp)} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="job" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {opportunities.filter(o => o.type === "JOB").map((opp) => (
                <OpportunityCard key={opp.id} opportunity={mapOpportunity(opp)} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="remote" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {opportunities.filter(o => o.workMode === "REMOTE").map((opp) => (
                <OpportunityCard key={opp.id} opportunity={mapOpportunity(opp)} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="graduate" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {opportunities.filter(o => o.type === "GRADUATE").map((opp) => (
                <OpportunityCard key={opp.id} opportunity={mapOpportunity(opp)} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Trending Skills */}
      <section className="container mx-auto px-4">
        <div className="bg-navy-50 rounded-2xl p-8 md:p-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900">Trending Skills</h2>
          </div>
          <p className="text-gray-600 mb-8 max-w-xl">
            These skills are in high demand by top companies. Explore opportunities that match your expertise.
          </p>
          <div className="flex flex-wrap gap-3">
            {trendingSkills.map((skill) => (
              <Link key={skill} href={`/search?skill=${skill.toLowerCase()}`}>
                <Badge variant="outline" className="px-4 py-2 text-sm hover:bg-white hover:border-blue-500 hover:text-blue-600 transition-colors cursor-pointer border-gray-300 text-gray-700">
                  {skill}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">Trusted by Top Companies</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Join professionals who found their dream careers at these amazing companies
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["TechCorp Africa", "Google Africa", "Stripe", "Andela"].map((company) => (
            <Card key={company} className="p-6 text-center hover:shadow-lg transition-shadow">
              <Avatar className="h-12 w-12 mx-auto mb-3">
                <AvatarFallback className="bg-navy-100 text-navy-700 font-semibold">
                  {company.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-medium text-navy-900">{company}</h3>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="bg-navy-900 rounded-2xl p-8 md:p-16 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Career Journey?</h2>
          <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
            Create a free account to save opportunities, get personalized recommendations, and track your applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              <Link href="/auth/signup">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white/10">
              <Link href="/search">Browse Opportunities</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}