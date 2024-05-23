import{
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Container,
    CardActionArea,
    Button,
} from "@material-ui/core";
import {Link} from "react-router-dom";
import { useState } from "react";
import Banner from "./Banner";
import Spinner from "../Spinner"
import "./style.css";

/** This class is responsible for the display of products in the baskest, 
 * as well as enabling the user to increase and decrease item quantity,
 * remove items and empty the entire basket.
 */
const Basket = ({
    basketData,
    updateProduct,
    handleEmptyBasket,
    removeItemFromBasket,
}) => { 
   
    const [showSpinner, setShowSpinner]= useState(true);
     /** The function works by displaying a spinnner and after two seconds, 
      * the funtion checks to see if there is any data being loaded. 
      * This activates the next line of code following this funtion which loads the products. 
      * However, if there are no products to be loaded then the funtion loads the banner,
      * which displays a text and a button. 
      */
    const loading = () => {
        setTimeout(() => {
            setShowSpinner(false);
        }, 2000);
        if (showSpinner) {
            return <Spinner/>;
        }
        return <Banner/> 
    };

    /** Checks if there is any data to be loaded. If yes, then the products are displayed.*/
    if (!basketData.line_items || basketData.line_items.length === 0)
    return <Banner/>;
  return (
    <Container id ="basket">
        <Grid container justify="center" spacing={4}>
            {basketData.line_items.map((product) => {
                return (
                    /** Grid allows the display of products to be adjust according to screen size. */
                    <Grid key ={product.id} item xs={12} sm={6} md={4}>
                        <Card className="custom-card">
                            <CardActionArea>
                                {/** The display of the product-card with the product image, 
                                 * as well as product name being displayed when hovering over the product card.
                                 */}
                                <CardMedia
                                    component="img"
                                    alt="Shoe"
                                    height="260"
                                    className="card-image"
                                    image={product.image.url}
                                    title={product.name}
                                />

                                {/** The dispplay of product name. */}
                              <CardContent className="card-content">
                                <Typography
                                    className="title"
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                >
                                    {product.name}
                                </Typography>
                              </CardContent>
                            </CardActionArea>

                            {/** The display of product price. */}
                           <CardActions>
                            <Typography
                                className="basket-item-price"
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                {product.price.formatted_with_symbol}
                            </Typography>
                           </CardActions>

                            {/** Upon clicked this button removes a product from the basket */}
                           <CardActions className="actions-content">
                            <Button
                                className="remove-product"
                                size="small"
                                variant="outlined"
                                onClick={() => {
                                removeItemFromBasket(product.id)
                             }}
                             >
                                Remove
                            </Button>
                            <>

                             {/** This button allows users to increase product quantity by 1. */}
                            <Button 
                                className="increase-product-quantity"
                                size="small"
                                variant="outlined"
                                onClick={() => {
                                    updateProduct(product.id, product.quantity +1);
                                }}
                            >
                                +
                            </Button>

                            {/** The display of quantity of items.
                             * The button is responsible for allowing the user to decrease the quantity of items by 1.*/}
                            <Typography className="text">&nbsp;{product.quantity}&nbsp;</Typography>
                            <Button
                                className="decrease-product-quantity"
                                size="small"                        
                                variant="outlined"
                                onClick={() => {
                                    updateProduct(product.id, product.quantity -1);
                                }}
                                >
                                    -
                            </Button>
                                </>
                           </CardActions>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>

         {/** The "empty basket" button which upon clicked enables the user to remove all itens in the basket*/}
        <div className="actions">
            <Button className="buttonEmpty"
                size="small"
                variant="contained"
                onClick={handleEmptyBasket}
            >
                Empty Basket
            </Button>

            {/** The checkout buttton which upon clicked will take the user to the checkout page */}
            <Button className="buttonCheckout"
            size="small"
            variant="contained"
            component={Link}
            to="/checkout"
            >
                Checkout
            </Button>
        </div>
    </Container>
  );   
};

export default Basket