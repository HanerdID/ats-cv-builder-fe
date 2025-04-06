// src/app/page.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, FileCheck, Award, Clock, User, Search, ChevronRight } from 'lucide-react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    // Rotate templates
    const intervalId = setInterval(() => {
      setActiveTemplate((prev) => (prev + 1) % templates.length);
    }, 3000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(intervalId);
    };
  }, []);

  const templates = [
    {
      name: "Professional",
      image: "globe.svg",
      description: "Clean, traditional layout perfect for corporate roles",
    },
    {
      name: "Modern",
      image: "globe.svg",
      description:
        "Contemporary design with balanced creativity and professionalism",
    },
    {
      name: "Creative",
      image: "globe.svg",
      description:
        "Bold design that stands out while maintaining ATS compatibility",
    },
    {
      name: "Minimal",
      image: "globe.svg",
      description: "Simple, elegant design that lets your content shine",
    },
  ];

  const features = [
    {
      title: "ATS-Optimized Templates",
      description:
        "Designed specifically to pass through Applicant Tracking Systems with proper formatting and keywords.",
      icon: <FileCheck className="h-10 w-10 text-indigo-500" />,
    },
    {
      title: "Real-time ATS Score",
      description:
        "Get instant feedback on how well your resume matches job descriptions with our AI-powered analyzer.",
      icon: <Award className="h-10 w-10 text-indigo-500" />,
    },
    {
      title: "Quick & Easy",
      description:
        "Create a professional, ATS-friendly resume in minutes with our intuitive drag-and-drop builder.",
      icon: <Clock className="h-10 w-10 text-indigo-500" />,
    },
    {
      title: "Personalized Templates",
      description:
        "Choose from multiple professionally designed templates and customize colors, fonts, and layouts.",
      icon: <User className="h-10 w-10 text-indigo-500" />,
    },
    {
      title: "Keyword Optimization",
      description:
        "Match your resume with job descriptions to include the right keywords for higher match rates.",
      icon: <Search className="h-10 w-10 text-indigo-500" />,
    },
    {
      title: "Instant PDF Export",
      description:
        "Download your resume as a perfectly formatted PDF with just one click.",
      icon: <FileCheck className="h-10 w-10 text-indigo-500" />,
    },
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      title: "Software Engineer",
      content:
        "I got interviews at 3 tech companies after optimizing my resume with this tool. The ATS score analyzer showed me exactly what keywords I was missing!",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sarah Williams",
      title: "Marketing Manager",
      content:
        "After using the ATS CV Generator, my application response rate jumped from 10% to over 60%. The templates are professional and the ATS tips were invaluable.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Michael Chen",
      title: "Data Scientist",
      content:
        "As someone who struggled with resume formatting, this tool was a game-changer. My resume now passes through ATS systems and actually gets seen by recruiters.",
      image: "https://randomuser.me/api/portraits/men/36.jpg",
    },
  ];

  const stats = [
    { value: "93%", label: "ATS pass rate" },
    { value: "2X", label: "Interview chances" },
    { value: "5 min", label: "Average creation time" },
    { value: "10K+", label: "Happy users" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-white">
      {/* Header/Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold text-indigo-600 flex items-center"
              >
                <svg
                  className="h-8 w-8 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M7 8H17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M7 12H17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M7 16H13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                ResumeATS
              </motion.span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href="/templates"
                  className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-md hover:bg-indigo-50"
                >
                  Templates
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/pricing"
                  className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-md hover:bg-indigo-50"
                >
                  Pricing
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-md hover:bg-indigo-50"
                >
                  Blog
                </Link>
              </motion.div>
            </nav>
            <div className="flex items-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href="/auth/login"
                  className="text-indigo-600 hover:text-indigo-800 transition-colors font-medium mr-4"
                >
                  Log in
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/auth/register"
                  className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  Sign up
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="py-16 sm:py-24 relative overflow-hidden"
        ref={containerRef}
      >
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="grid"
                width="200"
                height="200"
                x="50%"
                y="-1"
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              strokeWidth="0"
              fill="url(#grid)"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
              >
                <span className="block">Create ATS-Optimized</span>
                <span className="block text-indigo-600">
                  Resumes in Minutes
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 text-xl text-gray-500"
              >
                Beat the applicant tracking systems with our smart CV builder.
                Create professional, ATS-friendly resumes that get you more
                interviews.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-10 sm:flex sm:justify-center lg:justify-start gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/builder/new"
                    className="flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors duration-300 shadow-md"
                  >
                    Build My Resume
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/templates"
                    className="flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 sm:mt-0 transition-colors duration-300"
                  >
                    View Templates
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative mx-auto w-full rounded-lg shadow-xl lg:max-w-md overflow-hidden"
              >
                <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                  <div className="h-[450px] bg-indigo-50 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTemplate}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full relative"
                      >
                        <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                          ATS-Optimized
                        </div>

                        {templates[activeTemplate].image ? (
                          <div className="w-full h-full relative">
                            <Image
                              src={templates[activeTemplate].image}
                              alt={`${templates[activeTemplate].name} template`}
                              fill
                              style={{ objectFit: "contain" }}
                              priority
                            />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full w-full">
                            <span className="text-gray-500">
                              Resume Preview
                            </span>
                          </div>
                        )}

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-900/80 to-transparent p-4 text-white">
                          <p className="font-medium text-lg">
                            {templates[activeTemplate].name}
                          </p>
                          <p className="text-indigo-100 text-sm">
                            {templates[activeTemplate].description}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Template selector dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {templates.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTemplate(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        activeTemplate === index
                          ? "bg-white"
                          : "bg-white/50 hover:bg-white/70"
                      }`}
                      aria-label={`View template ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ATS Score Badge */}
        <motion.div
          className="absolute top-32 right-1/4 transform translate-x-1/2 bg-white shadow-lg rounded-lg px-5 py-3 flex items-center space-x-2 border border-gray-200 z-10 hidden lg:flex"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{ y, opacity }}
        >
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-6 h-6 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              ATS Score: 94%
            </p>
            <p className="text-xs text-gray-500">
              Optimized for job applications
            </p>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl font-extrabold text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-base font-medium text-indigo-100">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
            >
              Why Choose ResumeATS?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto"
            >
              Our platform is designed to help you create resumes that pass
              through ATS filters and impress recruiters.
            </motion.p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="pt-6"
                >
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg transform -translate-y-1/2">
                          {feature.icon}
                        </span>
                      </div>
                      <h3 className="mt-2 text-lg font-medium text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="mt-3 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Create an ATS-optimized resume in just three simple steps
            </p>
          </motion.div>

          <div className="mt-16">
            <div className="max-w-5xl mx-auto relative">
              {/* Connection line */}
              <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-indigo-200 -translate-y-1/2 hidden md:block"></div>

              <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                {/* Step 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.1 }}
                  className="relative"
                >
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 h-full">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl mb-4 mx-auto md:mx-0 relative z-10">
                      1
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2 text-center md:text-left">
                      Choose a Template
                    </h3>
                    <p className="text-gray-500 text-center md:text-left">
                      Select from our professionally designed, ATS-optimized
                      resume templates.
                    </p>
                  </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 h-full">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl mb-4 mx-auto md:mx-0 relative z-10">
                      2
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2 text-center md:text-left">
                      Fill Your Information
                    </h3>
                    <p className="text-gray-500 text-center md:text-left">
                      Add your experience, skills, and education with our
                      easy-to-use builder.
                    </p>
                  </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.3 }}
                  className="relative"
                >
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 h-full">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl mb-4 mx-auto md:mx-0 relative z-10">
                      3
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2 text-center md:text-left">
                      Download & Apply
                    </h3>
                    <p className="text-gray-500 text-center md:text-left">
                      Export your ATS-optimized resume and start landing more
                      interviews.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link
                  href="/builder/new"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Our Users Say
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Success stories from job seekers who used our ATS-optimized resume
              builder
            </p>
          </motion.div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative"
                >
                  <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                    <svg
                      width="104"
                      height="104"
                      viewBox="0 0 104 104"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24.84 79V61.12L36.04 42.2H50.48L39.28 61.12H45.64V79H24.84ZM67.9036 79V61.12L79.1036 42.2H93.5436L82.3436 61.12H88.7036V79H67.9036Z"
                        fill="#E0E7FF"
                      />
                    </svg>
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                        />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900">
                          {testimonial.name}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600">{testimonial.content}</p>
                    <div className="mt-4 flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ATS Tips Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Top ATS Resume Tips
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Maximize your chances of getting past automated screening systems
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-indigo-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">
                  Use Relevant Keywords
                </h3>
              </div>
              <p className="text-gray-600">
                Include industry-specific keywords and phrases that match the
                job description. Our ATS analyzer helps identify these keywords
                automatically.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-indigo-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">
                  Use Standard Headings
                </h3>
              </div>
              <p className="text-gray-600">
                Stick to conventional section titles like "Experience,"
                "Education," and "Skills" that ATS systems can easily recognize
                and parse.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-indigo-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">
                  Keep It Simple
                </h3>
              </div>
              <p className="text-gray-600">
                Avoid complex formatting, tables, and graphics that can confuse
                ATS systems. Our templates are designed with clean, ATS-friendly
                layouts.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-indigo-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">
                  Use Both Acronyms & Full Terms
                </h3>
              </div>
              <p className="text-gray-600">
                Include both the spelled-out version and acronyms for important
                terms (e.g., "Search Engine Optimization (SEO)") to maximize
                keyword matching.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-indigo-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">
                  File Format Matters
                </h3>
              </div>
              <p className="text-gray-600">
                Submit your resume as a PDF to preserve formatting while
                ensuring compatibility with most ATS systems. Our tool creates
                perfect PDF exports.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-indigo-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">
                  Quantify Achievements
                </h3>
              </div>
              <p className="text-gray-600">
                Use numbers and percentages to highlight your accomplishments.
                ATS systems and hiring managers both respond well to specific,
                measurable results.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to boost your career?</span>
              <span className="block text-indigo-200">
                Get started with ResumeATS today.
              </span>
            </h2>
            <p className="mt-4 text-lg text-indigo-100">
              Create an ATS-optimized resume in minutes and start landing more
              interviews.
            </p>
          </motion.div>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 lg:ml-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 shadow-md"
                >
                  Get started
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/templates"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 shadow-md"
                >
                  Browse templates
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                Product
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    href="/features"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/templates"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Templates
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                Support
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    href="/help"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                Company
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                Legal
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-base text-gray-400">
              &copy; 2025 ResumeATS. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}