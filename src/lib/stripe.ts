import Stripe from 'stripe';



export const stripe = new Stripe("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");

export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';