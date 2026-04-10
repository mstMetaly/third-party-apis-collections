const express = require('express');
const app = express();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

const stripe = require('stripe')(stripeSecretKey);

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/charge', async (req, res) => {
  try {
    const { amount, token } = req.body;

    // Create a charge using Stripe
    const charge = await stripe.charges.create({
      amount: amount, // Amount in cents
      currency: 'usd',
      source: token.id, // Token from the client-side
      description: 'Example Charge',
    });

    // If the charge is successful, send a success response
    res.status(200).json({ message: 'Payment successful!' });
  } catch (error) {
    // If there's an error, send an error response
    res.status(500).json({ error: 'Payment failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
