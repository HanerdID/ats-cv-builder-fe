// src/components/builder/ATSAnalyzer.tsx - Enhanced version
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Award,
  ArrowRight,
  Plus,
} from "lucide-react";

export default function ATSAnalyzer({ results, resumeData }) {
  const [showMissingKeywords, setShowMissingKeywords] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [activeTab, setActiveTab] = useState("overview"); // 'overview', 'keywords', 'suggestions'

  if (!results) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No analysis results available</p>
      </div>
    );
  }

  // Determine score color based on value
  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  // Determine score background color
  const getScoreBgColor = (score) => {
    if (score >= 90) return "bg-green-100";
    if (score >= 75) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="space-y-6">
      {/* Tabs Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-4">
          <button
            className={`py-2 px-3 text-sm font-medium ${
              activeTab === "overview"
                ? "border-b-2 border-indigo-500 text-indigo-600"
                : "text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300"
            } transition-colors duration-200`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`py-2 px-3 text-sm font-medium ${
              activeTab === "keywords"
                ? "border-b-2 border-indigo-500 text-indigo-600"
                : "text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300"
            } transition-colors duration-200`}
            onClick={() => setActiveTab("keywords")}
          >
            Keywords
          </button>
          <button
            className={`py-2 px-3 text-sm font-medium ${
              activeTab === "suggestions"
                ? "border-b-2 border-indigo-500 text-indigo-600"
                : "text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300"
            } transition-colors duration-200`}
            onClick={() => setActiveTab("suggestions")}
          >
            Improvement Tips
          </button>
        </nav>
      </div>

      <AnimatePresence mode="wait">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* ATS Score */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      ATS Compatibility Score
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      How well your resume matches the job description
                    </p>
                  </div>
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                      delay: 0.2,
                    }}
                    className={`flex items-center justify-center ${getScoreBgColor(
                      results.lastScore
                    )} rounded-full w-24 h-24 p-2`}
                  >
                    <div className="bg-white rounded-full w-full h-full flex items-center justify-center">
                      <span
                        className={`text-3xl font-bold ${getScoreColor(
                          results.lastScore
                        )}`}
                      >
                        {results.lastScore}%
                      </span>
                    </div>
                  </motion.div>
                </div>

                <div className="mt-6">
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${results.lastScore}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full rounded-full ${
                        results.lastScore >= 90
                          ? "bg-green-500"
                          : results.lastScore >= 75
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    ></motion.div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    {results.lastScore >= 90
                      ? "Excellent! Your resume is highly ATS-compatible and likely to pass through automated screening systems."
                      : results.lastScore >= 75
                      ? "Good. Your resume should pass most ATS systems, but there's room for improvement."
                      : "Your resume needs improvement to effectively pass ATS systems. Follow our suggestions to increase your score."}
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-5 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-green-100 mr-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Matched Keywords
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {results.keywordMatches
                        ? results.keywordMatches.length
                        : 0}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-5 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-red-100 mr-3">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Missing Keywords
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {results.missedKeywords
                        ? results.missedKeywords.length
                        : 0}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-5 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-blue-100 mr-3">
                    <AlertCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Improvement Tips
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {results.suggestions ? results.suggestions.length : 0}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Pass/Fail Status */}
            <div
              className={`p-5 rounded-lg border flex items-center ${
                results.passesATS
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              {results.passesATS ? (
                <>
                  <CheckCircle className="h-8 w-8 text-green-500 mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-green-900 text-lg">
                      Your resume is likely to pass ATS filters
                    </p>
                    <p className="text-green-700">
                      With a score of {results.lastScore}%, your resume is
                      well-optimized for this job description.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="h-8 w-8 text-red-500 mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-900 text-lg">
                      Your resume may not pass ATS filters
                    </p>
                    <p className="text-red-700">
                      Consider implementing the suggestions to improve your
                      score and increase your chances of getting through.
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Keywords Tab */}
        {activeTab === "keywords" && (
          <motion.div
            key="keywords"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Keyword Matches */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Keyword Matches
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Keywords from the job description that appear in your resume
                </p>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {results.keywordMatches &&
                    results.keywordMatches.map((keyword, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1.5 rounded-md"
                      >
                        {keyword}
                      </motion.span>
                    ))}

                  {(!results.keywordMatches ||
                    results.keywordMatches.length === 0) && (
                    <p className="text-gray-500 text-sm">
                      No keyword matches found
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Missing Keywords */}
            {results.missedKeywords && results.missedKeywords.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div
                  className="border-b border-gray-200 px-6 py-4 flex justify-between items-center cursor-pointer"
                  onClick={() => setShowMissingKeywords(!showMissingKeywords)}
                >
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Missing Keywords
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Important keywords from the job description not found in
                      your resume
                    </p>
                  </div>
                  {showMissingKeywords ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>

                <AnimatePresence>
                  {showMissingKeywords && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2">
                          {results.missedKeywords.map((keyword, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-1.5 rounded-md flex items-center"
                            >
                              {keyword}
                              <button className="ml-1 text-red-600 hover:text-red-800">
                                <Plus className="h-3 w-3" />
                              </button>
                            </motion.span>
                          ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-sm text-gray-600">
                            <strong>Pro Tip:</strong> Add these missing keywords
                            to your resume where appropriate to improve your ATS
                            score.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Keyword Stats */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Keyword Analysis
              </h3>
              <div className="flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border-8 border-gray-100 relative flex items-center justify-center">
                  <svg viewBox="0 0 36 36" className="w-full h-full absolute">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="3"
                      strokeDasharray="100, 100"
                    />
                    <motion.path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={results.lastScore >= 75 ? "#10B981" : "#EF4444"}
                      strokeWidth="3"
                      initial={{ strokeDasharray: "0, 100" }}
                      animate={{
                        strokeDasharray: `${
                          results.keywordMatches?.length ||
                          (0 /
                            ((results.keywordMatches?.length || 0) +
                              (results.missedKeywords?.length || 0))) *
                            100
                        }, 100`,
                      }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </svg>
                  <div className="text-center">
                    <p className="text-3xl font-bold">
                      {Math.round(
                        ((results.keywordMatches?.length || 0) /
                          ((results.keywordMatches?.length || 0) +
                            (results.missedKeywords?.length || 0))) *
                          100
                      )}
                      %
                    </p>
                    <p className="text-xs text-gray-500">Keywords</p>
                    <p className="text-xs text-gray-500">found</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-around text-center">
                <div>
                  <p className="text-sm text-gray-500">Found</p>
                  <p className="text-2xl font-bold text-green-600">
                    {results.keywordMatches?.length || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Missing</p>
                  <p className="text-2xl font-bold text-red-600">
                    {results.missedKeywords?.length || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-2xl font-bold">
                    {(results.keywordMatches?.length || 0) +
                      (results.missedKeywords?.length || 0)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Suggestions Tab */}
        {activeTab === "suggestions" && (
          <motion.div
            key="suggestions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Suggestions */}
            {results.suggestions && results.suggestions.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Improvement Suggestions
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Recommendations to improve your ATS score
                  </p>
                </div>

                <div className="p-6">
                  <ul className="space-y-4">
                    {results.suggestions.map((suggestion, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-gray-700">{suggestion}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* General Tips */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-indigo-900 mb-4">
                General ATS Optimization Tips
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-indigo-500 flex-shrink-0" />
                  <span className="ml-2 text-indigo-800">
                    <strong>Use a clean, simple format</strong> - Avoid tables,
                    headers/footers, graphics and columns that ATS may not parse
                    correctly
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-indigo-500 flex-shrink-0" />
                  <span className="ml-2 text-indigo-800">
                    <strong>Include exact keywords</strong> - Match phrases
                    exactly as they appear in the job description
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-indigo-500 flex-shrink-0" />
                  <span className="ml-2 text-indigo-800">
                    <strong>Use standard section headings</strong> -
                    "Experience," "Education," "Skills" instead of creative
                    alternatives
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-indigo-500 flex-shrink-0" />
                  <span className="ml-2 text-indigo-800">
                    <strong>
                      Include both spelled-out and acronym versions
                    </strong>{" "}
                    - E.g., "Search Engine Optimization (SEO)"
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-indigo-500 flex-shrink-0" />
                  <span className="ml-2 text-indigo-800">
                    <strong>Use standard file formats</strong> - PDF and DOCX
                    are generally the most ATS-friendly formats
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
