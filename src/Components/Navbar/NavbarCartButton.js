import { Component } from "react";

import { CartStore } from "../../Stores/CartStore";
import { observer } from "mobx-react";

import emptyCart from "../../Assets/EmptyCart.svg";

class NavbarCartButton extends Component {
    render() {
        return (
            <li>
                <button
                    onClick={this.props.handleClick}
                    className="navbar-cart-button"
                >
                    <img src={emptyCart} alt="" />
                    {/* if there is at least on item in the cart, an icon with the number of items in cart
                    shows up */}
                    {CartStore.totalProducts > 0 && (
                        <span className="navbar-cart-button__items-in-cart">
                            {CartStore.totalProducts}
                        </span>
                    )}
                </button>
            </li>
        );
    }
}

export default observer(NavbarCartButton);
