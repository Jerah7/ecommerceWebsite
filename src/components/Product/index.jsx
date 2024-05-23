import {
    Card,
    CardActions,
    CardActionArea, 
    CardContent,
    CardMedia, 
    Button, 
    Typography,
} from "@material-ui/core";
import {ShoppingCart} from "@material-ui/icons";
import "./style.css";

/** 
 * This class retrieves product data such as image, name and price,
 * which is to be displayed on the card component.
 * Card component called Product that takes a 
 * product elemnet or item which comes from the product component. 
 * Also the addProduct function will allow products to be added to cart. 
 */
const Product = ({product, addProduct }) => (
    <Card className ="custom-card">
      <CardActionArea>
        <CardMedia
          component ="img"
          alt ="Shoes"
          height ="260"
          className="card-image"
          /** This retrieves the product image */
          image={product.image.url}
          title = {product.name}
        />
        {/** This retrieves the product name */}
        <CardContent className ="content">
          <Typography className ="title" gutterBottom variant="h5" component="h2">
            {product.name} 
          </Typography> 
          </CardContent>
      </CardActionArea>

      <CardActions className = "actions-content">
        <>
        {/** This retrieves the product price */}
        <Typography className = "price" gutterBottom variant="h5" component="h2">
          {product.price.formatted_with_symbol} 
        </Typography>
        
        {/** Add-to-basket button which calls the addProduct function, 
         * which takes one product and adds it to the basket */}
        <Button size="large" 
        className = "custom-button"
        onClick={() => {
            addProduct(product.id, 1); 
        }}
        >
        <ShoppingCart/> Add to basket
        </Button>
        </>
      </CardActions>
    </Card>
);

export default Product;
