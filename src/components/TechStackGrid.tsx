import type { CSSProperties } from "react";
import type { SimpleIcon } from "simple-icons";
import {
  siBootstrap,
  siDjango,
  siDocker,
  siExpo,
  siExpress,
  siFirebase,
  siGit,
  siGithub,
  siLaravel,
  siLinux,
  siMongodb,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siSequelize,
  siSupabase,
  siTailwindcss,
  siTensorflow,
  siVite,
} from "simple-icons";
import { type Locale, type LocalizedText, localize } from "@/data/portfolio";

type StackItem = { name: string; icon?: SimpleIcon; mark?: string };
type StackGroup = { title: LocalizedText; items: StackItem[] };

const groups: StackGroup[] = [
  {
    title: { en: "Frontend & Mobile", fr: "Frontend & Mobile" },
    items: [
      { name: "React.js", icon: siReact }, { name: "Next.js", icon: siNextdotjs },
      { name: "React Native", icon: siReact }, { name: "Vite", icon: siVite },
      { name: "Tailwind CSS", icon: siTailwindcss }, { name: "Bootstrap", icon: siBootstrap },
      { name: "Expo", icon: siExpo },
    ],
  },
  {
    title: { en: "Backend & APIs", fr: "Backend & API" },
    items: [
      { name: "Node.js", icon: siNodedotjs }, { name: "Express.js", icon: siExpress },
      { name: "NestJS", icon: siNestjs }, { name: "Django", icon: siDjango },
      { name: "Laravel", icon: siLaravel }, { name: "REST APIs", mark: "API" },
    ],
  },
  {
    title: { en: "Data", fr: "Données" },
    items: [
      { name: "MySQL", icon: siMysql }, { name: "PostgreSQL", icon: siPostgresql },
      { name: "MongoDB", icon: siMongodb }, { name: "Firebase", icon: siFirebase },
      { name: "Supabase", icon: siSupabase }, { name: "Prisma", icon: siPrisma },
      { name: "Sequelize", icon: siSequelize },
    ],
  },
  {
    title: { en: "AI, Cloud & Systems", fr: "IA, Cloud & Systèmes" },
    items: [
      { name: "Python", icon: siPython }, { name: "TensorFlow", icon: siTensorflow },
      { name: "Computer Vision", mark: "CV" }, { name: "AWS Fundamentals", mark: "AWS" },
      { name: "Docker", icon: siDocker }, { name: "Linux", icon: siLinux },
      { name: "Git", icon: siGit }, { name: "GitHub", icon: siGithub },
    ],
  },
];

const TechStackGrid = ({ locale }: { locale: Locale }) => (
  <div className="tech-stack-grid">
    {groups.map((group, groupIndex) => (
      <article className="tech-stack-group" key={group.title.en}>
        <div className="tech-stack-heading"><span className="meta-label">0{groupIndex + 1}</span><h3>{localize(group.title, locale)}</h3></div>
        <div className="tech-stack-items">
          {group.items.map((item) => {
            const style = item.icon ? ({ "--brand": `#${item.icon.hex}` } as CSSProperties) : undefined;
            return <div className="tech-stack-item" key={item.name} style={style} title={item.name}>
              <span className="tech-stack-mark" aria-hidden="true">
                {item.icon ? <svg viewBox="0 0 24 24" role="img"><path d={item.icon.path} /></svg> : <b>{item.mark}</b>}
              </span>
              <span>{item.name}</span>
            </div>;
          })}
        </div>
      </article>
    ))}
  </div>
);

export default TechStackGrid;
