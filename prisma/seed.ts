import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create companies
  const techcorp = await prisma.company.create({
    data: {
      name: "TechCorp Africa",
      industry: "Technology",
      location: "Nairobi, Kenya",
      description: "Leading tech company building solutions for Africa",
    },
  });

  const google = await prisma.company.create({
    data: {
      name: "Google Africa",
      industry: "Technology",
      location: "Remote",
      description: "Building products for the next billion users",
    },
  });

  const stripe = await prisma.company.create({
    data: {
      name: "Stripe",
      industry: "Fintech",
      location: "Cape Town, South Africa",
      description: "Payment infrastructure for the internet",
    },
  });

  const andela = await prisma.company.create({
    data: {
      name: "Andela",
      industry: "Technology",
      location: "Lagos, Nigeria",
      description: "Connecting African talent with global opportunities",
    },
  });

  // Create opportunities
  await prisma.opportunity.createMany({
    data: [
      {
        title: "Frontend Developer Internship",
        description: "Join our team as a frontend developer intern and work with React, TypeScript, and modern web technologies. You'll collaborate with experienced developers on real projects and learn industry best practices.",
        location: "Nairobi, Kenya",
        type: "INTERNSHIP",
        workMode: "HYBRID",
        salaryMin: 500,
        salaryMax: 800,
        educationLevel: "Bachelor's",
        experienceLevel: "Entry Level",
        companyId: techcorp.id,
        postedAt: new Date(),
      },
      {
        title: "Software Engineering Graduate Program",
        description: "Our graduate program for aspiring software engineers to build the future of technology. Get mentorship from Google engineers and work on real products used by billions.",
        location: "Remote",
        type: "GRADUATE",
        workMode: "REMOTE",
        salaryMin: 3000,
        salaryMax: 5000,
        educationLevel: "Bachelor's",
        experienceLevel: "Entry Level",
        companyId: google.id,
        postedAt: new Date(),
      },
      {
        title: "Full Stack Developer",
        description: "Build payment infrastructure that powers businesses across Africa. Work with cutting-edge technology and help shape the future of fintech on the continent.",
        location: "Cape Town, South Africa",
        type: "JOB",
        workMode: "ONSITE",
        salaryMin: 4000,
        salaryMax: 6000,
        educationLevel: "Bachelor's",
        experienceLevel: "Intermediate",
        companyId: stripe.id,
        postedAt: new Date(),
      },
      {
        title: "Backend Engineer Intern",
        description: "Learn backend development with Node.js, PostgreSQL, and cloud technologies. Work on APIs that power our platform serving millions of users.",
        location: "Lagos, Nigeria",
        type: "INTERNSHIP",
        workMode: "ONSITE",
        salaryMin: 400,
        salaryMax: 600,
        educationLevel: "Diploma",
        experienceLevel: "Entry Level",
        companyId: andela.id,
        postedAt: new Date(),
      },
      {
        title: "Data Science Internship",
        description: "Join our data science team to work on machine learning models and analytics that drive product decisions. Perfect for students passionate about AI/ML.",
        location: "Remote",
        type: "INTERNSHIP",
        workMode: "REMOTE",
        salaryMin: 600,
        salaryMax: 900,
        educationLevel: "Master's",
        experienceLevel: "Entry Level",
        companyId: google.id,
        postedAt: new Date(),
      },
      {
        title: "Product Manager",
        description: "Lead product initiatives and work cross-functionally with engineering, design, and marketing teams to build products that users love.",
        location: "Nairobi, Kenya",
        type: "JOB",
        workMode: "HYBRID",
        salaryMin: 3500,
        salaryMax: 5000,
        educationLevel: "Bachelor's",
        experienceLevel: "Intermediate",
        companyId: techcorp.id,
        postedAt: new Date(),
      },
    ],
  });

  console.log("✅ Seed data created!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());