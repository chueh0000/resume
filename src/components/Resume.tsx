import { Mail, Phone, ExternalLink } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "./icons"
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "./ui/button-group"
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import profilePicture from "@/assets/pfp.png"
import en from "../locales/en.json";
import zh from "../locales/zh.json";
import sharedData from "../locales/shared.json";

// Define a type for the common structure of internship, project, and activity items
interface LinkableItem {
  name: string;
  link?: string; // Optional link property
  subtitle?: string;
  role?: string;
  company?: string;
  // Add other common properties if needed
}

export default function Resume() {
  const { lang, setLang } = useLanguage();
  const langData = lang === "en" ? en : zh;
  const activeLangData = {
    ...langData,
    contact: sharedData.contact,
    skills: {
      title: langData.skills.title,
      list: sharedData.skills.list,
    },
    certificates: {
      title: langData.certificates.title,
      list: sharedData.certificates.list,
    },
  };

  // Function to render list items
  const renderList = (items: string[]) => (
    <ul className="list-disc pl-5 text-gray-700 text-xs">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );

  // Function to render tech badges
  const renderTechBadges = (tech: string[], printInline = false) => (
    <div className={cn(
      "flex flex-wrap gap-2 mb-2",
      printInline ? "hidden print:flex print:mb-0 print:gap-1" : "print:hidden"
    )}>
      {tech.map((item, index) => (
        <Badge key={index} variant="secondary" className={cn(printInline && "print:text-[10px] print:px-1.5 print:py-0")}>
          {item}
        </Badge>
      ))}
    </div>
  );

  // Helper component for rendering titles that can be links
  const TitleWithLink = ({ item }: { item: LinkableItem }) => {
    const titleClasses = "text-base font-semibold text-gray-800 print:text-sm";
    const linkClasses = "text-blue-800 hover:underline inline-flex items-center gap-1";

    if (item.link) {
      return (
        <a href={item.link} target="_blank" rel="noopener noreferrer" className={linkClasses}>
          <h3 className={titleClasses}>{item.name}</h3>
          <ExternalLink className="h-3 w-3" />
        </a>
      );
    }
    return <h3 className={titleClasses}>{item.name}</h3>;
  };

  return (
    <div className="container mx-auto p-3 md:p-10 lg:p-12 max-w-4xl bg-white shadow-lg rounded-lg print:p-0 print:shadow-none print:max-w-none">
      {/* Language Switcher */}
      <div className="flex justify-end gap-2 mb-5 print:hidden">
				<ButtonGroup>
					<Button
						onClick={() => setLang("en")}
						variant={lang === "en" ? "default" : "outline"}
						size="sm"
					>
						English
					</Button>
					<ButtonGroupSeparator />
					<Button
						onClick={() => setLang("zh")}
						variant={lang === "zh" ? "default" : "outline"}
						size="sm"
					>
						中文
					</Button>
				</ButtonGroup>
      </div>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-2 print:mb-1">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1 print:text-xl print:mb-0.5">
            {activeLangData.name}
          </h1>
          <div className="text-gray-700 space-y-1 print:space-y-0 print:grid print:grid-cols-2 print:gap-x-4">
            <div className="flex items-center text-sm print:text-xs">
              <Mail className="w-4 h-4 mr-2 text-gray-600 print:w-3 print:h-3 print:mr-1" />
              <span>{activeLangData.contact.email}</span>
            </div>
            <div className="flex items-center text-sm print:text-xs">
              <Phone className="w-4 h-4 mr-2 text-gray-600 print:w-3 print:h-3 print:mr-1" />
              <span>{activeLangData.contact.phone}</span>
            </div>
            {/* GitHub Link */}
            <a
              href={activeLangData.contact.github.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-blue-700 hover:underline print:text-xs print:text-gray-700"
            >
							<GitHubIcon className="w-4 h-4 mr-2 text-gray-600 print:w-3 print:h-3 print:mr-1" />
              <span>{activeLangData.contact.github.username}</span>
            </a>
            {/* LinkedIn Link */}
            <a
              href={activeLangData.contact.linkedin.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-blue-700 hover:underline print:text-xs print:text-gray-700"
            >
							<LinkedInIcon className="w-4 h-4 mr-2 text-gray-600 print:w-3 print:h-3 print:mr-1" />
              <span>{activeLangData.contact.linkedin.username}</span>
            </a>
          </div>
        </div>
        {/* Profile Picture Placeholder */}
        <div className="w-24 h-35 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden print:w-12 print:h-16">
          <img src={profilePicture} alt="Profile" className="object-cover w-full h-full" />
        </div>
      </div>

      {/* Education Section */}
      <section className="mb-5 print:mb-2">
        <h2 className="text-xl font-bold text-gray-800 border-b-1 border-gray-300 mb-2 print:text-lg print:mb-1">
          {activeLangData.education.title}
        </h2>
        <div className="mb-3 print:mb-1.5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-semibold text-gray-800 print:text-sm">
                {activeLangData.education.ntu.university}
              </h3>
              <p className="text-gray-700 text-sm print:text-xs">
                {activeLangData.education.ntu.degree}
              </p>
            </div>
            <span className="text-sm text-gray-600 text-right whitespace-nowrap print:text-xs">
              {activeLangData.education.ntu.date}
            </span>
          </div>
          {renderList(activeLangData.education.ntu.courses)}
        </div>
        {/* <div>
          <div className="flex justify-between items-start">
            <h3 className="text-base font-semibold text-gray-800 print:text-sm">
              {activeLangData.education.highSchool.school}
            </h3>
            <span className="text-sm text-gray-600 text-right whitespace-nowrap print:text-xs">
              {activeLangData.education.highSchool.date}
            </span>
          </div>
          <p className="text-gray-700 text-xs print:text-xs">{activeLangData.education.highSchool.subjects}</p>
        </div> */}
      </section>

      {/* Skills Section */}
      <section className="mb-5 print:mb-2">
        <h2 className="text-xl font-bold text-gray-800 border-b-1 border-gray-300 mb-2 print:text-lg print:mb-1">
          {activeLangData.skills.title}
        </h2>
        <div className="flex flex-wrap gap-1">
          {activeLangData.skills.list.map((skill, index) => (
            <Badge key={index} className="bg-gray-700 print:text-[10px] print:px-1.5 print:py-0">
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      {/* Certificates Section */}
      <section className="mb-5 print:mb-2">
        <h2 className="text-xl font-bold text-gray-800 border-b-1 border-gray-300 mb-2 print:text-lg print:mb-1">
          {activeLangData.certificates.title}
        </h2>
        <div className="flex flex-wrap gap-2 print:gap-1">
          {activeLangData.certificates.list.map((cert, index) => (
            <Badge asChild className="bg-gray-700 print:text-[10px] print:px-1.5 print:py-0">
              <a
                key={index}
								href={cert.link}
								target="_blank"
								rel="noopener noreferrer"
								className="block"
							>
								{cert.name} <ExternalLink data-icon="inline-end" className="print:w-2 print:h-2" />
              </a>
            </Badge>
          ))}
        </div>
      </section>

			<section className="mb-5 print:mb-2">
        <h2 className="text-xl font-bold text-gray-800 border-b-1 border-gray-300 mb-2 print:text-lg print:mb-1">
          {activeLangData.researchExperience.title}
        </h2>
        <div className="mb-3 print:mb-1.5">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex flex-wrap items-center gap-x-2">
                <TitleWithLink item={{ name: activeLangData.researchExperience.wnes.name, link: activeLangData.researchExperience.wnes.link }} />
                {renderTechBadges(activeLangData.researchExperience.wnes.tech, true)}
              </div>
              <p className="text-gray-700 text-sm mb-1 print:text-xs print:mb-0.5">
                {activeLangData.researchExperience.wnes.subtitle}
              </p>
            </div>
            <span className="text-sm text-gray-600 text-right whitespace-nowrap print:text-xs">
              {activeLangData.researchExperience.wnes.date}
            </span>
          </div>
          {renderTechBadges(activeLangData.researchExperience.wnes.tech)}
          {renderList(activeLangData.researchExperience.wnes.description)}
        </div>
      </section>

      <section className="mb-5 print:mb-2">
        <h2 className="text-xl font-bold text-gray-800 border-b-1 border-gray-300 mb-2 print:text-lg print:mb-1">
          {activeLangData.internship.title}
        </h2>
        {activeLangData.internship.items.map((item, index) => (
          <div key={index} className="mb-3 print:mb-1.5">
            <div className="flex justify-between items-start">
              <div>
                {/* Conditional link for internship company */}
                <div className="flex flex-wrap items-center gap-x-2">
                  <TitleWithLink item={{ name: item.company, link: item.link }} />
                  {renderTechBadges(item.tech, true)}
                </div>
                <p className="text-gray-700 text-sm mb-1 print:text-xs print:mb-0.5">
                  {item.role}
                </p>
              </div>
              <span className="text-sm text-gray-600 text-right whitespace-nowrap print:text-xs">
                {item.date}
              </span>
            </div>
            {renderTechBadges(item.tech)}
            {renderList(item.responsibilities)}
          </div>
        ))}
      </section>

      <section className="mb-5 print:mb-2">
        <h2 className="text-xl font-bold text-gray-800 border-b-1 border-gray-300 mb-2 print:text-lg print:mb-1">
          {activeLangData.groupProjectExperiences.title}
        </h2>
        {activeLangData.groupProjectExperiences.items.map((item, index) => (
          <div key={index} className="mb-3 last:mb-0 print:mb-2 last:print:mb-0">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex flex-wrap items-center gap-x-2">
                  <TitleWithLink item={{ name: item.name, link: item.link, subtitle: item.subtitle }} />
                  {renderTechBadges(item.tech, true)}
                </div>
                <p className="text-gray-700 text-sm mb-1 print:text-xs print:mb-0.5">
                  {item.subtitle}
                </p>
              </div>
              <span className="text-sm text-gray-600 text-right whitespace-nowrap print:text-xs">
                {item.date}
              </span>
            </div>
            {renderTechBadges(item.tech)}
            {renderList(item.description)}
          </div>
        ))}
      </section>

      <section className="mb-5 print:mb-2">
        <h2 className="text-xl font-bold text-gray-800 border-b-1 border-gray-300 mb-2 print:text-lg print:mb-1">
          {activeLangData.extracurricularActivities.title}
        </h2>
        {activeLangData.extracurricularActivities.items.map((item, index) => (
          <div key={index} className="mb-3 last:mb-0 print:mb-1.5 last:print:mb-0">
            <div className="flex justify-between items-start">
              <div>
                {/* Conditional link for activity */}
                <TitleWithLink item={{ name: item.name, link: item.link, role: item.role }} />
                <p className="text-gray-700 text-sm mb-1 print:text-xs print:mb-0.5">
                  {item.role}
                </p>
              </div>
              <span className="text-sm text-gray-600 text-right whitespace-nowrap print:text-xs">
                {item.date}
              </span>
            </div>
            {renderList(item.responsibilities)}
          </div>
        ))}
      </section>
    </div>
  );
}
