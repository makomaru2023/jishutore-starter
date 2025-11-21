import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY is not set in .env.local');
    process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const plans = [
    {
        name: 'Basic Plan',
        description: '無料40点を一気に使える基本パック',
        amount: 980,
    },
    {
        name: 'Pro Plan',
        description: 'Basicの40点＋別種60点で合計100点の実用パック',
        amount: 1980,
    },
    {
        name: 'Premium Plan',
        description: '200点＋以降の新作優先追加の最上位パック',
        amount: 2980,
    },
];

async function main() {
    console.log('Starting to create Stripe products...');

    for (const plan of plans) {
        try {
            // Create Product
            const product = await stripe.products.create({
                name: plan.name,
                description: plan.description,
            });

            // Create Price
            const price = await stripe.prices.create({
                product: product.id,
                unit_amount: plan.amount,
                currency: 'jpy',
            });

            console.log(`Created ${plan.name}:`);
            console.log(`  Product ID: ${product.id}`);
            console.log(`  Price ID: ${price.id}`);
            console.log('-------------------');
        } catch (error) {
            console.error(`Error creating ${plan.name}:`, error);
        }
    }
}

main();
