import CheckoutForm from "./CheckoutForm";
import Confirmation from "./Confirmation";
import OrderDetails from "./OrderDetails";
import Payment from "./Payment";
/**
 * This class with the use of switch cases renders checkout components,
 * depending on the stage of the checkout process.
 */
export const renderRelatedComponents = ({
  user,
  orderInfo,
  orderError,
  bookingStep,
  handleChange,
  handleSubmit,
  checkoutData,
  handleBackStep,
  handleNextStep,
  handleCheckout,
  handleSelectChange,
}) => {
  /**
   * The first case of the switch statment evaluates the value of the bookingStep variable.
   * If value of the bookingStep is order-address, it will render the CheckoutForm component.
   * This compononet part of the checkout, allows the user to fill out a form with their personal details before proceeding to order details.
   */
  switch (bookingStep){
    case "order-address":
      return (
        <CheckoutForm
          user={user} 
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          />
      );

    /**
     * This case evaluates the value of the bookingStep variable.
     * If value of the bookingStep is order-details, it will render the OrderDetails component.
     * This compononet part of the checkout, allows the user to review their order details before proceeding to payment.
     */
    case "order-details":
    return (
      <OrderDetails
      user={user}
      checkoutData={checkoutData}
      handleBackStep={handleBackStep}
      handleNextStep={handleNextStep}
      handleCheckout={handleCheckout}
      />
    );
    
    /**
     * This case evaluates the value of the bookingStep variable.
     * If value of the bookingStep is order-payment, it will render the Payment component.
     * This compononet will allow the user to input their card details and pay for the products.
     */
    case "order-payment":
      return (
        <Payment
        user={user}
        checkoutData={checkoutData}
        handleBackStep={handleBackStep}
        handleNextStep={handleNextStep}
        handleCheckout={handleCheckout}
        />
      );

      case "confirmation":
        return <Confirmation orderInfo={orderInfo} orderError={orderError}/>;

    default:
    return null;
  }
};