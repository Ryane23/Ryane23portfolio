export type Locale = "en" | "fr";

export type LocalizedText = Record<Locale, string>;

export const profile = {
  name: "Ryan Erick Ngu Javea Fominyen",
  shortName: "Ryan Erick",
  role: {
    en: "Software Engineer · Full-Stack & Mobile Developer",
    fr: "Ingénieur logiciel · Développeur Full-Stack & Mobile",
  },
  location: "Yaoundé, Cameroon",
  email: "erickryan2@gmail.com",
  phones: ["+237 652 384 153", "+237 692 830 376"],
  github: "https://github.com/Ryane23",
  linkedin: "https://www.linkedin.com/in/ryan-erick-ngu-javea-fominyen-9539591a6/",
  x: "https://x.com/ErickJavea55143",
  summary: {
    en: "Software Engineer and Full-Stack & Mobile Developer from Cameroon with practical experience designing and developing web and mobile applications, backend systems, APIs, databases, and digital platforms.",
    fr: "Ingénieur logiciel et développeur Full-Stack & Mobile camerounais, avec une expérience pratique dans la conception d’applications web et mobiles, de systèmes backend, d’API, de bases de données et de plateformes numériques.",
  },
};

export const experiences = [
  {
    period: "02/2026 — PRESENT",
    organization: "CRESTLANCING",
    role: { en: "Software Developer", fr: "Développeur logiciel" },
    description: {
      en: "Developing and maintaining web and mobile solutions, APIs, databases, and user interfaces as part of a professional development team.",
      fr: "Développement et maintenance de solutions web et mobiles, d’API, de bases de données et d’interfaces au sein d’une équipe professionnelle.",
    },
  },
  {
    period: "01/2026 — 02/2026",
    organization: "CRESTLANCING",
    role: { en: "Software Development Intern", fr: "Stagiaire en développement logiciel" },
    description: {
      en: "Contributed to frontend, backend, API, database, debugging, and team-based engineering work before moving into a developer role.",
      fr: "Contribution au frontend, au backend, aux API, aux bases de données, au débogage et au travail d’équipe avant d’évoluer vers un poste de développeur.",
    },
  },
  {
    period: "01/2025 — 02/2025",
    organization: "FREELANCE",
    role: { en: "Computer Science Home Tutor", fr: "Enseignant particulier en informatique" },
    description: {
      en: "Taught programming and computer-science concepts to GCSE and A-Level students.",
      fr: "Enseignement de la programmation et de l’informatique à des élèves de niveau GCSE et A-Level.",
    },
  },
  {
    period: "09/2022 — 10/2024",
    organization: "TIC FOUNDATION",
    role: { en: "Software Development Intern", fr: "Stagiaire en développement logiciel" },
    description: {
      en: "Supported technology and community initiatives while building practical experience in development, teamwork, and mentorship.",
      fr: "Soutien d’initiatives technologiques et communautaires tout en développant une expérience pratique du développement, du travail d’équipe et du mentorat.",
    },
  },
  {
    period: "2022 — 2026",
    organization: "IAI-CAMEROUN",
    role: { en: "Class Delegate", fr: "Délégué de classe" },
    description: {
      en: "Represented students, coordinated communication with the administration, and supported academic activities.",
      fr: "Représentation des étudiants, coordination avec l’administration et soutien aux activités académiques.",
    },
  },
];

export const education = [
  {
    period: "2022 — 2025",
    school: "Institut Africain d’Informatique (IAI-Cameroun)",
    qualification: { en: "Bachelor’s in Computer Sciences", fr: "Licence en informatique" },
  },
  {
    period: "2020 — 2021",
    school: "Christ the King College Nkolfolou",
    qualification: { en: "GCE Advanced Level", fr: "GCE Advanced Level" },
  },
  {
    period: "2016",
    school: "Franky Comprehensive Secondary School",
    qualification: { en: "GCE Ordinary Level", fr: "GCE Ordinary Level" },
  },
];

export const skillGroups = [
  {
    title: { en: "Frontend & Mobile", fr: "Frontend & Mobile" },
    items: ["React.js", "Next.js", "React Native", "Vite", "Tailwind CSS", "Bootstrap", "Expo"],
  },
  {
    title: { en: "Backend", fr: "Backend" },
    items: ["Node.js", "Express.js", "NestJS", "Django", "Laravel", "REST APIs"],
  },
  {
    title: { en: "Data", fr: "Données" },
    items: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "Supabase", "Prisma", "Sequelize"],
  },
  {
    title: { en: "AI, Cloud & Systems", fr: "IA, Cloud & Systèmes" },
    items: ["Python", "TensorFlow", "Computer Vision", "AWS Fundamentals", "Docker", "Linux", "Git & GitHub"],
  },
];

