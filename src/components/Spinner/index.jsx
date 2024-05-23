import { CircularProgress } from "@material-ui/core";
import "./style.css";

/** A circular spinner that is shown on the basket page to imitate loading, 
 * which is used in a funtion in the basket class. 
 */
const Spinner = () => (
  <div className="spinner">
    <CircularProgress/>
  </div>
);

export default Spinner;
