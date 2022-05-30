import { Component } from "react";

import { withRouter } from "../../withRouter";
import { observer } from "mobx-react";
import { graphql } from "@apollo/client/react/hoc";
import { getCategoriesQuery } from "../../Queries/queries";

import CartOverlay from "../CartOverlay/CartOverlay";
import NavbarCategory from "./NavbarCategory";
import NavbarLogo from "./NavbarLogo";
import NavbarCurrencyButton from "./NavbarCurrencyButton";
import NavbarCartButton from "./NavbarCartButton";

class Navbar extends Component {
    state = {
        currencyContainerOpen: false,
        cartOverlayOpen: false,
    };

    componentDidUpdate() {
        // to be able to click outside Currency Container & close it
        if (this.state.currencyContainerOpen) {
            document
                .querySelector("body")
                .addEventListener("click", this.toggleCurrencyContainer);
        } else {
            document
                .querySelector("body")
                .removeEventListener("click", this.toggleCurrencyContainer);
        }
    }

    toggleCurrencyContainer = (e) => {
        if (this.state.cartOverlayOpen === false) {
            e.stopPropagation();
            this.setState((prevState) => ({
                currencyContainerOpen: !prevState.currencyContainerOpen,
            }));
        }
    };

    toggleCartOverlay = () => {
        this.setState((prevState) => ({
            cartOverlayOpen: !prevState.cartOverlayOpen,
        }));
    };

    render() {
        if (this.props.categories.loading) return <p>...</p>;
        return (
            <>
                <div className="navbar-container">
                    <nav className="navbar">
                        <ul className="navbar__categories">
                            {this.props.categories.categories.map((cat) => (
                                <NavbarCategory
                                    key={cat.name}
                                    categoryName={cat.name}
                                    // if current route matches the category name, then it is active (
                                    // different styling is added to it inside NavbarCategory component)
                                    active={
                                        `/plp/${cat.name}` ===
                                        this.props.router.location.pathname
                                    }
                                />
                            ))}
                        </ul>
                        <NavbarLogo />
                        <ul className="navbar__currency-cart">
                            <NavbarCurrencyButton
                                handleClick={this.toggleCurrencyContainer}
                                isCurrencySwitcherOpen={
                                    this.state.currencyContainerOpen
                                }
                                // currencies={this.props.currencies} // this.props.currencies comes from graphql
                            />

                            <NavbarCartButton
                                handleClick={this.toggleCartOverlay}
                            />
                        </ul>
                    </nav>
                </div>
                {this.state.cartOverlayOpen && (
                    <CartOverlay
                        cartOverlayOpen={this.state.cartOverlayOpen}
                        toggleCartOverlay={this.toggleCartOverlay}
                    />
                )}
            </>
        );
    }
}

// export default compose(
export default graphql(getCategoriesQuery, { name: "categories" })(
    // graphql(getCurrenciesQuery, { name: "currencies" })
    withRouter(observer(Navbar))
);
