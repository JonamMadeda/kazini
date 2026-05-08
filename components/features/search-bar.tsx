"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Search, X, MapPin, Briefcase } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface SearchBarProps {
  variant?: "hero" | "compact" | "full";
  className?: string;
  defaultValue?: string;
  onSearch?: (query: string) => void;
}

const recentSearches = [
  "Frontend Developer Internship",
  "Software Engineer in Nairobi",
  "Remote React Developer",
  "Data Science Graduate Program",
  "UX Designer Jobs",
];

const popularSearches = [
  { query: "Software Engineering Internships", category: "Internship" },
  { query: "Remote Developer Jobs", category: "Remote" },
  { query: "Graduate Programs 2024", category: "Graduate" },
  { query: "Data Analyst Jobs", category: "Job" },
  { query: "Product Manager Roles", category: "Job" },
];

export function SearchBar({
  variant = "hero",
  className,
  defaultValue = "",
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location) params.set("location", location);
    router.push(`/search?${params.toString()}`);
    onSearch?.(query);
  }, [query, location, router, onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (variant === "compact") {
    return (
      <div className={cn("flex gap-2", className)}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search opportunities..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-9"
          />
        </div>
        <Button onClick={handleSearch}>Search</Button>
      </div>
    );
  }

  if (variant === "full") {
    return (
      <div className={cn("flex gap-2", className)}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Job title, keyword, or company"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-9"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="relative w-48">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={handleSearch} size="lg">
          Search
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search internships, jobs, graduate programs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setOpen(true)}
              className="h-14 pl-12 pr-4 text-lg border-2 focus:border-primary rounded-xl"
            />
          </div>
          <div className="relative w-full md:w-64">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="City or Country"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-14 pl-12 pr-4 text-lg border-2 focus:border-primary rounded-xl"
            />
          </div>
          <Button
            onClick={handleSearch}
            size="lg"
            className="h-14 px-8 text-lg rounded-xl"
          >
            Search
          </Button>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search opportunities..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {query === "" && (
            <>
              <CommandGroup heading="Recent Searches">
                {recentSearches.map((search) => (
                  <CommandItem
                    key={search}
                    onSelect={() => {
                      setQuery(search);
                      setOpen(false);
                    }}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    {search}
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandGroup heading="Popular Searches">
                {popularSearches.map((item) => (
                  <CommandItem
                    key={item.query}
                    onSelect={() => {
                      setQuery(item.query);
                      setOpen(false);
                    }}
                  >
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span>{item.query}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {item.category}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </div>
  );
}