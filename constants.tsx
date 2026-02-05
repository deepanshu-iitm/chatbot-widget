
import React from 'react';
import { QuickReply } from './types';

export const INITIAL_QUICK_REPLIES: QuickReply[] = [
  { id: '1', label: 'Feature Tour', value: 'Tell me about your features' },
  { id: '2', label: 'Pricing Plans', value: 'What are your pricing options?' },
  { id: '3', label: 'Book a Demo', value: 'I want to book a demo' },
  { id: '4', label: 'Support', value: 'I need technical support' },
];

export const ICONS = {
  Send: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
  ),
  Close: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  Minimize: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
  ),
  Bot: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
  ),
  Chat: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
  )
};

// Hardcoded responses for common queries
export const RESPONSES: Record<string, string> = {
  features: "Our platform offers:\n\n• Real-time collaboration tools\n• AI-powered task prioritization\n• Seamless integrations with popular tools\n• Advanced analytics and reporting\n• Customizable workflows\n\nWould you like to know more about any specific feature?",
  
  pricing: "We offer flexible pricing plans:\n\n• Starter Plan: $29/month - Perfect for small teams\n• Professional Plan: $79/month - For growing businesses\n• Enterprise Plan: Custom pricing - Tailored solutions\n\nAll plans include a 14-day free trial. Would you like to start your trial?",
  
  demo: "I'd be happy to help you schedule a demo! To get started, I'll need a few details from you. May I have your name?",
  
  support: "I'm here to help! You can reach our support team:\n\n• Email: support@company.com\n• Live Chat: Available 24/7\n• Phone: +1 (555) 123-4567\n\nWhat issue are you experiencing?",
  
  default: "I'm here to help! I can assist you with:\n\n• Product features and capabilities\n• Pricing information\n• Scheduling a demo\n• Technical support\n\nWhat would you like to know more about?"
};

export const SYSTEM_INSTRUCTION = `
You are a helpful, professional customer support assistant.
Your goals:
1. Answer questions about product features, pricing, and support.
2. Be concise and friendly.
3. If a user expresses interest in a demo or pricing, gently mention that you can help gather their details.
4. If asked about something unrelated to business, politely steer them back.
5. Do not use markdown headers (#), keep it readable in a small chat bubble.
`;
