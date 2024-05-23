import {Button} from "@material-ui/core";
import {Elements, CardElement, ElementsConsumer} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

/** The loadStripe method is used to laod the Stripe API using the stripe public key. */
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

/**
 * The Payment class is responsible for rendering the payment component,
 * which alloew the user to input their card details and submit it for processing using the Stripe API.
 */
const Payment = ({ 
  user,
  totalPrice,
  checkoutData,
  handleBackStep,
  handleNextStep,
  handleCheckout,
  
}) => {
  
  /**
   * The handleSubmit funtion takes three parameters, (e), elements and stripe.
   * Firstly e.preventDefault prevents the default form submission on the 'e' event object.
   * The function then checks if both stripe and elements exist. If either are null then the payment process does not go ahead.
   * Following that the element.getElemnet(CardeElement) method retrieves the stripe element for the credit card input field.
   * After that the functions calls the stripe.createPaymentMethod, which specifies the paymnet method type as card.
   * That card is assigned to the cardElement instance.
   */
  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    /**
     * If statment checks if there is an error and if that the case then it logs it to the console.
     * Otherwise an orderData obeject is created which contains information about the payment, shipping, customer, line items and fulfillemnt.
     */
    if (error) {
      console.log("Error =====>>>>", error);
    } else {
      const orderData = {
        payment: {
          gateway: "stripe",
          stripe:{
            payment_method_id: paymentMethod.id,
          },
        },
        shipping:{
          name: "John Doe",
          street: user.address,
          town_city: user.city,
          county_state: user.shippingSubdivision,
          postal_zip_code: user.postcode,
          country: user.shippingCountry,
        },
        customer: {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        },
        line_items: checkoutData.line_items,
        fulfillment: {shipping_method: user.shippingOptions},
        pay_what_you_want: totalPrice,
      };

      handleCheckout(checkoutData.id, orderData);
      handleNextStep(e, "confirmation");
    }
  };
  
  return (
    <>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({elements, stripe}) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement/>
                <div className="actions payment-actions">
                  <Button
                    className="back"
                    variant="outlined"
                    onClick={(e) => handleBackStep(e, "order-details")}
                    >
                      Back
                    </Button>
                    <Button
                      className="next"
                      type="submit"
                      variant="contrained"
                      disabled={!stripe}
                    >
                      Pay{" " + checkoutData.subtotal.formatted_with_symbol}
                    </Button>
                </div>
            </form>
         )}
        </ElementsConsumer>
      </Elements>
      </>
  );
};

export default Payment;