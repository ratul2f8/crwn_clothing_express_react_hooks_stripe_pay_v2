import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_yNt8LJimDDRqlJBVwC5hGrYi00LW7kOEMy';

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'post',
      data:{
        amount: priceForStripe,
        token
      }
    })
    .then(reponse => {
      alert("Payment is successful");
    })
    .catch(err => {
      console.log("Payment error : ", JSON.parse(err));
      alert("Payment error happenned")
    })
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
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
