import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { ShoppingCart } from "@material-ui/icons";
import { DataContext } from "./DataProvider";
import Avatar from "@mui/material/Avatar";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

export default function Header(props) {
  const [menu, setMenu] = useState(false);
  const history = useHistory();
  const value = useContext(DataContext);
  const [cart] = value.cart;

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const styles = {
    largeIcon: {
      width: 28,
      height: 28,
    },

    styleMenu: {
      top: menu ? 0 : "-100%",
      backgroundColor: "#00A3B6",
    },
    searchBtnStyle: {
      borderRadius: "50px",
      border: "none",
      backgroundColor: "rgba(248,248,248,0.71)",
      boxShadow: "5px 5px 30px rgba(0,0,0,.2)",
      height: "50px",
      width: "400px",
      padding: "0px 20px",
    },
  };

  const handleChange = (event) => {
    props.setSearch(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleLogout = (event) => {
    value.setCurrentUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setOpen(false);
    history.push("/");
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  console.log("Current user");
  console.log(value.currentUser);
  return (
    <header style={{ backgroundColor: "#00A3B6" }}>
      <div className="logo ">
        <h1>
          <Link to="/">Samsung 4 you</Link>
        </h1>
      </div>

      <ul style={styles.styleMenu}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {value.currentUser && value.currentUser === "admin" && (
          <li>
            <Link to="/orders">Orders</Link>
          </li>
        )}
        {value.currentUser ? (
          <li>
            <Link onClick={handleLogout}>Logout</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}

        <li onClick={toggleMenu}>
          <img src="cross.png" alt="close-menu" width="30" className="menu" />
        </li>
      </ul>

      <form action="/products" autoComplete="off">
        <input
          style={styles.searchBtnStyle}
          type="text"
          id="input-search"
          name="search"
          placeholder="Search..."
          onChange={handleChange}
        />
      </form>

      <div className="cart-icon">
        {value.currentUser && value.currentUser !== "admin" && (
          <span>{cart.length}</span>
        )}

        {value.currentUser && value.currentUser !== "admin" && (
          <li>
            <Link to="/cart">
              <ShoppingCart
                style={styles.largeIcon}
                className="menu"
              ></ShoppingCart>
            </Link>
          </li>
        )}
      </div>
      <div>
        <Avatar
          style={{ border: "5px solid white" }}
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          alt="Remy Sharp"
          //   src={value.currentUser[0] && value.currentUser[0].image}
          sx={{ width: 50, height: 50 }}
        />
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {value.currentUser ? (
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  ) : (
                    <Link to="/login">
                      <MenuItem style={{ color: "black" }}>Login</MenuItem>
                    </Link>
                  )}
                </MenuList>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      <div className="menu" onClick={toggleMenu}>
        <img src="menu.svg" alt="menu" width="30" />
      </div>
    </header>
  );
}