export type Project = {
  slug: string;
  number: string;
  name: string;
  category: LocalizedText;
  status: LocalizedText;
  price: LocalizedText;
  role: LocalizedText;
  context: LocalizedText;
  outcome: LocalizedText;
  lesson: LocalizedText;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  preview: "embed" | "screenshot" | "pending";
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "projina",
    number: "01",
    name: "Projina",
    category: { en: "Company management platform", fr: "Plateforme de gestion d’entreprise" },
    status: { en: "Live", fr: "En ligne" },
    price: { en: "1.5M—3M FCFA", fr: "1,5M—3M FCFA" },
    role: { en: "Software-development contributor at CRESTLANCING", fr: "Contributeur au développement chez CRESTLANCING" },
    context: {
      en: "A digital platform for simplifying company operations across finance, employees, projects, and scheduling.",
      fr: "Une plateforme numérique qui simplifie les opérations d’entreprise : finances, employés, projets et planification.",
    },
    outcome: {
      en: "A live product supporting user-facing management flows across core company operations.",
      fr: "Un produit en ligne qui prend en charge les principaux parcours de gestion d’entreprise.",
    },
    lesson: {
      en: "Business software works best when complex operations are presented as clear, focused tasks.",
      fr: "Un logiciel métier est plus efficace lorsque des opérations complexes deviennent des tâches claires et ciblées.",
    },
    stack: ["Full-Stack", "APIs", "Databases", "Responsive UI"],
    liveUrl: "https://www.projina.top/",
    preview: "embed",
    featured: true,
  },
  {
    slug: "chopasap",
    number: "02",
    name: "ChopAsap",
    category: { en: "Food-service digital platform", fr: "Plateforme numérique de restauration" },
    status: { en: "Live", fr: "En ligne" },
    price: { en: "1.5M—3.5M FCFA", fr: "1,5M—3,5M FCFA" },
    role: { en: "Software-development contributor at CRESTLANCING", fr: "Contributeur au développement chez CRESTLANCING" },
    context: {
      en: "A food-service platform combining customer-facing experiences, backend integration, and mobile application access.",
      fr: "Une plateforme de restauration réunissant expérience client, intégration backend et accès mobile.",
    },
    outcome: {
      en: "A live landing experience connected to the wider mobile-product ecosystem.",
      fr: "Une expérience web en ligne reliée à un écosystème produit mobile plus large.",
    },
    lesson: {
      en: "Food-service products need immediate actions and clear paths from discovery to ordering.",
      fr: "Les produits de restauration exigent des actions immédiates et un parcours clair de la découverte à la commande.",
    },
    stack: ["Web", "Mobile", "Backend Integration", "Responsive UI"],
    liveUrl: "https://chopasap.com/",
    preview: "embed",
    featured: true,
  },
  {
    slug: "bajoma",
    number: "03",
    name: "Bajoma",
    category: { en: "Agricultural marketplace", fr: "Marketplace agricole" },
    status: { en: "Private repository", fr: "Dépôt privé" },
    price: { en: "1.5M—3.5M FCFA", fr: "1,5M—3,5M FCFA" },
    role: { en: "Software-development contributor at CRESTLANCING", fr: "Contributeur au développement chez CRESTLANCING" },
    context: {
      en: "An agricultural marketplace connecting users with agricultural products and services.",
      fr: "Une marketplace agricole reliant les utilisateurs aux produits et services du secteur.",
    },
    outcome: {
      en: "The approved product screenshots and links will be added during the media pass.",
      fr: "Les captures et liens approuvés seront ajoutés pendant la phase média.",
    },
    lesson: {
      en: "Marketplace trust depends on understandable listings, useful filters, and transparent user journeys.",
      fr: "La confiance dans une marketplace repose sur des annonces compréhensibles, des filtres utiles et des parcours transparents.",
    },
    stack: ["Marketplace", "Web", "APIs", "Database"],
    repoUrl: "https://github.com/CarlTeclancing/bajoma-ui",
    preview: "screenshot",
    featured: true,
  },
  {
    slug: "busease",
    number: "04",
    name: "BusEase",
    category: { en: "Transport and ticketing", fr: "Transport et billetterie" },
    status: { en: "In development", fr: "En développement" },
    price: { en: "1.5M—3M FCFA", fr: "1,5M—3M FCFA" },
    role: { en: "Software-development contributor", fr: "Contributeur au développement logiciel" },
    context: {
      en: "A transportation and bus-ticketing solution focused on passenger services and digital booking.",
      fr: "Une solution de transport et de billetterie centrée sur les services passagers et la réservation numérique.",
    },
    outcome: {
      en: "Core booking flows and additional product functionality remain in active development.",
      fr: "Les principaux parcours de réservation et de nouvelles fonctionnalités sont en développement actif.",
    },
    lesson: {
      en: "Transport products must make schedules, availability, payment, and confirmation feel dependable.",
      fr: "Un produit de transport doit rendre les horaires, la disponibilité, le paiement et la confirmation fiables.",
    },
    stack: ["Web", "Mobile", "Booking", "Payments"],
    repoUrl: "https://github.com/Ryane23/busease2.0",
    preview: "screenshot",
    featured: true,
  },
  {
    slug: "eagle",
    number: "05",
    name: "Project EAGLE",
    category: { en: "Consultation platform", fr: "Plateforme de consultation" },
    status: { en: "Private repository", fr: "Dépôt privé" },
    price: { en: "1.2M—2.5M FCFA", fr: "1,2M—2,5M FCFA" },
    role: { en: "Project Lead", fr: "Chef de projet" },
    context: {
      en: "A consultation-platform project led by Ryan. Product details will remain limited until internal material is approved.",
      fr: "Un projet de plateforme de consultation dirigé par Ryan. Les détails resteront limités jusqu’à validation des éléments internes.",
    },
    outcome: {
      en: "Ryan leads project coordination and full-stack delivery for the platform.",
      fr: "Ryan dirige la coordination du projet et la réalisation full-stack de la plateforme.",
    },
    lesson: {
      en: "Leading a software project requires disciplined access, task, repository, and delivery management.",
      fr: "Diriger un projet logiciel exige une gestion rigoureuse des accès, tâches, dépôts et livraisons.",
    },
    stack: ["Project Leadership", "Full-Stack", "Database", "Git"],
    repoUrl: "https://github.com/Ryane23/eagle",
    preview: "screenshot",
    featured: true,
  },
  {
    slug: "nextpy",
    number: "06",
    name: "NextPy Framework",
    category: { en: "Open-source Python framework", fr: "Framework Python open source" },
    status: { en: "Active development", fr: "Développement actif" },
    price: { en: "Open-source contribution", fr: "Contribution open source" },
    role: { en: "Ongoing contributor · adding functionality", fr: "Contributeur actif · ajout de fonctionnalités" },
    context: {
      en: "A Python-first framework inspired by modern full-stack development, with routing, SSR, SSG, API routes, and server actions.",
      fr: "Un framework Python-first inspiré du développement full-stack moderne, avec routage, SSR, SSG, routes API et server actions.",
    },
    outcome: {
      en: "The framework is under active development, with ongoing functionality and documentation work.",
      fr: "Le framework est en développement actif, avec un travail continu sur les fonctionnalités et la documentation.",
    },
    lesson: {
      en: "Framework work rewards clear conventions, careful APIs, and documentation that keeps pace with implementation.",
      fr: "Le développement d’un framework exige des conventions claires, des API soignées et une documentation à jour.",
    },
    stack: ["Python", "FastAPI", "SSR", "SSG", "WebSockets"],
    liveUrl: "https://nextpy-framework.onrender.com/",
    repoUrl: "https://github.com/RahimStudios/nextpy-framework",
    preview: "screenshot",
    featured: true,
  },
  {
    slug: "legitcm",
    number: "07",
    name: "LegitCM",
    category: { en: "Private product", fr: "Produit privé" },
    status: { en: "Documentation pending", fr: "Documentation à venir" },
    price: { en: "Value pending confirmed scope", fr: "Valeur après validation du périmètre" },
    role: { en: "Development contribution to be documented", fr: "Contribution à documenter" },
    context: {
      en: "A private project awaiting an approved description and media package.",
      fr: "Un projet privé en attente d’une description et de médias approuvés.",
    },
    outcome: { en: "Project documentation is in progress.", fr: "La documentation du projet est en cours." },
    lesson: { en: "To be written with Ryan.", fr: "À rédiger avec Ryan." },
    stack: ["Private repository"],
    repoUrl: "https://github.com/Ryane23/legitcm",
    preview: "pending",
  },
];

