import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HNefgB9logyXHwVFZlhL3VlVZsxw08INMbViOEfoB1SLN4AtgcMZOhlMUWi5bAA3AyuwS6Ooi7Jf0ZDV7b4YszA00GHwTpu1W';

    const onToken = (token) => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment was successful');
        }).catch(err => {
            console.log("Payment error " + JSON.parse(err));
            alert('There was an issue with your Payment! Please make sure to use provided Credit Card');
        })
    }

    return (
        <StripeCheckout 
            label="Pay Now"
            name="PB Clothing"
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your Total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    );
}

export default StripeCheckoutButton;