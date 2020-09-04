import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HNefgB9logyXHwVFZlhL3VlVZsxw08INMbViOEfoB1SLN4AtgcMZOhlMUWi5bAA3AyuwS6Ooi7Jf0ZDV7b4YszA00GHwTpu1W';

    const onToken = (token) => {
        console.log(token);
        alert("Your Payment Was Successful");
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