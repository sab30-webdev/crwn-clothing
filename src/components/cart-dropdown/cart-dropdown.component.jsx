import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import "./cart-dropdown.styles.scss";
import CartItem from "./../cart-item/cart-item.component";
import { connect } from "react-redux";
import { selectCartItems } from "./../../redux/cart/cart.selectors";
import { withRouter } from "react-router-dom";
import { toggleCartHidden } from "./../../redux/cart/cart.actions";

const CartDropdown = ({ cartItems, history, dispatch }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          dispatch(toggleCartHidden());
          history.push("checkout");
        }}
      >
        Go to Checkout
      </CustomButton>
    </div>
  );
};

// const mapStateToProps = ({ cart: { cartItems } }) => ({
//   cartItems,
// });

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
});

// const mapDispatchToProps = (dispatch) => ({
//   toggleCartHidden: () => dispatch(toggleCartHidden()),
// });

export default withRouter(connect(mapStateToProps)(CartDropdown));
