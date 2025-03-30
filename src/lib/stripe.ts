import Stripe from 'stripe';

console.log('STRIPE_SECRET_KEY desde stripe.ts:', process.env.STRIPE_SECRET_KEY);



export const stripe = new Stripe("sk_test_51R87obQO2yiuJACC6d6Q1OXeYN58NInDdrxuZ7tbF0mgh8bVwlKm6AiwVcpnBs8QV0KGojT4wme91koKApV3lowL00I6f1adTg");

export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';