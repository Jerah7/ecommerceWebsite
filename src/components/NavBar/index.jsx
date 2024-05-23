import {
    Container,
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Typography,
} from "@material-ui/core";
import {ShoppingCart, PersonRounded} from "@material-ui/icons";
import {Link, useLocation} from "react-router-dom";
import "./style.css";

const NavBar = ({basketItems, totalCost}) =>  {
    const location = useLocation();
    return (
        <>
        <AppBar position="fixed" className="navbar">
            <Container>
                <Toolbar>
                    <Typography
                        component={Link}
                        to="/"
                        variant="h6"
                        className="title"
                        color="inherit"
                    >
                        {/** The Logo for the website */}
                        <img src="" 
                        alt="logo" 
                        height="25px"
                        className="logo"
                        />
                    </Typography>

                    <div className="web-title">
                          <h2>MenShoes </h2> 
                    </div>

                    {/* A person-icon which upon clicked will lead the user 
                        to login/signUp page */}
                    <div className="profile-wrapper">
                        <IconButton
                        component={Link}
                        to="/profile"
                        color="inherit"
                    >
                    <PersonRounded className="profile"/>
                    </IconButton>
                    </div> 
                    
                    {/** The following code displays the total cost of items
                     *  when on the basket page and the basket icon on other pages. 
                     */}
                   {location.pathname === "/basket" ? (
                        <div className="basket-wrapper">
                            <h2>Total cost:<strong>{totalCost}</strong></h2>
                        </div>
                    ):(
                    /* A basket-icon which upon clicked will lead the user 
                        to the cart page.
                        Also, a badge to visually display the number of items 
                        residing in the cart */
                    <div className="basket-wrapper">
                        <IconButton
                        component={Link}
                        to="/basket"
                        aria-label="Show basket contents"
                        color="inherit"
                        >
                        <Badge badgeContent={basketItems} color="secondary">
                          <ShoppingCart className="basket"/>
                        </Badge>
                    </IconButton>
                    </div>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
       </>

    );
};

export default NavBar;

