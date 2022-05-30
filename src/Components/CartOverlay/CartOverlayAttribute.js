import { Component } from "react";

class CartOverlayAttribute extends Component {
    render() {
        return (
            <>
                <input
                    className={`${
                        this.props.itemValue.includes("#")
                            ? "cart-overlay-attribute--color"
                            : "cart-overlay-attribute"
                    }`}
                    type="radio"
                    id={this.props.itemValue}
                    name={this.props.name}
                    value={this.props.itemValue}
                    defaultChecked={
                        this.props.itemValue === this.props.selectedAttribute
                    }
                    disabled={true}
                ></input>
                <label
                    className={`${
                        this.props.itemValue.includes("#")
                            ? "cart-overlay-attribute-label--color"
                            : "cart-overlay-attribute-label"
                    }`}
                    htmlFor={this.props.itemValue}
                    style={
                        this.props.itemValue.includes("#")
                            ? {
                                  backgroundColor: this.props.itemValue,
                              }
                            : {}
                    }
                >
                    {this.props.itemValue.includes("#")
                        ? ""
                        : this.props.itemValue}
                </label>
            </>
        );
    }
}

export default CartOverlayAttribute;
