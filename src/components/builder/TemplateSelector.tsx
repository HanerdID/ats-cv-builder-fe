// src/components/builder/TemplateSelector.tsx
"use client";

import { motion } from "framer-motion";

const templates = [
  {
    id: "professional",
    name: "Professional",
    description: "Clean and traditional format for corporate environments",
    thumbnail: "/templates/professional.png",
  },
  {
    id: "modern",
    name: "Modern",
    description:
      "Contemporary design with a perfect balance of creativity and professionalism",
    thumbnail: "/templates/modern.png",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple, elegant design that lets your content shine",
    thumbnail: "/templates/minimal.png",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design for creative industries",
    thumbnail: "/templates/creative.png",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated design for senior professionals",
    thumbnail: "/templates/executive.png",
  },
  {
    id: "technical",
    name: "Technical",
    description: "Optimized for technical roles with skills-focused layout",
    thumbnail: "/templates/technical.png",
  },
];

export default function TemplateSelector({ selected, onChange }) {
  return (
    <div className="space-y-4">
      {templates.map((template) => (
        <motion.div
          key={template.id}
          whileHover={{ scale: 1.02 }}
          className={`border rounded-md p-3 cursor-pointer transition-colors ${
            selected === template.id
              ? "border-indigo-500 bg-indigo-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => onChange(template.id)}
        >
          <div className="flex items-center">
            <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center mr-4">
              {template.thumbnail ? (
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="h-10 w-10 object-cover"
                />
              ) : (
                <span className="text-xs text-gray-400">Preview</span>
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{template.name}</h3>
              <p className="text-xs text-gray-500 line-clamp-1">
                {template.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
