import Stripe from 'stripe';



export const stripe = new Stripe("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");

export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';