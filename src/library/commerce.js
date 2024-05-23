import Commerce from '@chec/commerce.js';

/*This functioanlity allows access to the commercejs API. 
 * It gets a seceret key from the .env file for access to commercejs.
 */
export const commerce = new Commerce(
    process.env.REACT_APP_CHEC_PUBLIC_KEY,
    true
);