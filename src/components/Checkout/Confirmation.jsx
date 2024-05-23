import {Button, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

/**
 * The Confirmation function takes two parameters, orderInfo and orderError.
 * If orderError is false, then a confirmation message is rendered with a button which leads back to the homepage.
 * However if orderError is true, then an error message is rendered with a button which leads back to homepage.
 * The confirmation component is rendered, after the payment form has been submitted.
 */
const Confirmation = ({orderInfo, orderError}) => {
  if(orderError){
    return (
      <div className="confirmation">
        <Typography variant="h5"> Error: {orderError} </Typography>
        <Button component={Link} variant="outlined" type="button" to="/">
          Back To Home
        </Button>
      </div>
    );
  }
  return (
    <div className="confirmation">
      <Typography variant="h5">
        Thank you {orderInfo.customer.firstname + " " + orderInfo.customer.lastname + " for your order!"}
     </Typography>
     <Button component={Link} variant="contained" type="button" to="/">
     Continue shopping
     </Button>
    </div>
  );
};


export default Confirmation;