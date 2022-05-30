import { Component } from "react";

import { observer } from "mobx-react";
import { CurrencyStore } from "../../Stores/CurrencyStore";

import CurrencySwitcher from "../CurrencySwitcher/CurrencySwitcher";

class NavbarCurrencyButton extends Component {
    render() {
        return (
            <li>
                <button
                    className="navbar-currency-button"
                    onClick={(e) => this.props.handleClick(e)}
                >
                    <span className="navbar-currency-button__currency-symbol">
                        {CurrencyStore.currency}
                    </span>
                    <span
                        className={`navbar-currency-button__arrow-${
                            this.props.isCurrencySwitcherOpen ? "up" : "down"
                        }`}
                        alt=""
                    ></span>
                </button>
                {this.props.isCurrencySwitcherOpen && (
                    <CurrencySwitcher
                        currencies={this.props.currencies}
                        loading={this.props.loading}
                    />
                )}
            </li>
        );
    }
}

export default observer(NavbarCurrencyButton);
