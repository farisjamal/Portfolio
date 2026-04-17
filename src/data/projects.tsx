import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { RiNextjsFill, RiNodejsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiDocker,
  SiPostgresql,
  SiPython,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const BASE_PATH = "/assets/projects-screenshots";

const ProjectsLinks = ({ live, repo }: { live: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      <Link
        className="font-mono underline flex gap-2"
        rel="noopener"
        target="_new"
        href={live}
      >
        <Button variant={"default"} size={"sm"}>
          View on GitHub
          <ArrowUpRight className="ml-3 w-5 h-5" />
        </Button>
      </Link>
      {repo && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Repository
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

const PROJECT_SKILLS = {
  next: {
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <RiNextjsFill />,
  },
  node: {
    title: "Node.js",
    bg: "black",
    fg: "white",
    icon: <RiNodejsFill />,
  },
  python: {
    title: "Python",
    bg: "black",
    fg: "white",
    icon: <SiPython />,
  },
  postgres: {
    title: "PostgreSQL",
    bg: "black",
    fg: "white",
    icon: <SiPostgresql />,
  },
  docker: {
    title: "Docker",
    bg: "black",
    fg: "white",
    icon: <SiDocker />,
  },
  ts: {
    title: "TypeScript",
    bg: "black",
    fg: "white",
    icon: <SiTypescript />,
  },
  react: {
    title: "React.js",
    bg: "black",
    fg: "white",
    icon: <RiReactjsFill />,
  },
  shadcn: {
    title: "ShadCN UI",
    bg: "black",
    fg: "white",
    icon: <SiShadcnui />,
  },
  tailwind: {
    title: "Tailwind",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
  },
  supabase: {
    title: "Supabase",
    bg: "black",
    fg: "white",
    icon: <SiSupabase />,
  },
  php: {
    title: "PHP",
    bg: "black",
    fg: "white",
    icon: <span className="font-bold text-xs">PHP</span>,
  },
  aes: {
    title: "AES Encryption",
    bg: "black",
    fg: "white",
    icon: <span className="font-bold text-xs">AES</span>,
  },
  kali: {
    title: "Kali Linux",
    bg: "black",
    fg: "white",
    icon: <span className="font-bold text-xs">Kali</span>,
  },
  nmap: {
    title: "Nmap",
    bg: "black",
    fg: "white",
    icon: <span className="font-bold text-xs">Nmap</span>,
  },
  waf: {
    title: "WAF",
    bg: "black",
    fg: "white",
    icon: <span className="font-bold text-xs">WAF</span>,
  },
  cisco: {
    title: "Cisco ASA",
    bg: "black",
    fg: "white",
    icon: <span className="font-bold text-xs">Cisco</span>,
  },
  n8n: {
    title: "N8N",
    bg: "black",
    fg: "white",
    icon: <span className="font-bold text-xs">N8N</span>,
  },
  jwt: {
    title: "JWT",
    bg: "black",
    fg: "white",
    icon: <span className="font-bold text-xs">JWT</span>,
  },
  powerbi: {
    title: "Power BI",
    bg: "black",
    fg: "white",
    icon: <span className="font-bold text-xs">PowerBI</span>,
  },
};

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};

const projects: Project[] = [
  {
    id: "e-prihatin",
    category: "Donation Management",
    title: "System e-Prihatin UTHM",
    src: "/assets/projects-screenshots/e-prihatin/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.shadcn,
      ],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.postgres,
      ],
    },
    live: "https://github.com/farisjamal",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            Developing a centralized web-based donation management platform with role-based access control supporting three distinct user categories.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Automated Tax Exemption Workflows</TypographyH3>
          <p className="font-mono mb-2">
            Automating the generation of tax exemption letters and donation receipts, eliminating a fragmented process previously handled separately across multiple departments.
          </p>
        </div>
      );
    },
  },
  {
    id: "property-appointment",
    category: "Full Stack Web App",
    title: "Secure AI Powered Property Appointment System",
    src: "/assets/projects-screenshots/property-appointment/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [
        PROJECT_SKILLS.supabase,
        PROJECT_SKILLS.postgres,
        PROJECT_SKILLS.jwt,
        PROJECT_SKILLS.n8n,
      ],
    },
    live: "https://github.com/farisjamal",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            Building a full-stack web app using React, TypeScript and PostgreSQL that automates property viewing appointments.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Security Architecture</TypographyH3>
          <p className="font-mono mb-2">
            Designing a role-based access control (RBAC) with Row Level Security policies to enforce data isolation.
          </p>
          <p className="font-mono mb-2">
            Integrating JWT Authentication and bcrypt password hashing to secure user session and protect credential in compliance with Malaysia’s PDPA 2010.
          </p>
          <TypographyH3 className="my-4 mt-8">AI Automation Workflows</TypographyH3>
          <p className="font-mono mb-2">
            Implement N8N automation workflows for AI-powered natural language appointment booking, property owner response handling and automated email notification to users.
          </p>
        </div>
      );
    },
  },
  {
    id: "sfms",
    category: "Security Project",
    title: "Secure File Management System",
    src: "/assets/projects-screenshots/sfms/landing.svg",
    screenshots: ["landing.svg"],
    skills: {
      frontend: [
        PROJECT_SKILLS.php,
        PROJECT_SKILLS.aes,
      ],
      backend: [
        PROJECT_SKILLS.php,
        PROJECT_SKILLS.postgres,
      ],
    },
    live: "https://github.com/farisjamal",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            A web-based secure file management system built with a
            defense-in-depth strategy, applying multiple overlapping security
            layers to protect stored files and user data from unauthorized
            access.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">AES Encryption & IDOR Prevention</TypographyH3>
          <p className="font-mono mb-2">
            Implemented AES server-side file encryption with filename
            randomization to prevent Insecure Direct Object Reference (IDOR)
            attacks and protect stored content from unauthorized access.
          </p>
          <TypographyH3 className="my-4 mt-8">SQL Injection Prevention</TypographyH3>
          <p className="font-mono mb-2">
            Integrated PHP PDO prepared statements across all database
            interactions to eliminate SQL injection vulnerabilities at every
            entry point.
          </p>
          <TypographyH3 className="my-4 mt-8">Audit Logging & OWASP Validation</TypographyH3>
          <p className="font-mono mb-2">
            Designed an audit logging module recording all user events (login,
            upload, download) for accountability and traceability. Conducted
            security validation using OWASP ZAP automated scanning and manual
            test cases based on the OWASP Top 10.
          </p>
        </div>
      );
    },
  },
  {
    id: "network-sandbox",
    category: "Network Security",
    title: "Network Security Sandbox",
    src: "/assets/projects-screenshots/network-sandbox/landing.svg",
    screenshots: ["landing.svg"],
    skills: {
      frontend: [
        PROJECT_SKILLS.kali,
        PROJECT_SKILLS.nmap,
      ],
      backend: [],
    },
    live: "https://github.com/farisjamal",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            Conducted network reconnaissance using Nmap to enumerate open ports, identify active services and fingerprint operating systems across target machines.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Credential Attack Simulations</TypographyH3>
          <p className="font-mono mb-2">
            Executed brute-force credential attacks using Hydra against target machines to demonstrate password vulnerability exploitation.
          </p>
          <TypographyH3 className="my-4 mt-8">Analysis & Countermeasures</TypographyH3>
          <p className="font-mono mb-2">
            Documented three controlled network attack simulations, analyzing attack vectors and proposing corresponding defensive countermeasures.
          </p>
        </div>
      );
    },
  },
  {
    id: "ddos-mitigation",
    category: "Security Infrastructure",
    title: "DDoS Mitigation System",
    src: "/assets/projects-screenshots/ddos-mitigation/landing.svg",
    screenshots: ["landing.svg"],
    skills: {
      frontend: [
        PROJECT_SKILLS.waf,
        PROJECT_SKILLS.python,
      ],
      backend: [
        PROJECT_SKILLS.docker,
      ],
    },
    live: "https://github.com/farisjamal",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            Built a real-time monitoring dashboard visualizing blocked versus allowed traffic with administrative controls for simulating and recovering from server failures.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Web Application Firewall (WAF)</TypographyH3>
          <p className="font-mono mb-2">
            Deployed a web application Firewall (WAF) proxy layer to inspect and block SQL injection and XSS attack patterns.
          </p>
          <TypographyH3 className="my-4 mt-8">Load Balancing & Redundancy</TypographyH3>
          <p className="font-mono mb-2">
            Implemented a load balancing mechanism to distribute incoming network traffic evenly across Server A and B, preventing resource exhaustion on a single server.
          </p>
          <p className="font-mono mb-2">
            Configured a redundancy setup with synchronized dual-server failover to maintain website availability during server failures.
          </p>
        </div>
      );
    },
  },
  {
    id: "network-ecommerce",
    category: "Network Design",
    title: "Network Design for E-Commerce",
    src: "/assets/projects-screenshots/network-ecommerce/landing.svg",
    screenshots: ["landing.svg"],
    skills: {
      frontend: [
        PROJECT_SKILLS.cisco,
      ],
      backend: [],
    },
    live: "https://github.com/farisjamal",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            Built a three-zone network (Internal LAN, DMZ, Outside) using Cisco ASA 5505 firewall and VLAN segmentation to keep traffic between zones controlled and isolated.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Traffic Flow & Security</TypographyH3>
          <p className="font-mono mb-2">
            Set up NAT, ACLs and DHCP on Cisco ASA to manage traffic flow and restrict external access to HTTP and SMTP services only.
          </p>
          <TypographyH3 className="my-4 mt-8">Diagnostic & Troubleshooting</TypographyH3>
          <p className="font-mono mb-2">
            Ran connectivity tests across ICMP, HTTP and SMTP. Caught and fixed a VLAN misconfiguration on the DMZ switch that was causing full packet loss to the Email Server.
          </p>
        </div>
      );
    },
  },
  {
    id: "sales-dashboard",
    category: "Data Visualization",
    title: "Sales Performance Dashboard (Power BI)",
    src: "/assets/projects-screenshots/sales-dashboard/landing.jpg",
    screenshots: ["landing.jpg"],
    skills: {
      frontend: [
        PROJECT_SKILLS.powerbi,
      ],
      backend: [],
    },
    live: "https://app.powerbi.com/groups/me/reports/bcbd1b3c-0eec-4168-9acf-e4edc413bc6b/7e0bc760a0a9c1a2e1b7?experience=power-bi",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            Built an interactive sales report dashboard in Power BI visualizing sales performance across five store categories, with a year filter enabling dynamic data updates across all visuals.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Trend Analysis & Period Comparisons</TypographyH3>
          <p className="font-mono mb-2">
            Developed a monthly sales table tracking Sum of Sales, Year-over-Year (YoY%) growth and Year-to-Date (YTD) cumulative totals to support trend analysis and period comparisons.
          </p>
          <TypographyH3 className="my-4 mt-8">Value and Volume Performance</TypographyH3>
          <p className="font-mono mb-2">
            Designed a horizontal bar chart ranking category revenue and a line chart displaying monthly quantity sold, providing a layered view of both value and volume performance.
          </p>
        </div>
      );
    },
  },
];

export default projects;
