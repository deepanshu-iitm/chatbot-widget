import { RESPONSES } from '../constants';

export const getResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  // Check for features
  if (message.includes('feature') || message.includes('capabilities') || message.includes('what can you do') || message.includes('what do you offer')) {
    return RESPONSES.features;
  }
  
  // Check for pricing
  if (message.includes('pricing') || message.includes('price') || message.includes('cost') || message.includes('plan') || message.includes('how much')) {
    return RESPONSES.pricing;
  }
  
  // Check for demo
  if (message.includes('demo') || message.includes('trial') || message.includes('test')) {
    return RESPONSES.demo;
  }
  
  // Check for support
  if (message.includes('support') || message.includes('help') || message.includes('issue') || message.includes('problem') || message.includes('contact')) {
    return RESPONSES.support;
  }
  
  // Greetings
  if (message.includes('hello') || message.includes('hi ') || message === 'hi' || message.includes('hey')) {
    return "Hello! How can I assist you today?";
  }
  
  // Thank you
  if (message.includes('thank') || message.includes('thanks')) {
    return "You're welcome! Is there anything else I can help you with?";
  }
  
  // Yes/No responses
  if (message === 'yes' || message === 'yeah' || message === 'sure') {
    return "Great! What specific information would you like to know?";
  }
  
  if (message === 'no' || message === 'nope') {
    return "No problem! Let me know if you need anything else.";
  }
  
  // Default response
  return RESPONSES.default;
};
