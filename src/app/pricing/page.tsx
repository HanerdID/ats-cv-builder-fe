// src/app/pricing/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const tiers = [
  {
    name: 'Free',
    id: 'free',
    price: { monthly: 0, annually: 0 },
    description: 'Basic features for students and occasional job seekers',
    features: [
      'Create 1 resume',
      '3 ATS-friendly templates',
      'Basic ATS score analysis',
      'PDF export',
      'Email support',
    ],
    notIncluded: [
      'Advanced ATS keyword optimization',
      'Multiple resume versions',
      'Cover letter builder',
      'Premium templates',
      'Priority support',
    ],
    cta: 'Sign up for free',
    mostPopular: false,
  },
  {
    name: 'Premium',
    id: 'premium',
    price: { monthly: 9.99, annually: 7.99 },
    description: 'Everything you need for a successful job search',
    features: [
      'Create unlimited resumes',
      'All 15+ ATS-friendly templates',
      'Advanced ATS score analysis',
      'Export in multiple formats (PDF, DOCX, TXT)',
      'Job description keyword matcher',
      'Cover letter builder',
      'Multiple resume versions',
      'Priority email support',
    ],
    notIncluded: [
      'Resume review by HR professionals',
      'Industry-specific recommendations',
      'Phone support',
    ],
    cta: 'Start 7-day free trial',
    mostPopular: true,
  },
  {
    name: 'Professional',
    id: 'professional',
    price: { monthly: 19.99, annually: 16.99 },
    description: 'Professional tools for career advancement',
    features: [
      'All Premium features',
      'Resume review by HR professionals',
      'Industry-specific keyword recommendations',
      'LinkedIn profile optimization',
      'Interview preparation kit',
      'Personal career coach',
      'Phone and email support',
      'Custom branding',
    ],
    notIncluded: [],
    cta: 'Start 7-day free trial',
    mostPopular: false,
  },
];

// FAQ data
const faqs = [
  {
    question: 'Can I cancel my subscription at any time?',
    answer:
      'Yes, you can cancel your subscription at any time. If you cancel, you will be able to use your subscription until the end of your current billing period.',
  },
  {
    question: 'Is there a free trial for paid plans?',
    answer:
      'All paid plans come with a 7-day free trial. You will not be charged until the trial period ends, and you can cancel anytime before then.',
  },
  {
    question: 'How does the ATS score analysis work?',
    answer:
      'Our ATS score analyzer uses advanced algorithms to evaluate your resume against industry-standard ATS systems. It checks for keyword matching, format compatibility, and other critical factors that affect whether your resume passes through ATS filters.',
  },
  {
    question: 'Can I switch between plans?',
    answer:
      'Yes, you can upgrade or downgrade your subscription at any time. If you upgrade, the new price will be prorated for the remainder of your billing period. If you downgrade, the new price will take effect at the start of your next billing period.',
  },
  {
    question: 'Do you offer discounts for students?',
    answer:
      'Yes, we offer a 50% discount on all paid plans for students with a valid .edu email address. Contact our support team to apply for the student discount.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and Apple Pay.',
  },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('monthly');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Simple, Transparent Pricing
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
                Choose the plan that is right for your job search needs, with no hidden fees.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          {/* Billing toggle */}
          <div className="flex justify-center mb-12">
            <div className="relative bg-white p-1 rounded-full flex">
              <button
                type="button"
                className={`${
                  billingPeriod === 'monthly'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700'
                } relative rounded-full py-2 px-6 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 transition-colors duration-200`}
                onClick={() => setBillingPeriod('monthly')}
              >
                Monthly billing
              </button>
              <button
                type="button"
                className={`${
                  billingPeriod === 'annually'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700'
                } ml-1 relative rounded-full py-2 px-6 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 transition-colors duration-200`}
                onClick={() => setBillingPeriod('annually')}
              >
                Annual billing
                <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {tiers.map((tier) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`relative h-full rounded-lg bg-white shadow-sm overflow-hidden border ${
                  tier.mostPopular ? 'border-indigo-600' : 'border-gray-200'
                }`}
              >
                {tier.mostPopular && (
                  <div className="absolute top-0 left-0 right-0 py-1.5 bg-indigo-600 text-white text-xs font-semibold text-center uppercase tracking-wide">
                    Most Popular
                  </div>
                )}
                <div className={`p-6 ${tier.mostPopular ? 'pt-10' : ''}`}>
                  <h2 className="text-lg font-semibold text-gray-900">{tier.name}</h2>
                  <p className="mt-1 text-sm text-gray-600">{tier.description}</p>
                  <div className="mt-4 flex items-baseline text-gray-900">
                    <span className="text-4xl font-extrabold tracking-tight">
                      ${billingPeriod === 'monthly' ? tier.price.monthly : tier.price.annually}
                    </span>
                    <span className="ml-1 text-xl font-semibold">/{billingPeriod === 'monthly' ? 'mo' : 'mo'}</span>
                  </div>
                  {billingPeriod === 'annually' && tier.price.annually > 0 && (
                    <p className="mt-1 text-sm text-green-600">
                      Billed ${(tier.price.annually * 12).toFixed(2)}/year
                    </p>
                  )}
                  
                  <div className="mt-6">
                    <button
                      className={`w-full rounded-md py-3 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        tier.mostPopular
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
                          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 focus:ring-indigo-500'
                      }`}
                    >
                      {tier.cta}
                    </button>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-900">What is included:</h3>
                    <ul className="mt-2 space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <Check className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                          <span className="ml-2 text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {tier.notIncluded.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-gray-900">Not included:</h3>
                      <ul className="mt-2 space-y-3">
                        {tier.notIncluded.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <X className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            <span className="ml-2 text-sm text-gray-500">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Enterprise Section */}
          <div className="mt-16 bg-indigo-50 rounded-2xl overflow-hidden shadow-lg">
            <div className="p-6 sm:p-10">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-indigo-900">Enterprise Plan</h3>
                  <p className="mt-1 text-indigo-700">For organizations with multiple hiring managers and recruiters.</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm">
                    Contact sales
                  </button>
                </div>
              </div>
              <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-2">
                <div>
                  <h4 className="text-lg font-medium text-indigo-900">Custom features for your team</h4>
                  <ul className="mt-4 space-y-4">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      <span className="ml-2 text-indigo-700">Customized branding and templates</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      <span className="ml-2 text-indigo-700">Advanced analytics and reporting</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      <span className="ml-2 text-indigo-700">Bulk resume management</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      <span className="ml-2 text-indigo-700">Integration with your ATS system</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-indigo-900">Enterprise support</h4>
                  <ul className="mt-4 space-y-4">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      <span className="ml-2 text-indigo-700">Dedicated account manager</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      <span className="ml-2 text-indigo-700">Priority 24/7 support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      <span className="ml-2 text-indigo-700">Regular training sessions</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      <span className="ml-2 text-indigo-700">Custom SLAs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQs */}
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Frequently asked questions
          </h2>
          <div className="mt-12">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">
              {faqs.map((faq) => (
                <motion.div 
                  key={faq.question}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <dt className="text-lg font-medium text-gray-900">{faq.question}</dt>
                  <dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
          <div className="mt-12 text-center">
            <p className="text-base text-gray-600">
              Have more questions? Contact our{' '}
              <a href="/contact" className="font-medium text-indigo-600 hover:text-indigo-500">
                customer support team
              </a>
              .
            </p>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-indigo-700">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to boost your career?</span>
              <span className="block text-indigo-200">Get started with ResumeATS today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="/auth/register"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  Get started
                </a>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <a
                  href="/templates"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600"
                >
                  Browse templates
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}