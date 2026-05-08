import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { OpportunityCard } from "@/components/features/opportunity-card";
import { prisma } from "@/lib/prisma";
import { formatDate, formatSalary } from "@/lib/utils";
import { MapPin, Clock, Briefcase, GraduationCap, DollarSign, Globe, Share2, Bookmark, ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";

async function getOpportunity(id: string) {
  const opportunity = await prisma.opportunity.findUnique({
    where: { id },
    include: { company: true },
  });
  return opportunity;
}

async function getSimilarOpportunities(type: string, excludeId: string) {
  const opportunities = await prisma.opportunity.findMany({
    where: {
      type: type as any,
      id: { not: excludeId },
      isApproved: true,
    },
    include: { company: true },
    take: 3,
  });
  return opportunities;
}

export default async function OpportunityDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const opportunity = await getOpportunity(params.id);

  if (!opportunity) {
    notFound();
  }

  const similarOpportunities = await getSimilarOpportunities(
    opportunity.type,
    opportunity.id
  );

  const workModeLabels = {
    REMOTE: "Remote",
    HYBRID: "Hybrid",
    ONSITE: "On-site",
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/search">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to search
        </Link>
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={opportunity.company.logo || ""} />
                    <AvatarFallback className="bg-navy-900 text-white text-xl font-semibold">
                      {opportunity.company.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold text-navy-900">{opportunity.title}</h1>
                    <Link href="#" className="text-lg text-blue-600 hover:underline">
                      {opportunity.company.name}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="outline" className="flex items-center gap-1 border-gray-300 text-gray-700">
                  <MapPin className="h-3 w-3" />
                  {opportunity.location}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 border-gray-300 text-gray-700">
                  <Briefcase className="h-3 w-3" />
                  {workModeLabels[opportunity.workMode]}
                </Badge>
                {opportunity.educationLevel && (
                  <Badge variant="outline" className="flex items-center gap-1 border-gray-300 text-gray-700">
                    <GraduationCap className="h-3 w-3" />
                    {opportunity.educationLevel}
                  </Badge>
                )}
                <Badge className="bg-blue-100 text-blue-800 capitalize">
                  {opportunity.type.toLowerCase()}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Posted {formatDate(opportunity.postedAt)}
                </span>
                {opportunity.deadline && (
                  <span className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    Deadline {formatDate(opportunity.deadline)}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Salary */}
          {opportunity.salaryMin && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-navy-900">Stipend/Salary</span>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {formatSalary({ min: opportunity.salaryMin, max: opportunity.salaryMax || undefined })}
                  <span className="text-sm font-normal text-gray-500 ml-2">/ month</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About this opportunity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line text-gray-600">
                {opportunity.description}
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          {opportunity.experienceLevel && (
            <Card>
              <CardHeader>
                <CardTitle>Experience Level</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">{opportunity.experienceLevel}</Badge>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Apply Card */}
          <Card className="sticky top-24">
            <CardContent className="p-6">
              {opportunity.salaryMin && (
                <div className="text-2xl font-bold text-green-600 mb-4">
                  {formatSalary({ min: opportunity.salaryMin, max: opportunity.salaryMax || undefined })}
                  <span className="text-sm font-normal text-gray-500">/month</span>
                </div>
              )}

              <Button className="w-full mb-3" size="lg">
                Apply Now
              </Button>
              <Button variant="outline" className="w-full">
                <Bookmark className="mr-2 h-4 w-4" />
                Save for later
              </Button>

              <Separator className="my-4" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted</span>
                  <span className="font-medium text-navy-900">{formatDate(opportunity.postedAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Work Mode</span>
                  <span className="font-medium text-navy-900">{workModeLabels[opportunity.workMode]}</span>
                </div>
                {opportunity.educationLevel && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Education</span>
                    <span className="font-medium text-navy-900">{opportunity.educationLevel}</span>
                  </div>
                )}
                {opportunity.experienceLevel && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-medium text-navy-900">{opportunity.experienceLevel}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Company Info */}
          <Card>
            <CardHeader>
              <CardTitle>About {opportunity.company.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {opportunity.company.description && (
                <p className="text-gray-600 text-sm mb-4">
                  {opportunity.company.description}
                </p>
              )}
              <div className="space-y-2 text-sm">
                {opportunity.company.industry && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Industry</span>
                    <span className="font-medium text-navy-900">{opportunity.company.industry}</span>
                  </div>
                )}
                {opportunity.company.location && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium text-navy-900">{opportunity.company.location}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Similar Opportunities */}
      {similarOpportunities.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-navy-900 mb-6">Similar Opportunities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarOpportunities.map((opp) => (
              <OpportunityCard key={opp.id} opportunity={mapOpportunity(opp)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}