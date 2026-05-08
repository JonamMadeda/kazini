import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

const footerLinks = {
  opportunities: [
    { label: "Internships", href: "/search?type=internship" },
    { label: "Jobs", href: "/search?type=job" },
    { label: "Remote Work", href: "/search?type=remote" },
    { label: "Graduate Programs", href: "/search?type=graduate" },
    { label: "Part-time", href: "/search?type=part-time" },
  ],
  resources: [
    { label: "Resume Tips", href: "/resources/resume" },
    { label: "Interview Prep", href: "/resources/interview" },
    { label: "Career Blog", href: "/blog" },
    { label: "Salary Guide", href: "/resources/salary" },
    { label: "Career Path", href: "/resources/career" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Accessibility", href: "/accessibility" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-primary font-bold text-lg">
                K
              </div>
              <span className="text-xl font-bold">Kazini</span>
            </Link>
            <p className="text-navy-300 mb-6 max-w-sm">
              The smartest African-first career opportunity discovery platform.
              Find internships, jobs, and career opportunities across Africa and
              beyond.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 rounded-full bg-navy-800 hover:bg-navy-700 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-navy-800 hover:bg-navy-700 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-navy-800 hover:bg-navy-700 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-navy-800 hover:bg-navy-700 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Opportunities</h4>
            <ul className="space-y-3">
              {footerLinks.opportunities.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-navy-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-navy-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-navy-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-navy-300 mb-4 text-sm">
              Get the latest opportunities delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-navy-800 border-navy-700 text-white placeholder:text-navy-400"
              />
              <Button size="icon" variant="secondary">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-12 bg-navy-800" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-navy-400 text-sm">
            © {new Date().getFullYear()} Kazini. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-navy-400 hover:text-white text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}