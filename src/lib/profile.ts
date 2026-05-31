// Single source of truth for identity and verified profile links.
// Keeping these in one place means every section links to the same
// real, verifiable accounts — the strongest trust signal a portfolio has.

export const profile = {
  name: "Kishan Patel",
  initials: "KP",
  role: ".NET Developer & Product Builder",
  email: "kishan3864@gmail.com",
  location: "India",
  experienceYears: "6+",

  // Verified social profiles — visitors can confirm the work is real.
  github: "https://github.com/Kishan3864",
  linkedin: "https://www.linkedin.com/in/kishanwebdeveloper",

  // Live, public products built and maintained by Kishan.
  products: [
    { name: "FlexYPDF", url: "https://flexypdf.com" },
    { name: "MunafaLab", url: "https://munafalab.com" },
  ],
} as const;
