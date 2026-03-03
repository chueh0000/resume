import { Mail, Phone, Github, Linkedin, ExternalLink } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const renderTechBadges = (tech: string[]) => (
    <div className="flex flex-wrap gap-2 mb-2">
      {tech.map((item, index) => (
        <Badge key={index} variant="secondary">
          {item}
        </Badge>
      ))}
    </div>
  );

  // Helper component for rendering titles that can be links
  const TitleWithLink = ({ item }: { item: LinkableItem }) => {
    const titleClasses = "text-base font-semibold text-gray-800";
    const linkClasses = "text-blue-600 hover:underline inline-flex items-center gap-1";

    if (item.link) {
      return (
        <a href={item.link} target="_blank" rel="noopener noreferrer" className={linkClasses}>
          <h3 className={titleClasses}>{item.name}</h3>
          <ExternalLink className="h-4 w-4" />
        </a>
      );
    }
    return <h3 className={titleClasses}>{item.name}</h3>;
  };

  return (
    <div className="container mx-auto p-3 md:p-10 lg:p-12 max-w-4xl bg-white shadow-lg rounded-lg">
      {/* Language Switcher */}
      <div className="flex justify-end gap-2 mb-4 print:hidden">
        <Button
          onClick={() => setLang("en")}
          variant={lang === "en" ? "default" : "outline"}
          size="sm"
        >
          English
        </Button>
        <Button
          onClick={() => setLang("zh")}
          variant={lang === "zh" ? "default" : "outline"}
          size="sm"
        >
          中文
        </Button>
      </div>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {activeLangData.name}
          </h1>
          <div className="text-gray-700 space-y-1">
            <div className="flex items-center text-sm">
              <Mail className="w-4 h-4 mr-2 text-gray-600" />
              <span>{activeLangData.contact.email}</span>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="w-4 h-4 mr-2 text-gray-600" />
              <span>{activeLangData.contact.phone}</span>
            </div>
            {/* GitHub Link */}
            <a
              href={activeLangData.contact.github.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-blue-600 hover:underline"
            >
              <Github className="w-4 h-4 mr-2 text-gray-600" />
              <span>{activeLangData.contact.github.username}</span>
            </a>
            {/* LinkedIn Link */}
            <a
              href={activeLangData.contact.linkedin.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-blue-600 hover:underline"
            >
              <Linkedin className="w-4 h-4 mr-2 text-gray-600" />
              <span>{activeLangData.contact.linkedin.username}</span>
            </a>
          </div>
        </div>
        {/* Profile Picture Placeholder */}
        <div className="w-24 h-35 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
          <img src={profilePicture} alt="Profile" className="object-cover w-full h-full" />
        </div>
      </div>

      {/* Education Section */}
      <section className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 mb-2">
          {activeLangData.education.title}
        </h2>
        <div className="mb-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                {activeLangData.education.ntu.university}
              </h3>
              <p className="text-gray-700 text-sm">
                {activeLangData.education.ntu.degree}
              </p>
            </div>
            <span className="text-sm text-gray-600 text-right whitespace-nowrap">
              {activeLangData.education.ntu.date}
            </span>
          </div>
          {renderList(activeLangData.education.ntu.courses)}
        </div>
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-base font-semibold text-gray-800">
              {activeLangData.education.highSchool.school}
            </h3>
            <span className="text-sm text-gray-600 text-right whitespace-nowrap">
              {activeLangData.education.highSchool.date}
            </span>
          </div>
          <p className="text-gray-700 text-sm">{activeLangData.education.highSchool.subjects}</p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 mb-2">
          {activeLangData.skills.title}
        </h2>
        <div className="flex flex-wrap gap-1">
          {activeLangData.skills.list.map((skill, index) => (
            <Badge key={index}>{skill}</Badge>
          ))}
        </div>
      </section>

      {/* Certificates Section */}
      <section className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 mb-2">
          {activeLangData.certificates.title}
        </h2>
        <div className="flex flex-wrap gap-2">
          {activeLangData.certificates.list.map((cert, index) => (
            <a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Badge>{cert.name}</Badge>
            </a>
          ))}
        </div>
      </section>

      {/* Internship Section */}
      <section className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 mb-2">
          {activeLangData.internship.title}
        </h2>
        <div className="mb-3">
          <div className="flex justify-between items-start">
            <div>
              {/* Conditional link for internship company */}
              <TitleWithLink item={{ name: activeLangData.internship.bigDataMobile.company, link: activeLangData.internship.bigDataMobile.link }} />
              <p className="text-gray-700 text-sm mb-1">
                {activeLangData.internship.bigDataMobile.role}
              </p>
            </div>
            <span className="text-sm text-gray-600 text-right whitespace-nowrap">
              {activeLangData.internship.bigDataMobile.date}
            </span>
          </div>
          {renderTechBadges(activeLangData.internship.bigDataMobile.tech)}
          {renderList(activeLangData.internship.bigDataMobile.responsibilities)}
        </div>
      </section>

      {/* Group Project Experiences Section */}
      <section className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 mb-2">
          {activeLangData.groupProjectExperiences.title}
        </h2>
        <div className="mb-3">
          <div className="flex justify-between items-start">
            <div>
              {/* Conditional link for Line Chatbot project */}
              <TitleWithLink item={{ name: activeLangData.groupProjectExperiences.lineChatbot.name, link: activeLangData.groupProjectExperiences.lineChatbot.link, subtitle: activeLangData.groupProjectExperiences.lineChatbot.subtitle }} />
              <p className="text-gray-700 text-sm mb-1">
                {activeLangData.groupProjectExperiences.lineChatbot.subtitle}
              </p>
            </div>
            <span className="text-sm text-gray-600 text-right whitespace-nowrap">
              {activeLangData.groupProjectExperiences.lineChatbot.date}
            </span>
          </div>
          {renderTechBadges(activeLangData.groupProjectExperiences.lineChatbot.tech)}
          {renderList(activeLangData.groupProjectExperiences.lineChatbot.description)}
        </div>

        <div className="mb-3">
          <div className="flex justify-between items-start">
            <div>
              {/* Conditional link for Braille Display project */}
              <TitleWithLink item={{ name: activeLangData.groupProjectExperiences.brailleDisplay.name, link: activeLangData.groupProjectExperiences.brailleDisplay.link, subtitle: activeLangData.groupProjectExperiences.brailleDisplay.subtitle }} />
              <p className="text-gray-700 text-sm mb-1">
                {activeLangData.groupProjectExperiences.brailleDisplay.subtitle}
              </p>
            </div>
            <span className="text-sm text-gray-600 text-right whitespace-nowrap">
              {activeLangData.groupProjectExperiences.brailleDisplay.date}
            </span>
          </div>
          {renderTechBadges(activeLangData.groupProjectExperiences.brailleDisplay.tech)}
          {renderList(activeLangData.groupProjectExperiences.brailleDisplay.description)}
        </div>

        <div>
          <div className="flex justify-between items-start">
            <div>
              {/* Conditional link for Speech Summarization project */}
              <TitleWithLink item={{ name: activeLangData.groupProjectExperiences.speechSummarization.name, link: activeLangData.groupProjectExperiences.speechSummarization.link, subtitle: activeLangData.groupProjectExperiences.speechSummarization.subtitle }} />
              <p className="text-gray-700 text-sm mb-1">
                {activeLangData.groupProjectExperiences.speechSummarization.subtitle}
              </p>
            </div>
            <span className="text-sm text-gray-600 text-right whitespace-nowrap">
              {activeLangData.groupProjectExperiences.speechSummarization.date}
            </span>
          </div>
          {renderTechBadges(activeLangData.groupProjectExperiences.speechSummarization.tech)}
          {renderList(activeLangData.groupProjectExperiences.speechSummarization.description)}
        </div>
      </section>

      {/* Extracurricular Activities Section */}
      <section className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 mb-2">
          {activeLangData.extracurricularActivities.title}
        </h2>
        <div className="mb-3">
          <div className="flex justify-between items-start">
            <div>
              {/* Conditional link for DSA activity */}
              <TitleWithLink item={{ name: activeLangData.extracurricularActivities.dsa.name, link: activeLangData.extracurricularActivities.dsa.link, role: activeLangData.extracurricularActivities.dsa.role }} />
              <p className="text-gray-700 text-sm mb-1">
                {activeLangData.extracurricularActivities.dsa.role}
              </p>
            </div>
            <span className="text-sm text-gray-600 text-right whitespace-nowrap">
              {activeLangData.extracurricularActivities.dsa.date}
            </span>
          </div>
          {renderList(activeLangData.extracurricularActivities.dsa.responsibilities)}
        </div>

        <div>
          <div className="flex justify-between items-start">
            <div>
              {/* Conditional link for Cycling Club activity */}
              <TitleWithLink item={{ name: activeLangData.extracurricularActivities.cyclingClub.name, link: activeLangData.extracurricularActivities.cyclingClub.link, role: activeLangData.extracurricularActivities.cyclingClub.role }} />
              <p className="text-gray-700 text-sm mb-1">
                {activeLangData.extracurricularActivities.cyclingClub.role}
              </p>
            </div>
            <span className="text-sm text-gray-600 text-right whitespace-nowrap">
              {activeLangData.extracurricularActivities.cyclingClub.date}
            </span>
          </div>
          {renderList(activeLangData.extracurricularActivities.cyclingClub.responsibilities)}
        </div>
      </section>
    </div>
  );
}
