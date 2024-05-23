import { Container, Paper, Typography, CircularProgress, Step, Stepper, StepLabel} from "@material-ui/core";
import { useState, useEffect, useRef } from "react";
import { commerce } from "../../library/commerce";
import {renderRelatedComponents} from "./CheckoutComponents";
import "./style.css";


/**
 * The function convertObjectArray takes an object of countries as a parameter. 
 * The function converts the object into an array of objects with the properties code and 
 * name where each object in the array represents a country in the input countries object.
 */
const convertObjectToArray = (countries) => 
  Object.entries(countries || {}).map(([code, name]) => ({code, name}));

const usePreviousState = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

/**
 * The Checkout function takes in four props, basketData, handleCheckout, orderInfo and orderError. 
 * The component defines a local state variable called user using the useState hook, 
 * which is an array that contains serveral key-value pairs representing various user information fields.
 * The initial values of these fields are all set to empty strings or empty objects. 
 */
const Checkout = ({basketData, handleCheckout, orderInfo, orderError}) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postCode: "",
    shippingOption: {},
    shippingOptions: [],
    shippingCountry: {},
    shippingCountries: [],
    shippingSubdivision: {},
    shippingSubdivisions: [],
  });

  
  const [checkoutData, setCheckoutData] = useState({});
  const previousShippingCountry = usePreviousState(user.shippingCountry);
  const previousShippingSubdivision = usePreviousState(user.shippingSubdivision);
  const [bookingStep, setBookingStep] = useState("order-address");
  const steps = ["order-address", "order-details", "order-payment"];
  /**
   * The handleChange function takes an event object e as a parameter.
   * This function allows the component to dynamically update the user state object,
   * as the user inputs information into the text fields on the form. 
   * The setUser() function takes in a new state object that is created using the spread operator (...),
   * to copy over all of the existing key-value pairs in the user object.
   * After, the name property is updated with the new value entered by the user.
   */
  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({...user,[name]: value});
  };

  /**
   * The handleSelectChange function takes in two parameters, an event(e) and state. 
   * The (e) is the change of event which is triggeed when a select input element is changed by the user. 
   * The state represents the state property that needs to be updated based on the users selection. 
   * If the state parameter is shippingOptions, then the function updates the user's shippingOptions property with the selected value.
   * Otherwise, the function updates the user's state with a new object that has the updated property value, 
   * by spreading the user object and updating the name property with an object that has the name and code properties. 
   */
  const handleSelectChange = (e, state) => {
    const {name, value} = e.target;
    if(state === "shippingOptions"){
      setUser({
        ...user,
        shippingOptions: {
          id: value,
        },
      });
    } else {
      setUser({
        ...user,
       [name]: {
        name: user[state].find((country) => country.code === value).name,
        code: value,
      },
      });
    }
  };

  /**
   * The handleSubmit function takes an event parameter (e) and is called when the form is submitted. 
   * The e.preventDefault method is called to prevent the default behavior of the form submission, which would normally cause the page to reload or redirect. 
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingStep("order-details");
  };

/**
 * The generateToken function uses the commerce.checkout.generateToken method to generate a checkout token for the basketData.id. 
 * The result is then set in the state using the setCheckoutData function. 
 * If there is an error during the process of generating a token, an error message is logged to the console using console.error method.
 */
  useEffect(() => {
    if (basketData.id) {
      const generateToken = async () => {
        try{ 
          const response = await commerce.checkout.generateToken(
            basketData.id,
            {
              type: "cart",
            }
          );
          setCheckoutData(response);
        } catch (error) {
          console.error("Checkout error: ", error);
        }
      };
      generateToken();
    }
  }, [basketData]); 

  /**
   * The fetchShippinhgCountries function uses the commerce.services.localeListShippingCountries() method to fetch a list of shipping countries. 
   * The result is converted from an object to an array using the convertObejctToArray function.
   * After the setUser function is called to update the state with the new list of shipping countries. 
   * If statement checks if the user.shippingCountries array is empty and if checkout.id exists. 
   * If true, then the fetchShippingCountries function is called to fetch the shipping countires. 
   */
   useEffect(() => {
    const fetchShippingCountries = async () => {
      const {countries} = await commerce.services.localeListShippingCountries(
        checkoutData.id
      );
      const FormattedCountries = convertObjectToArray(countries);

      setUser({
        ...user,
        shippingCountries: FormattedCountries,
        shippingCountry: FormattedCountries[FormattedCountries.length -1],
      });
    };
    if (!user.shippingCountries.length && checkoutData.id){
      fetchShippingCountries();
    }
  }, [user, checkoutData]);
 
  /**
   * The fetchSubdivison function uses the commerce.services.localeListSubdivisions() method to fecth a list of subdivisions for the specified country.
   * After, the convertObjectToArray() function converts the result from an object to an array.
   * The setuser function is then called to update the state with the new list of subdivisions.
   * The if statement checks whether the user's shippingCountry has a code, as well as if the shippingSubdivisions array is empty. 
   * If true of if the previousShippingCountry code does not match the user's shippingCountry code, 
   * then the fetchSubdivisions function is called to fetch the subdivisions of the specified country code.
   */
  useEffect(() => {
    const fetchSubdivisions = async (countryCode) => {
      const {subdivisions} = await commerce.services.localeListSubdivisions(
        countryCode
      );
      const shippingSubdivisions = convertObjectToArray(subdivisions);
      setUser({
        ...user,
        shippingSubdivisions,
        shippingSubdivision: shippingSubdivisions[0],
      });
    };

  if (
    (user.shippingCountry.code && !user.shippingSubdivisions.length) || 
    (previousShippingCountry && previousShippingCountry.code !== user.shippingCountry.code)
    )
    fetchSubdivisions(user.shippingCountry.code);
  }, [user, previousShippingCountry]);

    /**
     * The fetchShippingOptions function takes in three parameters, checkoutDataId, country, and stateProvince. 
     * This function calls the commerce.checkout.getShippingOptions method to retrieve the available shipping options.
     * The shipping options are then added to the user state using the setUser function.
     */
    useEffect(() => {
    const fetchShippingOptions = async (
      checkoutDataId,
      country, 
      stateProvince = null 
    ) => {
      const options = await commerce.checkout.getShippingOptions(
        checkoutDataId,
        {
          country,
          region: stateProvince,
        }
      );

      setUser({
        ...user,
        shippingOptions: options, 
        shippingOption: {id: options[0].id},
      });
    };

    /**
     * 
     * This section of code checks for changes in the user object's shippingSubdivision property 
     * and the previousShippingSubdivision object's code property. 
     * If these properties change, the hook fetches shipping options using the fetchShippingOptions function.
     * There are two conditions to the if statement. 
     * The first checks whether the user obeject has a shippingSubdivion.code property and if the shippingOptions array is empty. 
     * The seconds checks if previousShippingSubdivision exists and whether its code property is different from the current value of the user.shippingSubdivision.code.
     */
    if(
      (user.shippingSubdivision.code && !user.shippingOptions.length)|| 
      (previousShippingSubdivision && 
        previousShippingSubdivision.code !== user.shippingSubdivision.code)
    )

        fetchShippingOptions(
          checkoutData.id, 
          user.shippingCountry.code,
          user.shippingSubdivision.code
        );
      }, [
        user,
        checkoutData.id,
        user.shippingCountry.code,
        user.shippingSubdivision,
        previousShippingSubdivision
      ]); 

      /**
       * The handleNextStep function takes two parameters, 
       * 'e' an event object and step which is used to set the state vlaue of bookingStep. 
       * This function is used to handle the multi-step CheckoutForm such that when the user
       * clicks next, the checkout component is rerendered to display the next stage of the checkout process.
       */
      const handleNextStep =(e, step) => {
        e.preventDefault();
        setBookingStep(step);
      };

      /**
       * The handleBackStep function takes two parameters, 
       * 'e' an event object and step which is used to set the state vlaue of bookingStep. 
       * This function is used to handle the multi-step CheckoutForm such that when the user
       * clicks back, the checkout component is rerendered to display the previous stage of the checkout process.
       */
       const handleBackStep =(e, step) => {
        e.preventDefault();
        setBookingStep(step);
      };

  /**
   * Implemented an if statement which checks for the existence of shipping subdivisions, 
   * shipping countries, shipping options and checkout data. 
   * if any of these datas are missing, the component returns a spinner instead of the checkout-form page. 
   */
  if( 
    !user.shippingSubdivisions.length ||
    !user.shippingCountries.length ||
    !user.shippingOptions.length ||
    !checkoutData
  ) {
    return(
      <div className="checkout">
        <Container>
          <Paper className="paper" elevation={3}>
            <div className="products-spinner">
              <CircularProgress/>
            </div>
          </Paper>
        </Container>
      </div>
    );
  }

  return(
    <div className="checkout">
      <Container>
        <Paper className= "paper" elevation={10}>
          <Typography align="center" variant="h5" gutterBottom>
            Checkout
          </Typography>
          {bookingStep !== "confirmation" && (
            <Stepper
            className="stepper"
            activeStep={steps.indexOf(bookingStep)}
            >
              {steps.map((label) => (
                <Step key ={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          )}
            {renderRelatedComponents({
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
            })}
        </Paper>
      </Container>
    </div>
  );
};

export default Checkout;
