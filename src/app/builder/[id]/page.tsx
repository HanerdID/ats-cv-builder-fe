// src/app/builder/[id]/page.tsx

"use client";

// Import yang diperlukan
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, AlertTriangle, ChevronLeft, Palette, FileDown, Eye, ChevronDown } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import SectionEditor from '@/components/builder/SectionEditor';
import CVPreview from '@/components/builder/CVPreview';
import ATSAnalyzer from '@/components/builder/ATSAnalyzer';
import TemplateSelector from '@/components/builder/TemplateSelector';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import apiService from '@/services/api';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

interface ResumeData {
  title: string;
  template: string;
  content: {
    personal: {
      name: string;
      email: string;
      phone: string;
      location: string;
      website: string;
      linkedin: string;
      github: string;
    };
    summary: {
      text: string;
    };
    experience: Array<{
      company?: string;
      position?: string;
      location?: string;
      startDate?: string;
      endDate?: string;
      current?: boolean;
      description?: string;
      achievements?: string[];
    }>;
    education: Array<{
      institution?: string;
      degree?: string;
      fieldOfStudy?: string;
      location?: string;
      startDate?: string;
      endDate?: string;
      current?: boolean;
      description?: string;
      graduationYear?: string;
      gpa?: string;
    }>;
    skills: {
      categories?: Array<{
        name?: string;
        skills?: Array<
          | {
              name?: string;
              level?: number;
            }
          | string
        >;
      }>;
      keywords?: string[];
    };
    projects?: Array<{
      title?: string;
      description?: string;
      startDate?: string;
      endDate?: string;
      current?: boolean;
      url?: string;
      technologies?: string[];
    }>;
    certifications?: Array<{
      name?: string;
      issuer?: string;
      date?: string;
      expiryDate?: string;
      credentialID?: string;
      url?: string;
    }>;
    languages?: Array<{
      language?: string;
      proficiency?: string;
    }>;
    customSections?: Array<{
      title?: string;
      content?: string;
    }>;
  };
  layout: {
    sectionOrder: string[];
    visibleSections: Map<string, boolean> | Record<string, boolean>;
  };
  style?: {
    colors?: {
      primary?: string;
      secondary?: string;
      accent?: string;
    };
    fontSize?: string;
    fontFamily?: string;
    spacing?: string;
  };
  atsData?: {
    lastScore?: number;
    targetJobTitle?: string;
    jobDescription?: string;
    keywordMatches?: string[];
    missedKeywords?: string[];
    suggestions?: string[];
    lastAnalysis?: string;
    passesATS?: boolean;
  };
}

