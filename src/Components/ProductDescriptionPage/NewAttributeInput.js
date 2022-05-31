import { Component } from "react";

class NewAttributeInput extends Component {
    isColor = this.props.itemValue.includes("#");

    createValue = () => {
        const nameArray = this.props.name.split(" ");
        const name = nameArray.join("");

        let value;

        if (this.props.attributeTypeCount > 1) {
            value = this.props.itemValue + "-" + name;
        } else {
            value = this.props.itemValue;
        }

        return value;
    };

    createDefaultChecked = () => {
        const value = this.createValue();
        // return typeof value;
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
                    type="radio"
                    name={this.props.name}
                    id={this.createValue()}
                    value={this.createValue()}
                    disabled={this.props.disabled}
                    onClick={() =>
                        this.props.handleAttributeClick(
                            this.createValue(),
                            this.props.name,
                            this.props.attributes
                        )
                    }
                    className={`${
                        this.isColor
                            ? "product-attribute--color"
                            : "product-attribute"
                    }`}
                    defaultChecked={
                        // this.createValue() === this.props.selectedAttribute
                        this.createDefaultChecked()
                    }
                ></input>
                <label
                    className={`${
                        this.isColor ? "product-label--color" : "product-label"
                    }`}
                    htmlFor={this.createValue()}
                    style={
                        this.isColor
                            ? {
                                  backgroundColor: this.props.itemValue,
                              }
                            : {}
                    }
                >
                    {this.isColor ? "" : this.props.itemValue}
                </label>
            </>
        );
    }
}

export default NewAttributeInput;
