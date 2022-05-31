import { Component } from "react";

class CartOverlayAttribute extends Component {
    createValue = () => {
        const nameArray = this.props.name.split(" ");
        const name = nameArray.join("");
        let value;
        if (this.props.attributeCount > 1) {
            value = this.props.itemValue + "-" + name;
        } else {
            value = this.props.itemValue;
        }

        return value;
    };

    createDefaultChecked = () => {
        const value = this.createValue();
        if (
            this.props.selectedAttribute !== "no-attribute" &&
            this.props.selectedAttribute !== null
        ) {
            if (Array.isArray(this.props.selectedAttribute)) {
                const filtered = this.props.selectedAttribute.filter(
                    (attr) => attr.attribute === value
                );

                return filtered.length > 0;
            } else {
                return this.createValue() === this.props.selectedAttribute;
            }
        }
    };

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
                    name={this.props.uniqueId + this.props.name}
                    id={this.createValue()}
                    value={this.createValue()}
                    defaultChecked={this.createDefaultChecked()}
                    disabled={true}
                ></input>
                <label
                    className={`${
                        this.props.itemValue.includes("#")
                            ? "cart-overlay-attribute-label--color"
                            : "cart-overlay-attribute-label"
                    }`}
                    htmlFor={this.createValue()}
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
