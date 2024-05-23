import {useState, useEffect} from "react";
import {commerce} from "./library/commerce";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import NavBar from "./components/NavBar";
import Basket from "./components/Basket";
import Checkout from "./components/Checkout";

const App = () => {
  /**
   * Initial state of the products is set to an empty array.
   */
  const [products, setProducts] = useState([]);
  /** Initial state of the basket is set to an empty obeject */
  const [basketData, setBasketData] = useState({});
  const [orderInfo, setOrderInfo] = useState({});
  const [orderError, setOrderError] = useState("");

  /** 
   * The fetchProduct function gets the list of products from the commerce API.
  */
  const fetchProducts = async () => {
    const response = await commerce.products.list();
    setProducts((response && response.data) || []);
  };

  /** This function gets cart-data, which informs about 
   *  whether the cart is empty or not.  */
  const fetchBasketData = async () => {
    const response = await commerce.cart.retrieve();
    setBasketData(response);
  };

  /**
   * Calling the fetchProduct and fetchBasketData function which makes a request as 
   * soon as the website is visted.
   */
  useEffect(() => {
    fetchProducts();
    fetchBasketData();
    
  }, []);

  /** This function calls commerce.cart.add(API) which is a message to add a new product using the productId and quantity. 
   * After a reponse is sent back, the basket is upadated with the new response. 
   */
  async function addProduct(productId, quantity) {
    const response = await commerce.cart.add(productId, quantity);
    setBasketData(response.cart);
  }
  /** This function calls commerce.cart.update(API), which is a message to update the basket with products using the productId and quantity. 
   * After a reponse is sent back, the basket is upadated with the new response.
   */
  async function updateProduct(productId, quantity) {
    const response = await commerce.cart.update(productId, { quantity });
    setBasketData(response.cart);
  }
  /** This function calls commerce.cart.empty(API), which is a messaage to remove all items in the basket.
   * After a response is sent back, the basket is set to the new respinse. 
   */
  async function handleEmptyBasket() {
    const response = await commerce.cart.empty();
    setBasketData(response.cart);
  }

  /** This function calls commerce.cart.remove(API), which is a message to remove an item using ItemId.
   * After a response is sent back, the basket is upadated to the new response. 
   */
  async function removeItemFromBasket(itemId) {
    const response = await commerce.cart.remove(itemId);
    setBasketData(response.cart);
  }

  /**
   * The refreshBasket function refreshes the data of the shopping cart by calling commerce.cart.refresh() method,
   * which retrieves the latest data shopping cart data from the commerce API.
   * The state of the BasketData componet is updated with the new cart data by calling the setBasketData function.
   */
  const refreshBasket = async () => {
    const newBasketData = await commerce.cart.refresh();
    setBasketData(newBasketData);
  }

  
  const handleCheckout = async (checkoutId, orderData) => {
    try{
      setOrderInfo(orderData);

      refreshBasket();
    } catch (error){
      setOrderError(
        (error.data && error.data.error && error.data.error.message) ||
        "An error has occurred."
      );
    }
  };

 
  console.log("basketData ===>>>>>>", basketData);

  return ( 
    <Router>
      <div>
       <NavBar basketItems={basketData.total_items} 
       totalCost={(basketData.subtotal && basketData.subtotal.formatted_with_symbol)}
       />
        <Routes>
          <Route 
            exact path="/" 
            element={<><Products products={products} 
            addProduct={addProduct}/></>} 
          /> 

          <Route 
          exact path="/basket" 
            element={<><Basket basketData={basketData} 
            updateProduct={updateProduct} 
            handleEmptyBasket={handleEmptyBasket} 
            removeItemFromBasket={removeItemFromBasket}/></>} 
          />
          
          <Route exact path="/checkout"
            element={<><Checkout basketData={basketData} 
            handleCheckout={handleCheckout}
            orderInfo={orderInfo}
            orderError={orderError}/></>}
          />
        </Routes>
      </div>
    </Router>
  );
};
   
export default App;
