import{Grid, Container} from "@material-ui/core"
import Product from "../Product";

const Products = ({products, addProduct}) => {
   console.log("products ===", products);

   return (
      <div> 
         
         <Container id="products">
            <Grid container spacing={4}>
               {products.map((product) => {

               /**
                * A grid system, which changes the amount of products 
                * shown depending on the size of the screen.
                * 
                * Added a key property as it used to 
                * correctly link the component to the DOM element in react
                */
               
               return (
               <Grid key ={product.id} item xs={12} sm={6} md={4}> 
               <Product product={product} addProduct={addProduct} key={product.id}/>;
            </Grid>
            );
            })}
            </Grid>
         </Container>
      </div>
   );
};

export default Products;