export const articles = [
  {
    slug: "from-intern-to-developer",
    title: { en: "From Intern to Software Developer", fr: "De stagiaire à développeur logiciel" },
    excerpt: {
      en: "A future first-person account of moving from a CRESTLANCING internship into a software-development role.",
      fr: "Un futur récit personnel sur le passage d’un stage chez CRESTLANCING à un poste de développeur logiciel.",
    },
    status: { en: "Writing in progress", fr: "Rédaction en cours" },
    topics: ["Career", "Teamwork", "Learning"],
  },
  {
    slug: "building-for-cameroon",
    title: { en: "Building Digital Products for Cameroon", fr: "Créer des produits numériques pour le Cameroun" },
    excerpt: {
      en: "Notes for a future article about local constraints, mobile-first thinking, payments, connectivity, and useful software.",
      fr: "Notes pour un futur article sur les contraintes locales, le mobile-first, les paiements, la connectivité et les logiciels utiles.",
    },
    status: { en: "Outline", fr: "Plan" },
    topics: ["Cameroon", "Product", "Engineering"],
  },
  {
    slug: "lessons-from-busease",
    title: { en: "What BusEase Is Teaching Me", fr: "Ce que BusEase m’apprend" },
    excerpt: {
      en: "A planned development journal about digital booking, transport workflows, and building a product over time.",
      fr: "Un journal de développement prévu autour de la réservation numérique, des parcours de transport et de la construction progressive d’un produit.",
    },
    status: { en: "Outline", fr: "Plan" },
    topics: ["BusEase", "Development", "Transport"],
  },
];

export const localize = (text: LocalizedText, locale: Locale) => text[locale];