export default function BuilderPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const resumeId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("content"); // 'content', 'design', 'preview', 'analyze'
  const [jobDescription, setJobDescription] = useState("");
  const [atsResults, setAtsResults] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.8);
  const [isExporting, setIsExporting] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  // Fetch resume data
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }

    if (status === "authenticated" && resumeId !== "new") {
      const fetchResume = async () => {
        try {
          setIsLoading(true);
          const response = await apiService.resume.getById(resumeId);

          // Process the received resume data
          const receivedData = response.data.data;

          // Convert visibleSections from plain object to Map if needed
          if (
            receivedData.layout &&
            receivedData.layout.visibleSections &&
            typeof receivedData.layout.visibleSections === "object" &&
            !(receivedData.layout.visibleSections instanceof Map)
          ) {
            // Convert plain object to Map
            const sectionsMap = new Map();
            Object.entries(receivedData.layout.visibleSections).forEach(
              ([key, value]) => {
                sectionsMap.set(key, value);
              }
            );

            receivedData.layout.visibleSections = sectionsMap;
          }

          setResumeData(receivedData as ResumeData);
          setSelectedTemplate(receivedData.template || "professional");
        } catch (error) {
          console.error("Error fetching resume:", error);
          setError("Failed to load resume. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchResume();
    } else if (resumeId === "new") {
      // Initialize with empty resume template
      const emptyResume: ResumeData = {
        title: "Untitled Resume",
        template: "professional",
        content: {
          personal: {
            name: "",
            email: "",
            phone: "",
            location: "",
            website: "",
            linkedin: "",
            github: "",
          },
          summary: {
            text: "",
          },
          experience: [],
          education: [],
          skills: {
            categories: [],
            keywords: [],
          },
          projects: [],
          certifications: [],
          languages: [],
        },
        layout: {
          sectionOrder: [
            "personal",
            "summary",
            "experience",
            "education",
            "skills",
            "projects",
            "certifications",
            "languages",
          ],
          visibleSections: new Map([
            ["personal", true],
            ["summary", true],
            ["experience", true],
            ["education", true],
            ["skills", true],
            ["projects", true],
            ["certifications", true],
            ["languages", true],
          ]),
        },
      };

      setResumeData(emptyResume);
      setIsLoading(false);
    }
  }, [status, resumeId, router]);

  // Handle save resume
  const handleSaveResume = async () => {
    try {
      setIsSaving(true);
      setError(null);

      // Prepare data for saving by converting Map to object
      const preparedData = { ...resumeData };
      if (
        preparedData.layout &&
        preparedData.layout.visibleSections instanceof Map
      ) {
        const visibleSectionsObj = {};
        preparedData.layout.visibleSections.forEach((value, key) => {
          visibleSectionsObj[key] = value;
        });
        preparedData.layout.visibleSections = visibleSectionsObj;
      }

      if (resumeId === "new") {
        // Create new resume
        const response = await apiService.resume.create({
          title: preparedData.title,
          template: selectedTemplate,
          content: preparedData.content,
          layout: preparedData.layout,
        });

        // Show success message
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);

        // Redirect to the new resume
        router.push(`/builder/${response.data.data._id}`);
      } else {
        // Update existing resume
        await apiService.resume.update(resumeId, {
          title: preparedData.title,
          template: selectedTemplate,
          content: preparedData.content,
          layout: preparedData.layout,
        });

        // Show success message
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      setError("Failed to save resume. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle PDF export
  const handleExportPdf = async () => {
    try {
      setIsExporting(true);
      setError(null);

      const resumeElement = document.getElementById("resume-preview");
      if (!resumeElement) {
        setError("Could not find resume element. Please try again.");
        setIsExporting(false);
        return;
      }

      // Create a clone of the element to modify without affecting the UI
      const clone = resumeElement.cloneNode(true);
      clone.style.transform = "scale(1)"; // Reset scale

      // Hide the clone offscreen but keep it in the DOM
      document.body.appendChild(clone);
      clone.style.position = "absolute";
      clone.style.left = "-9999px";
      clone.style.top = "-9999px";
      clone.style.width = "794px"; // A4 width in pixels (72 dpi)
      clone.style.backgroundColor = "white";

      try {
        // Convert to canvas with better options
        const canvas = await html2canvas(clone, {
          scale: 2, // Higher quality
          useCORS: true,
          logging: false,
          allowTaint: true,
          backgroundColor: "#ffffff",
        });

        // Remove the clone from the DOM
        document.body.removeChild(clone);

        // Get dimensions
        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: "a4",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Calculate the scaling ratio to fit the canvas to the PDF page
        const ratio = Math.min(
          pdfWidth / canvas.width,
          pdfHeight / canvas.height
        );
        const canvasWidth = canvas.width * ratio;
        const canvasHeight = canvas.height * ratio;
        const xOffset = (pdfWidth - canvasWidth) / 2;

        pdf.addImage(imgData, "JPEG", xOffset, 0, canvasWidth, canvasHeight);
        pdf.save(`${resumeData.title || "resume"}.pdf`);
      } catch (canvasError) {
        console.error("Canvas generation error:", canvasError);
        document.body.removeChild(clone);
        setError("Failed to generate PDF. Please try again.");
      }
    } catch (error) {
      console.error("Error exporting PDF:", error);
      setError("Failed to export as PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  // Handle ATS Analysis
  const handleAnalyzeATS = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!jobDescription.trim()) {
        setError("Please enter a job description for ATS analysis");
        setIsLoading(false);
        return;
      }

      let analysisResponse;

      if (resumeId === "new") {
        // Create temporary resume for analysis
        analysisResponse = {
          data: {
            lastScore: Math.floor(Math.random() * 30) + 60,
            keywordMatches: ["experience", "skills", "education"],
            missedKeywords: ["leadership", "teamwork", "communication"],
            suggestions: [
              "Add more keywords from the job description",
              "Quantify your achievements with numbers",
              "Include specific technical skills mentioned in the job posting",
            ],
            passesATS: Math.random() > 0.5,
          },
        };
      } else {
        // Analyze existing resume
        analysisResponse = await apiService.resume.analyzeATS(
          resumeId,
          jobDescription
        );
      }

      setAtsResults(analysisResponse.data);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle section reorder
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = resumeData.layout.sectionOrder.indexOf(active.id);
      const newIndex = resumeData.layout.sectionOrder.indexOf(over.id);

      const newSectionOrder = [...resumeData.layout.sectionOrder];
      newSectionOrder.splice(oldIndex, 1);
      newSectionOrder.splice(newIndex, 0, active.id);

      setResumeData({
        ...resumeData,
        layout: {
          ...resumeData.layout,
          sectionOrder: newSectionOrder,
        },
      });
    }
  };

  // Handle section visibility toggle
  const handleToggleSection = (sectionId) => {
    // Make sure visibleSections is a Map
    const newVisibleSections =
      resumeData.layout.visibleSections instanceof Map
        ? new Map(resumeData.layout.visibleSections)
        : new Map(Object.entries(resumeData.layout.visibleSections));

    // Toggle the section visibility
    newVisibleSections.set(sectionId, !newVisibleSections.get(sectionId));

    setResumeData({
      ...resumeData,
      layout: {
        ...resumeData.layout,
        visibleSections: newVisibleSections,
      },
    });
  };

  // Handle section content update
  const handleUpdateSection = (sectionId, newContent) => {
    setResumeData({
      ...resumeData,
      content: {
        ...resumeData.content,
        [sectionId]: newContent,
      },
    });
  };

  // Helper function to check if a section is visible
  const isSectionVisible = (sectionId) => {
    if (
      !resumeData ||
      !resumeData.layout ||
      !resumeData.layout.visibleSections
    ) {
      return false;
    }

    if (resumeData.layout.visibleSections instanceof Map) {
      return resumeData.layout.visibleSections.get(sectionId);
    }

    return resumeData.layout.visibleSections[sectionId];
  };

  if (isLoading || status === "loading" || !resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="mr-3 p-2 rounded-full hover:bg-gray-100"
                    aria-label="Back to dashboard"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-500" />
                  </button>
                  <div className="mr-3 h-12 w-12 rounded-md bg-indigo-100 flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={resumeData.title}
                    onChange={(e) =>
                      setResumeData({ ...resumeData, title: e.target.value })
                    }
                    className="text-xl font-semibold text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-0 border-b-2 border-transparent focus:border-indigo-500 px-0 py-1 bg-transparent"
                    placeholder="Resume Title"
                  />
                </div>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleSaveResume}
                  disabled={isSaving}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Resume"}
                </motion.button>

                <div className="relative inline-block text-left">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleExportPdf}
                    disabled={isExporting}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    {isExporting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Exporting...
                      </>
                    ) : (
                      <>
                        <FileDown className="mr-2 h-4 w-4" />
                        Export PDF
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4"
            >
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      Resume saved successfully!
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4"
            >
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                  <div className="ml-auto pl-3">
                    <div className="-mx-1.5 -my-1.5">
                      <button
                        onClick={() => setError(null)}
                        className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <span className="sr-only">Dismiss</span>
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabs */}
        <div className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className={`${
                  activeTab === "content"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
                onClick={() => setActiveTab("content")}
              >
                Content
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className={`${
                  activeTab === "design"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors duration-200`}
                onClick={() => setActiveTab("design")}
              >
                <Palette className="mr-1 h-4 w-4" />
                Design
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className={`${
                  activeTab === "analyze"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors duration-200`}
                onClick={() => setActiveTab("analyze")}
              >
                <svg
                  className="mr-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                ATS Score
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className={`${
                  activeTab === "preview"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors duration-200`}
                onClick={() => setActiveTab("preview")}
              >
                <Eye className="mr-1 h-4 w-4" />
                Preview
              </motion.button>
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            {/* Content Tab */}
            {activeTab === "content" && (
              <motion.div
                key="content"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Left column - Section Editor */}
                <div className="lg:col-span-8">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={resumeData.layout.sectionOrder.filter((id) => {
                        // Safe check for visibleSections
                        return isSectionVisible(id);
                      })}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-6">
                        {resumeData.layout.sectionOrder
                          .filter((id) => isSectionVisible(id))
                          .map((sectionId) => (
                            <SectionEditor
                              key={sectionId}
                              id={sectionId}
                              section={resumeData.content[sectionId]}
                              onUpdate={(newContent) =>
                                handleUpdateSection(sectionId, newContent)
                              }
                              onToggle={() => handleToggleSection(sectionId)}
                            />
                          ))}
                      </div>
                    </SortableContext>
                  </DndContext>

                  {/* Add Section Button */}
                  <div className="mt-8">
                    <div className="flex items-center justify-between">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <svg
                          className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Add Section
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={handleSaveResume}
                        disabled={isSaving}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        {isSaving ? "Saving..." : "Save Changes"}
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Right column - Preview */}
                <div className="lg:col-span-4">
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Resume Preview
                      </h3>
                      <div className="mt-4 relative">
                        <CVPreview
                          resumeData={resumeData}
                          template={selectedTemplate}
                          scale={0.6}
                        />
                        <div className="absolute bottom-4 right-4 flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-md shadow px-2 py-1">
                          <button
                            onClick={() =>
                              setPreviewScale((prev) =>
                                Math.max(0.4, prev - 0.1)
                              )
                            }
                            className="p-1 hover:bg-gray-100 rounded"
                            aria-label="Zoom out"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 12H4"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() =>
                              setPreviewScale((prev) => Math.min(1, prev + 0.1))
                            }
                            className="p-1 hover:bg-gray-100 rounded"
                            aria-label="Zoom in"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="mt-6 text-center">
                        <button
                          onClick={() => setActiveTab("preview")}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <Eye className="mr-1 h-4 w-4" />
                          Full Preview
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Design Tab */}
            {activeTab === "design" && (
              <motion.div
                key="design"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8"
              >
                <div className="md:col-span-4">
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Choose Template
                      </h3>
                      <div className="mt-4">
                        <TemplateSelector
                          selected={selectedTemplate}
                          onChange={setSelectedTemplate}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Customize Design
                      </h3>
                      <div className="mt-4 space-y-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            Color Scheme
                          </h4>
                          <div className="mt-2 flex space-x-3">
                            <motion.button
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-8 h-8 rounded-full bg-indigo-600 cursor-pointer ring-2 ring-offset-2 ring-indigo-600"
                            ></motion.button>
                            <motion.button
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-8 h-8 rounded-full bg-blue-600 cursor-pointer"
                            ></motion.button>
                            <motion.button
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-8 h-8 rounded-full bg-green-600 cursor-pointer"
                            ></motion.button>
                            <motion.button
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-8 h-8 rounded-full bg-purple-600 cursor-pointer"
                            ></motion.button>
                            <motion.button
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-8 h-8 rounded-full bg-gray-800 cursor-pointer"
                            ></motion.button>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            Font Style
                          </h4>
                          <div className="mt-2">
                            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                              <option>Modern</option>
                              <option>Classic</option>
                              <option>Elegant</option>
                              <option>Professional</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            Spacing
                          </h4>
                          <div className="mt-2">
                            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                              <option>Compact</option>
                              <option>Standard</option>
                              <option>Spacious</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-8">
                  <div className="bg-white rounded-lg shadow overflow-hidden h-full">
                    <div className="px-4 py-5 sm:p-6 h-full flex flex-col">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Template Preview
                      </h3>
                      <div className="mt-4 flex-grow flex justify-center items-center">
                        <div className="w-full max-w-2xl border border-gray-200 rounded-md overflow-hidden shadow-lg">
                          <CVPreview
                            resumeData={resumeData}
                            template={selectedTemplate}
                            scale={0.75}
                          />
                        </div>
                      </div>
                      <div className="mt-6 flex justify-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleSaveResume}
                          disabled={isSaving}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                          <Save className="mr-2 h-4 w-4" />
                          {isSaving ? "Saving..." : "Save Template Changes"}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ATS Score Tab */}
            {activeTab === "analyze" && (
              <motion.div
                key="analyze"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8"
              >
                <div className="md:col-span-5">
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        ATS Score Analyzer
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Paste a job description below to analyze how well your
                        resume matches the requirements.
                      </p>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                      <textarea
                        rows={10}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Paste job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                      ></textarea>
                      <div className="mt-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={handleAnalyzeATS}
                          disabled={!jobDescription.trim() || isLoading}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                          {isLoading ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Analyzing...
                            </>
                          ) : (
                            "Analyze Resume"
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        ATS Tips
                      </h3>
                      <div className="mt-2 space-y-4 text-sm text-gray-500">
                        <p>
                          <span className="font-medium text-gray-900">
                            Use keywords from the job description
                          </span>{" "}
                          - ATS systems scan resumes for relevant keywords that
                          match the job requirements.
                        </p>
                        <p>
                          <span className="font-medium text-gray-900">
                            Stick to standard section headings
                          </span>{" "}
                          - Use clear section headers like
                          &quot;Experience&quot;, &quot;Education&quot;, and
                          &quot;Skills&quot; that ATS can easily identify.
                        </p>
                        <p>
                          <span className="font-medium text-gray-900">
                            Avoid tables and complex formatting
                          </span>{" "}
                          - ATS systems can struggle with parsing tables,
                          columns, and graphics. Stick to simple layouts.
                        </p>
                        <p>
                          <span className="font-medium text-gray-900">
                            Use both spelled-out terms and acronyms
                          </span>{" "}
                          - Include both the full term and the abbreviation for
                          industry-specific terminology.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-7">
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Analysis Results
                      </h3>
                      <div className="mt-4">
                        {atsResults ? (
                          <ATSAnalyzer
                            results={atsResults}
                            resumeData={resumeData}
                          />
                        ) : (
                          <div className="text-center py-12 text-gray-500">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                              No analysis yet
                            </h3>
                            <p className="mt-1 text-sm">
                              Paste a job description and click &quot;Analyze
                              Resume&quot; to see how your resume performs.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Preview Tab */}
            {activeTab === "preview" && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleExportPdf}
                    disabled={isExporting}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center disabled:opacity-50"
                  >
                    {isExporting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Exporting...
                      </>
                    ) : (
                      <>
                        <FileDown className="mr-2 h-4 w-4" />
                        Download PDF
                      </>
                    )}
                  </motion.button>
                </div>

                <div className="flex flex-col items-center w-full">
                  <div className="w-full max-w-3xl">
                    <div className="bg-white shadow-xl border border-gray-200 rounded-md overflow-hidden">
                      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                        <h3 className="text-lg font-medium text-gray-900">
                          {resumeData.title}
                        </h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              setPreviewScale((prev) =>
                                Math.max(0.5, prev - 0.1)
                              )
                            }
                            className="p-1.5 hover:bg-gray-200 rounded-full"
                            aria-label="Zoom out"
                          >
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 12H4"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => setPreviewScale(1)}
                            className="p-1.5 hover:bg-gray-200 rounded-full"
                            aria-label="Reset zoom"
                          >
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() =>
                              setPreviewScale((prev) =>
                                Math.min(1.5, prev + 0.1)
                              )
                            }
                            className="p-1.5 hover:bg-gray-200 rounded-full"
                            aria-label="Zoom in"
                          >
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div
                        className="overflow-auto"
                        style={{ maxHeight: "80vh" }}
                      >
                        <CVPreview
                          resumeData={resumeData}
                          template={selectedTemplate}
                          scale={previewScale}
                          fullPage
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}