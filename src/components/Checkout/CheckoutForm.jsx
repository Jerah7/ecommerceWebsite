import {
  Grid,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import {Link} from "react-router-dom";

/**
 * The CheckoutForm Class
 * Its created with a form which has the elments of allowing users to input details and select inputs for the checkout-form.
 * After a user inputs for example their name and email, handleChange is called which updates the state value. 
 * When a user clicks next the handleSubmit function is called, which collects the checkout-form data and submits the data to the server.
 * When the user selects an input on the checkout-form, handleSelectChange updates the state value.
 */
const CheckoutForm = ({
  user = {},
  handleChange,
  handleSubmit,
  handleSelectChange,
}) => (

   /** 
    * onSubmit of the form, handleSubmit will be called which collects the checkout-form data and submits it to the server.
    * autoComplete is set to off to prevent the browser from displaying previous inputs by the user in text fields. 
    * The next lines of comments will be related to all textfields on the checkout-form.
    * The grid changes the display of items by width depending on screen size.
    * The text field allows the user to enter their first name, last name, email and address, 
    * which is then handled by handleChnage to update the input state value. 
    * Required is a property that sets the text field as required and this is marked by an asterix on the checkout-form.
    */
    <form onSubmit={handleSubmit} autoComplete="off">
      <Grid container spacing = {4}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="first-name"
            name="firstname"
            label="First Name"
            defaultValue={user.firstName}
            onChange={handleChange}
            />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="last-name"
            name="lastname"
            label="Last Name"           
            defaultValue={user.lastName}
            onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              type="email"
              label="Email"
              value ={user.email}
              onChange={handleChange}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="address"
              name="address"
              label="Address line 1"  
              value={user.address}
              onChange={handleChange}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="city"
              name="city"
              label="City"
              value ={user.city}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="post-code"
              name="postCode"            
              value ={user.postCode}
              onChange={handleChange}
              label="Zip / Postal Code"
            />
          </Grid>

         {/** 
           * The next lines of comments will be related to all select inputs.
           * The select element allows for the user to have multiple selection options to choose from, 
           * such as countries, subdivisions(counties) and shipping options.
           */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="shipping-country-select-label">
                Shipping Country
              </InputLabel>
              <Select
              required
              name="shippingCountry"
              id="shipping-country-select"
              value={user.shippingCountry.code || ""} 
              labelId="shipping-country-select-label"
              onChange={(e) => handleSelectChange(e, "shippingCountries")}
              >
               {/** For each country object in the user.shippingCountries array, 
                 * a new MenuItem component is created with two properties, key and value. 
                 * The key property is set to the country.code value, which is used by React to efficiently render and update a list of components. 
                 * The value property is also set to the country.code value, which will be used to store the selected value when the MenuItem is clicked. 
                 * The text inside MenuItem is the country.name property which is displayed as the label for the menu item.
                 * As a result the MenuItem components will display the name of each country in the dropdown menu. 
                 */}
                {user.shippingCountries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="shipping-subdivision-select-label">
                Shipping Subdivision
              </InputLabel>
              <Select
                required
                name="shippingSubdivision"
                id="shipping-subdivision-select"
                labelId="shipping-subdivision-select-label"
                value={user.shippingSubdivision.code || ""}
                onChange={(e) => handleSelectChange(e, "shippingSubdivisions")}
                >
                  {/** For each country object in the user.shippingSubdivisions array, 
                 * a new MenuItem component is created with two properties, key and value. 
                 * The key property is set to the subdivision.code value, which is used by React to efficiently render and update a list of components. 
                 * The value property is also set to the subdivision.code value, which will be used to store the selected value when the MenuItem is clicked. 
                 * The text inside MenuItem is the subdivision.name property which is displayed as the label for the menu item.
                 * As a result the MenuItem components will display the name of each subdivision in the dropdown menu. 
                 */}
                  {user.shippingSubdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.code} value={subdivision.code}>
                    {subdivision.name}
                  </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="shipping-options-select-label">
                Shipping Options
              </InputLabel>
              <Select
              required
              name="shippingOptions"
              value={user.shippingOption.id || ""}
              id="shipping-options-select"
              labelId="shipping-options-select-label"
              onChange={(e) => handleSelectChange(e, "shippingOptions")}
              >
                 {/** For each country object in the user.shippingOptions array, 
                 * a new MenuItem component is created with two properties, key and value. 
                 * The key property is set to the option.id value, which is used by React to efficiently render and update a list of components. 
                 * The value property is also set to the option.id value, which will be used to store the selected value when the MenuItem is clicked. 
                 * The text inside MenuItem is a string that concatenates the option.description property with the formatted price of the option.price property.
                 * As a result the MenuItem components will display the description and price of each shipping option in the dropdown menu.
                 */}
                {user.shippingOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {`${option.description} - (${option.price.formatted_with_symbol})`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
      </Grid>
      
     {/** 
       * The back-button takes the user to the basket page, whiles the next-button takes the user 
       * to the next page and calls the handleSubmit funtion.
       */}
      <div className="actions">
        <Button className="back" size="medium" to="/basket" component={Link} variant="contained">
          Back
        </Button>
        <Button className="next" type="submit" size="medium" variant="contained">
          Next
        </Button>
      </div>
   </form>
); 

export default CheckoutForm;