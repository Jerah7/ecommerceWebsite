import { Container, Typography, Button, Grid } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./style.css";

/** This class is responsible for displaying text, 
 * when the basket is empty with a button to take the user to the homepage.
 * It is also within a grid, to scale the size of the text depending on screen size. 
 */
const Banner = () => {
    return ( 
        <div className = "basket-banner">
            <Container>
                <Grid container spacing = { 4 }>
                    <Grid  item xs = { 12 } sm={ 6 }>
                        <Typography className = "title" variant = "h1">
                            Basket is empty, press Shop to go shopping. 
                        </Typography> 
                        <Button className = "shop" component = { Link }to = "/">
                        Shop 
                        </Button> 
                    </Grid> 
                    <Grid className ="icon" item xs= { 12 } sm= { 6 }>
                        <ShoppingCart/>
                    </Grid> 
                </Grid> 
            </Container> 
        </div>
    );
};

export default Banner;