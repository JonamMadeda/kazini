"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, X } from "lucide-react";

interface FilterSection {
  id: string;
  title: string;
  options: { value: string; label: string }[];
  defaultExpanded?: boolean;
}

interface FilterPanelProps {
  className?: string;
  onFilterChange?: (filters: Record<string, string[]>) => void;
}

const filterSections: FilterSection[] = [
  {
    id: "type",
    title: "Opportunity Type",
    options: [
      { value: "internship", label: "Internships" },
      { value: "job", label: "Jobs" },
      { value: "remote", label: "Remote" },
      { value: "graduate", label: "Graduate Programs" },
      { value: "part-time", label: "Part-time" },
      { value: "apprenticeship", label: "Apprenticeships" },
    ],
    defaultExpanded: true,
  },
  {
    id: "workMode",
    title: "Work Mode",
    options: [
      { value: "remote", label: "Remote" },
      { value: "hybrid", label: "Hybrid" },
      { value: "onsite", label: "On-site" },
    ],
  },
  {
    id: "education",
    title: "Education Level",
    options: [
      { value: "high-school", label: "High School" },
      { value: "certificate", label: "Certificate" },
      { value: "diploma", label: "Diploma" },
      { value: "bachelors", label: "Bachelor's Degree" },
      { value: "masters", label: "Master's Degree" },
      { value: "phd", label: "PhD" },
    ],
  },
  {
    id: "experience",
    title: "Experience Level",
    options: [
      { value: "entry", label: "Entry Level" },
      { value: "junior", label: "Junior" },
      { value: "intermediate", label: "Intermediate" },
      { value: "senior", label: "Senior" },
    ],
  },
  {
    id: "skills",
    title: "Skills",
    options: [
      { value: "react", label: "React" },
      { value: "python", label: "Python" },
      { value: "javascript", label: "JavaScript" },
      { value: "typescript", label: "TypeScript" },
      { value: "nodejs", label: "Node.js" },
      { value: "java", label: "Java" },
      { value: "data-science", label: "Data Science" },
      { value: "machine-learning", label: "Machine Learning" },
      { value: "ui-ux", label: "UI/UX Design" },
      { value: "cloud", label: "Cloud Computing" },
      { value: "cybersecurity", label: "Cybersecurity" },
      { value: "devops", label: "DevOps" },
    ],
  },
  {
    id: "salary",
    title: "Salary Range",
    options: [
      { value: "0-500", label: "Under $500" },
      { value: "500-1000", label: "$500 - $1,000" },
      { value: "1000-2000", label: "$1,000 - $2,000" },
      { value: "2000-5000", label: "$2,000 - $5,000" },
      { value: "5000+", label: "$5,000+" },
    ],
  },
  {
    id: "datePosted",
    title: "Date Posted",
    options: [
      { value: "24h", label: "Last 24 hours" },
      { value: "7d", label: "Last 7 days" },
      { value: "30d", label: "Last 30 days" },
    ],
  },
];

export function FilterPanel({ className, onFilterChange }: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    filterSections.reduce((acc, section) => {
      acc[section.id] = section.defaultExpanded || false;
      return acc;
    }, {} as Record<string, boolean>)
  );
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const toggleFilter = (sectionId: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[sectionId] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      const newFilters = { ...prev, [sectionId]: updated };
      onFilterChange?.(newFilters);
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    onFilterChange?.({});
  };

  const activeFilterCount = Object.values(selectedFilters).flat().length;

  return (
    <div className={cn("bg-white rounded-xl border p-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Filters</h3>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(selectedFilters).map(([sectionId, values]) =>
            values.map((value) => (
              <Button
                key={`${sectionId}-${value}`}
                variant="secondary"
                size="sm"
                className="h-6 text-xs"
                onClick={() => toggleFilter(sectionId, value)}
              >
                {value}
                <X className="ml-1 h-3 w-3" />
              </Button>
            ))
          )}
        </div>
      )}

      <Separator className="mb-4" />

      <div className="space-y-4">
        {filterSections.map((section) => (
          <div key={section.id}>
            <button
              className="flex items-center justify-between w-full text-left"
              onClick={() => toggleSection(section.id)}
            >
              <span className="font-medium text-sm">{section.title}</span>
              {expandedSections[section.id] ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>

            {expandedSections[section.id] && (
              <div className="mt-3 space-y-2">
                {section.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${section.id}-${option.value}`}
                      checked={selectedFilters[section.id]?.includes(option.value)}
                      onCheckedChange={() => toggleFilter(section.id, option.value)}
                    />
                    <Label
                      htmlFor={`${section.id}-${option.value}`}
                      className="text-sm cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}