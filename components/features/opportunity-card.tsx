"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, formatDate, formatSalary } from "@/lib/utils";
import { MapPin, Clock, Briefcase, GraduationCap, Bookmark, Share2 } from "lucide-react";
import { useState } from "react";

interface Opportunity {
  id: string;
  title: string;
  company: {
    name: string;
    logo?: string;
  };
  location: string;
  type: "internship" | "job" | "remote" | "graduate" | "part-time" | "apprenticeship";
  salary?: { min?: number; max?: number; currency?: string };
  postedAt: string;
  description?: string;
  skills?: string[];
  educationLevel?: string;
  workMode?: "remote" | "hybrid" | "onsite";
}

interface OpportunityCardProps {
  opportunity: Opportunity;
  variant?: "default" | "compact";
  className?: string;
}

const typeColors = {
  internship: "bg-blue-100 text-blue-800",
  job: "bg-green-100 text-green-800",
  remote: "bg-purple-100 text-purple-800",
  graduate: "bg-orange-100 text-orange-800",
  "part-time": "bg-yellow-100 text-yellow-800",
  apprenticeship: "bg-pink-100 text-pink-800",
};

const workModeLabels = {
  remote: "Remote",
  hybrid: "Hybrid",
  onsite: "On-site",
};

export function OpportunityCard({
  opportunity,
  variant = "default",
  className,
}: OpportunityCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  if (variant === "compact") {
    return (
      <Link href={`/opportunities/${opportunity.id}`}>
        <Card className="hover:shadow-lg transition-all duration-200 group">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={opportunity.company.logo} />
                <AvatarFallback>
                  {opportunity.company.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                  {opportunity.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {opportunity.company.name}
                </p>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {opportunity.location}
                  </span>
                  {opportunity.salary && (
                    <span className="text-green-600 font-medium">
                      {formatSalary(opportunity.salary)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={opportunity.company.logo} />
              <AvatarFallback className="bg-primary text-white font-semibold">
                {opportunity.company.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <Link
                href={`/opportunities/${opportunity.id}`}
                className="font-semibold text-lg hover:text-primary transition-colors line-clamp-1"
              >
                {opportunity.title}
              </Link>
              <p className="text-muted-foreground">{opportunity.company.name}</p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsSaved(!isSaved);
            }}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <Bookmark
              className={cn(
                "h-5 w-5",
                isSaved ? "fill-primary text-primary" : "text-muted-foreground"
              )}
            />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-4">
          <Badge variant="outline" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {opportunity.location}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Briefcase className="h-3 w-3" />
            {workModeLabels[opportunity.workMode || "onsite"]}
          </Badge>
          {opportunity.educationLevel && (
            <Badge variant="outline" className="flex items-center gap-1">
              <GraduationCap className="h-3 w-3" />
              {opportunity.educationLevel}
            </Badge>
          )}
          <Badge className={cn(typeColors[opportunity.type])}>
            {opportunity.type.charAt(0).toUpperCase() + opportunity.type.slice(1)}
          </Badge>
        </div>

        {opportunity.salary && (
          <div className="mt-4 text-lg font-semibold text-green-600">
            {formatSalary(opportunity.salary)}
          </div>
        )}

        {opportunity.description && (
          <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
            {opportunity.description}
          </p>
        )}

        {opportunity.skills && opportunity.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {opportunity.skills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {opportunity.skills.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{opportunity.skills.length - 4}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-0 flex items-center justify-between">
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {formatDate(opportunity.postedAt)}
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button size="sm" asChild>
            <Link href={`/opportunities/${opportunity.id}`}>Apply Now</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}