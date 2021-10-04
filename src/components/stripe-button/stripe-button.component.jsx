import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  // Stripe takes price in cents
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51JgvxtBtM67ThOqsaXsWNBWkKY86FSiCcRqX5TLeIr7shDvjKnVV9A1eHvKJYNayE9N6u3AJhHp7BGmaFSwtjUap00Wcnn9WFT";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='FireSale'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
