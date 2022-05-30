import { Component } from "react";

class AttributeButton extends Component {
    isColor = this.props.itemValue.includes("#");
    render() {
        return (
            <>
                <input
                    type="radio"
                    id={this.props.itemValue}
                    name={this.props.name}
                    value={this.props.itemValue}
                    disabled={this.props.disabled}
                    onClick={() =>
                        this.props.handleAttributeClick(this.props.itemValue)
                    }
                    className={`${
                        this.isColor
                            ? "product-attribute--color"
                            : "product-attribute"
                    }`}
                    defaultChecked={
                        this.props.itemValue === this.props.selectedAttribute
                    }
                ></input>
                <label
                    className={`${
                        this.isColor ? "product-label--color" : "product-label"
                    }`}
                    htmlFor={this.props.itemValue}
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

export default AttributeButton;
