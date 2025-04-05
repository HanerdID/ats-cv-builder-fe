// src/components/builder/CVPreview.tsx - Enhanced version
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Template implementations
const templates = {
  professional: ProfessionalTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  creative: CreativeTemplate,
  executive: ExecutiveTemplate,
  technical: TechnicalTemplate,
};

export default function CVPreview({
  resumeData,
  template = "professional",
  scale = 1,
  fullPage = false,
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [resumeData, template]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-md">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const TemplateComponent = templates[template] || templates.professional;

  return (
    <AnimatePresence>
      <motion.div
        id="resume-preview"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          height: fullPage ? "auto" : "500px",
          overflow: "auto",
          backgroundColor: "white",
          padding: "20px",
        }}
        className="bg-white shadow-lg rounded-md border relative pdf-export-ready"
      >
        <TemplateComponent resumeData={resumeData} />
      </motion.div>
    </AnimatePresence>
  );
}

// Professional Template implementation - Improved, more ATS-friendly
function ProfessionalTemplate({ resumeData }) {
  if (!resumeData) return null;

  return (
    <div className="p-8 font-sans text-gray-800">
      {/* Header / Personal Info with improved layout */}
      <div className="border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          {resumeData.content.personal?.name || "Your Name"}
        </h1>

        {/* Professional Title if available */}
        {resumeData.content.personal?.jobTitle && (
          <p className="text-lg text-gray-600 mb-3">
            {resumeData.content.personal.jobTitle}
          </p>
        )}

        <div className="flex flex-wrap text-sm space-y-1 md:space-y-0">
          {resumeData.content.personal?.email && (
            <div className="mr-6 flex items-center">
              <svg
                className="w-4 h-4 mr-1 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {resumeData.content.personal.email}
            </div>
          )}
          {resumeData.content.personal?.phone && (
            <div className="mr-6 flex items-center">
              <svg
                className="w-4 h-4 mr-1 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {resumeData.content.personal.phone}
            </div>
          )}
          {resumeData.content.personal?.location && (
            <div className="mr-6 flex items-center">
              <svg
                className="w-4 h-4 mr-1 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {resumeData.content.personal.location}
            </div>
          )}
          {resumeData.content.personal?.linkedin && (
            <div className="mr-6 flex items-center">
              <svg
                className="w-4 h-4 mr-1 text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              {resumeData.content.personal.linkedin}
            </div>
          )}
          {resumeData.content.personal?.website && (
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-1 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              {resumeData.content.personal.website}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {resumeData.content.summary?.text && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {resumeData.content.summary.text}
          </p>
        </div>
      )}

      {/* Experience - With enhanced formatting */}
      {Array.isArray(resumeData.content.experience) &&
        resumeData.content.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3">
              WORK EXPERIENCE
            </h2>
            <div className="space-y-4">
              {resumeData.content.experience.map((job, index) => (
                <div key={index} className="relative pl-0">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                    <h3 className="font-bold text-gray-800">
                      {job.position || "Position"}
                    </h3>
                    <span className="text-gray-600 text-sm">
                      {job.startDate
                        ? new Date(job.startDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                          })
                        : ""}{" "}
                      -{" "}
                      {job.current
                        ? "Present"
                        : job.endDate
                        ? new Date(job.endDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                          })
                        : ""}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium">
                    {job.company || "Company"}
                    {job.location ? ` | ${job.location}` : ""}
                  </p>
                  {job.description && (
                    <p className="mt-2 text-gray-600 whitespace-pre-line">
                      {job.description}
                    </p>
                  )}

                  {/* Achievements bulleted list if available */}
                  {job.achievements && job.achievements.length > 0 && (
                    <ul className="mt-2 list-disc list-inside text-gray-600">
                      {job.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Education */}
      {Array.isArray(resumeData.content.education) &&
        resumeData.content.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3">
              EDUCATION
            </h2>
            <div className="space-y-4">
              {resumeData.content.education.map((edu, index) => (
                <div key={index}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                    <h3 className="font-bold text-gray-800">
                      {edu.degree || "Degree"}
                      {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                    </h3>
                    <span className="text-gray-600 text-sm">
                      {edu.startDate
                        ? new Date(edu.startDate).toLocaleDateString("en-US", {
                            year: "numeric",
                          })
                        : ""}{" "}
                      {edu.endDate && "-"}{" "}
                      {edu.endDate
                        ? new Date(edu.endDate).toLocaleDateString("en-US", {
                            year: "numeric",
                          })
                        : ""}
                      {edu.graduationYear || ""}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium">
                    {edu.institution || "Institution"}
                    {edu.location ? ` | ${edu.location}` : ""}
                  </p>
                  {edu.description && (
                    <p className="mt-1 text-gray-600">{edu.description}</p>
                  )}
                  {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Skills - With improved keyword formatting for ATS */}
      {((resumeData.content.skills?.keywords &&
        resumeData.content.skills.keywords.length > 0) ||
        (resumeData.content.skills?.categories &&
          resumeData.content.skills.categories.length > 0)) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3">
            SKILLS
          </h2>

          {resumeData.content.skills.categories &&
          resumeData.content.skills.categories.length > 0 ? (
            <div className="space-y-3">
              {resumeData.content.skills.categories.map((category, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-gray-800">
                    {category.name || "Category"}
                  </h3>
                  <p className="text-gray-700">
                    {category.skills &&
                      category.skills
                        .map((skill) =>
                          typeof skill === "string" ? skill : skill.name
                        )
                        .join(" • ")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700">
              {resumeData.content.skills.keywords?.join(" • ")}
            </p>
          )}
        </div>
      )}

      {/* Certifications */}
      {Array.isArray(resumeData.content.certifications) &&
        resumeData.content.certifications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3">
              CERTIFICATIONS
            </h2>
            <div className="space-y-3">
              {resumeData.content.certifications.map((cert, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-800">
                      {cert.name || "Certification"}
                    </h3>
                    <span className="text-gray-600 text-sm">
                      {cert.date
                        ? new Date(cert.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                          })
                        : ""}
                    </span>
                  </div>
                  <p className="text-gray-700">{cert.issuer || "Issuer"}</p>
                  {cert.credentialID && (
                    <p className="text-sm text-gray-600">
                      Credential ID: {cert.credentialID}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Languages */}
      {Array.isArray(resumeData.content.languages) &&
        resumeData.content.languages.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3">
              LANGUAGES
            </h2>
            <div className="flex flex-wrap">
              {resumeData.content.languages.map((lang, index) => (
                <div key={index} className="mr-6 mb-2">
                  <span className="font-semibold">
                    {lang.language || "Language"}
                  </span>
                  <span className="text-gray-600">
                    {" "}
                    • {lang.proficiency || "Proficiency"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Projects */}
      {Array.isArray(resumeData.content.projects) &&
        resumeData.content.projects.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3">
              PROJECTS
            </h2>
            <div className="space-y-4">
              {resumeData.content.projects.map((project, index) => (
                <div key={index}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                    <h3 className="font-semibold text-gray-800">
                      {project.title || "Project"}
                    </h3>
                    <span className="text-gray-600 text-sm">
                      {project.startDate
                        ? new Date(project.startDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                            }
                          )
                        : ""}{" "}
                      {project.endDate && "-"}{" "}
                      {project.endDate
                        ? new Date(project.endDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                            }
                          )
                        : project.current
                        ? "Present"
                        : ""}
                    </span>
                  </div>

                  {project.technologies && project.technologies.length > 0 && (
                    <p className="text-sm text-gray-700 italic">
                      Technologies: {project.technologies.join(", ")}
                    </p>
                  )}

                  {project.description && (
                    <p className="mt-1 text-gray-600">{project.description}</p>
                  )}

                  {project.url && (
                    <p className="text-xs text-indigo-600 mt-1">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.url}
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}

// Implement improved versions of other templates
function ModernTemplate({ resumeData }) {
  // Enhanced modern template implementation
  if (!resumeData) return null;

  return (
    <div className="p-8 font-sans">
      {/* Header with colored background */}
      <div className="bg-indigo-700 text-white p-6 rounded-t-md -mx-8 -mt-8 mb-6">
        <h1 className="text-3xl font-bold">
          {resumeData.content.personal?.name || "Your Name"}
        </h1>
        <p className="text-indigo-200 mt-1">
          {resumeData.content.personal?.jobTitle || "Professional Title"}
        </p>

        <div className="flex flex-wrap items-center mt-4 text-sm">
          {resumeData.content.personal?.email && (
            <div className="mr-4 mb-2 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>{resumeData.content.personal.email}</span>
            </div>
          )}
          {resumeData.content.personal?.phone && (
            <div className="mr-4 mb-2 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>{resumeData.content.personal.phone}</span>
            </div>
          )}
          {resumeData.content.personal?.location && (
            <div className="mr-4 mb-2 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{resumeData.content.personal.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Rest of the modern template implementation */}
        <p className="text-gray-500">
          Modern template implementation with enhanced design
        </p>
      </div>
    </div>
  );
}

// You would implement the other templates in a similar fashion
function MinimalTemplate({ resumeData }) {
  return (
    <div className="p-8 font-sans">
      <h1 className="text-3xl font-bold text-gray-900">
        {resumeData.content.personal?.name || "Your Name"}
      </h1>
      <p className="text-gray-500">Enhanced minimal template implementation</p>
    </div>
  );
}

function CreativeTemplate({ resumeData }) {
  return (
    <div className="p-8 font-sans">
      <h1 className="text-3xl font-bold text-purple-600">
        {resumeData.content.personal?.name || "Your Name"}
      </h1>
      <p className="text-gray-500">Enhanced creative template implementation</p>
    </div>
  );
}

function ExecutiveTemplate({ resumeData }) {
  return (
    <div className="p-8 font-sans">
      <h1 className="text-3xl font-bold text-gray-900">
        {resumeData.content.personal?.name || "Your Name"}
      </h1>
      <p className="text-gray-500">
        Enhanced executive template implementation
      </p>
    </div>
  );
}

function TechnicalTemplate({ resumeData }) {
  return (
    <div className="p-8 font-sans">
      <h1 className="text-3xl font-bold text-blue-600">
        {resumeData.content.personal?.name || "Your Name"}
      </h1>
      <p className="text-gray-500">
        Enhanced technical template implementation
      </p>
    </div>
  );
}
