import {List, ListItem, Button, Typography, ListItemText,} from "@material-ui/core";

/**
 * OrderDetails is a component of the checkout which takes in three properties, checkoutData, handleBackStep and handleNextStep.
 * It returns a list which contains one ListItem for each item in the line_items array of the checkoutData property. 
 * Each ListItem displays the name of the item and its quantity using ListItemText.
 * ListItem also displays total of the item, which is retrieved from the line_total property of the item object in the checkoutData property.
 */
const OrderDetails = ({checkoutData, handleBackStep, handleNextStep}) => (
  <>
  <List>
    {checkoutData.line_items.map((item) => (
      <ListItem key={item.id}>
        <ListItemText
        primary={item.name}
        secondary={`Quantity: ${item.quantity}`}
        />
        <Typography variant="body2">
          {item.line_total.formatted_with_symbol}
        </Typography>
      </ListItem>
    ))}
    <ListItem>
      <ListItemText primary="Total price"/>
      <Typography variant="body2">
        {checkoutData.subtotal.formatted_with_code}
      </Typography>
    </ListItem>
  </List>
  
{/** 
  * The back button on this page takes the user to the previous page, which renders the CheckoutForm.
  */}
  <div className="actions">
    <Button
    className="back"
    size="medium"
    onClick={(e) => handleBackStep(e, "order-address")}
    variant="contained"
    >
      Back
    </Button>
    
    {/**
     * The next button advances the user in the checkout process, by taking them to the payment page.
     */}
    <Button
    className="next"
    onClick={(e) => handleNextStep(e, "order-payment")}
    size="medium"
    variant="contained"
    >
      Next
    </Button>
  </div>
  </>
);

export default OrderDetails;