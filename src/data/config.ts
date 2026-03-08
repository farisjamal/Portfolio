const config = {
  title: "Mohamad Faris | Information Security & Developer",
  description: {
    long: "Explore the portfolio of Mohamad Faris, an Information Security student and developer specializing in secure web applications, network security, and full-stack development. Discover my latest work including System e-Prihatin UTHM, Secure AI Property Appointment System, and more.",
    short:
      "Portfolio of Mohamad Faris, an Information Security student and developer building secure web applications.",
  },
  keywords: [
    "Mohamad Faris",
    "portfolio",
    "information security",
    "cybersecurity",
    "web developer",
    "full-stack developer",
    "React",
    "TypeScript",
    "PostgreSQL",
    "UTHM",
    "network security",
    "secure development",
    "Malaysia",
  ],
  author: "Mohamad Faris",
  email: "farisjamal7979@gmail.com",
  site: "https://github.com/farisjamal",

  // for github stars button (set githubRepo once you upload portfolio to GitHub)
  githubUsername: "farisjamal",
  githubRepo: "",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "",
    linkedin: "https://www.linkedin.com/in/farisjamal-049a91340",
    instagram: "",
    facebook: "",
    github: "https://github.com/farisjamal",
  },
};
export { config };
