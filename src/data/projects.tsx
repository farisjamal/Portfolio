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
    src: "/assets/projects-screenshots/e-prihatin/landing.svg",
    screenshots: ["landing.svg"],
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
            A centralized web-based donation management platform consolidating
            multiple university welfare programs under a single system,
            streamlining donation workflows across UTHM departments.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Role-Based Access Control</TypographyH3>
          <p className="font-mono mb-2">
            Designed a role-based access control system supporting three user
            categories — admin, department staff, and donors — ensuring each
            user only accesses what they are authorized for.
          </p>
          <TypographyH3 className="my-4 mt-8">Automated Tax Exemption Letters</TypographyH3>
          <p className="font-mono mb-2">
            Automated the generation of tax exemption letters and donation
            receipts, eliminating the fragmented manual process previously
            handled separately across multiple departments.
          </p>
          <TypographyH3 className="my-4 mt-8">Centralized Dashboard</TypographyH3>
          <p className="font-mono mb-2">
            Provides a unified dashboard for administrators to monitor donation
            campaigns, track donor contributions, and manage department-level
            programs from a single interface.
          </p>
        </div>
      );
    },
  },
  {
    id: "property-appointment",
    category: "Full Stack Web App",
    title: "Secure AI Property Appointment System",
    src: "/assets/projects-screenshots/property-appointment/landing.svg",
    screenshots: ["landing.svg"],
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
            A full-stack web application built with React, TypeScript, and
            PostgreSQL that automates property viewing appointments with
            AI-powered natural language booking via N8N automation workflows.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Security Architecture</TypographyH3>
          <p className="font-mono mb-2">
            Designed a role-based access control (RBAC) system with Row Level
            Security (RLS) policies in Supabase to enforce strict data
            isolation between property owners, agents, and clients. Integrated
            JWT Authentication and bcrypt password hashing in compliance with
            Malaysia&apos;s PDPA 2010.
          </p>
          <TypographyH3 className="my-4 mt-8">AI Automation with N8N</TypographyH3>
          <p className="font-mono mb-2">
            Implemented N8N automation workflows for AI-powered natural
            language appointment booking, property owner response handling, and
            automated email notifications — replacing manual back-and-forth
            coordination entirely.
          </p>
          <TypographyH3 className="my-4 mt-8">Role-Based Flows</TypographyH3>
          <p className="font-mono mb-2">
            Property owners can list and manage properties. Clients can browse
            listings and request viewings. The system automatically routes
            requests and sends confirmations to both parties.
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
            A multi-VM sandbox network environment built with VirtualBox using
            Windows 7, Windows 10, and Kali Linux instances to simulate
            real-world attack scenarios and test defensive countermeasures in
            a controlled setting.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Network Reconnaissance</TypographyH3>
          <p className="font-mono mb-2">
            Conducted network reconnaissance using Nmap to enumerate open
            ports, identify active services, and fingerprint operating systems
            across target machines — building a full network map before
            simulating attacks.
          </p>
          <TypographyH3 className="my-4 mt-8">Credential Attack Simulation</TypographyH3>
          <p className="font-mono mb-2">
            Executed controlled brute-force credential attacks using Hydra
            against target machines to demonstrate password vulnerability
            exploitation and validate defensive password policies.
          </p>
          <TypographyH3 className="my-4 mt-8">Attack Documentation & Countermeasures</TypographyH3>
          <p className="font-mono mb-2">
            Documented three controlled network attack simulations — analyzing
            each attack vector in detail and proposing corresponding defensive
            countermeasures for each identified vulnerability.
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
            A DDoS mitigation system with a real-time monitoring dashboard
            visualizing blocked vs. allowed traffic and load distribution
            across servers, with administrative controls to simulate and
            recover from server failures.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Web Application Firewall (WAF)</TypographyH3>
          <p className="font-mono mb-2">
            Deployed a WAF proxy layer to inspect and block SQL injection and
            XSS attack patterns before they reach the application servers,
            filtering malicious traffic at the edge.
          </p>
          <TypographyH3 className="my-4 mt-8">Load Balancing</TypographyH3>
          <p className="font-mono mb-2">
            Implemented a load balancing mechanism to distribute incoming
            network traffic evenly across Server A and Server B, preventing
            resource exhaustion on any single server during high-traffic
            events.
          </p>
          <TypographyH3 className="my-4 mt-8">Redundancy & Failover</TypographyH3>
          <p className="font-mono mb-2">
            Configured a redundancy setup with synchronized dual-server
            failover to maintain website availability during server failures,
            ensuring continuous uptime even when one node goes down.
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
            A three-zone network architecture (Internal LAN, DMZ, Outside)
            designed using Cisco ASA 5505 firewall and VLAN segmentation to
            isolate traffic between zones and protect an e-commerce
            environment.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Firewall & Traffic Control</TypographyH3>
          <p className="font-mono mb-2">
            Set up NAT, ACLs, and DHCP on Cisco ASA to manage traffic flow and
            restrict external access to HTTP and SMTP services only — blocking
            all other inbound traffic from the outside zone.
          </p>
          <TypographyH3 className="my-4 mt-8">DMZ Architecture</TypographyH3>
          <p className="font-mono mb-2">
            Placed public-facing Web and Email servers inside the DMZ, keeping
            them reachable externally without exposing the internal LAN — a
            standard security architecture for internet-facing services.
          </p>
          <TypographyH3 className="my-4 mt-8">Testing & Debugging</TypographyH3>
          <p className="font-mono mb-2">
            Ran connectivity tests across ICMP, HTTP, and SMTP. Identified and
            fixed a VLAN misconfiguration on the DMZ switch that was causing
            full packet loss to the Email Server.
          </p>
        </div>
      );
    },
  },
];

export default projects;
