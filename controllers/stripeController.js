const stripe = require('stripe')(process.env.SECRET_KEY);

const stripeController = async (req, res) => {
    const {purchase, total_amount, shipping_fee} = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(total_amount, shipping_fee),
        currency: 'usd'
    })

    res.json({clientSecret: paymentIntent.client_secret})
}

const calculateOrderAmount = (totalAmount, shipping_fee) => {
    return totalAmount + shipping_fee;
}

module.exports = stripeController;