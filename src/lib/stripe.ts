import Stripe from 'stripe';

console.log('STRIPE_SECRET_KEY desde stripe.ts:', process.env.STRIPE_SECRET_KEY);



export const stripe = new Stripe("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");

export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';