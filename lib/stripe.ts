import Stripe from "stripe";

console.log(Stripe)
export const stripe = new Stripe(process.env.SECRET_KEY!, {
   
});

console.log('Stripe instance created:', stripe); 