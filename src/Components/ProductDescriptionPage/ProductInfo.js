import { Component } from "react";
import AddToCartButton from "./AddToCartButton";
import AttributesContainer from "./AttributesContainer";
import PriceContainer from "./PriceContainer";
import ProductDescription from "./ProductDescription";
import ProductName from "./ProductName";

import { CartStore } from "../../Stores/CartStore";
import { AttributeClickTrackingStore } from "../../Stores/AttributeClickTrackingStore";
import { observer } from "mobx-react";

class ProductInfo extends Component {
    state = {
        // if there are no attributes then set selectedItemAttribute as "no-attribute"
        selectedItemAttribute:
            AttributeClickTrackingStore.getProductAttribute(
                this.props.productId
            ) || "no-attribute",
    };

    handleAttributeClick = (value) => {
        this.setState({ selectedItemAttribute: value });
        AttributeClickTrackingStore.trackProduct(this.props.productId, value);
    };

    // if there is no attributes object, then create NO-ATTRIBUTES string to add to Cart
    attributeType = this.props.attributes[0]
        ? this.props.attributes[0].name
        : "NO-ATTRIBUTES";

    addToCart = () => {
        // if product has attributes (it's attributeType isn't "NO-ATTRIBUTES") then user must choose an attribute to be able to add
        // product to the cart (selectedItemAttribute can't be "no-attribute"):
        if (
            (this.attributeType !== "NO-ATTRIBUTES" &&
                this.state.selectedItemAttribute !== "no-attribute") ||
            this.attributeType === "NO-ATTRIBUTES"
        ) {
            CartStore.addProductToCart(
                this.props.productId,
                this.attributeType,
                this.state.selectedItemAttribute,
                this.props.prices
            );
        }
        // if there are no attributes, then product is not getting tracked in the AttributeClickTrackingStore,
        // to not get an error untrackProduct function gets called only when there are attributes:
        if (this.props.attributes[0])
            AttributeClickTrackingStore.untrackProduct(this.props.productId);
    };

    render() {
        return (
            <div className="pdp-product-info">
                <ProductName
                    brandName={this.props.brand}
                    productName={this.props.name}
                />
                {this.props.attributes.length > 0 && (
                    <AttributesContainer
                        attributeName={this.props.attributes[0].name}
                        attributeItems={this.props.attributes[0].items}
                        handleAttributeClick={this.handleAttributeClick}
                        selectedAttribute={this.state.selectedItemAttribute}
                    />
                )}
                <PriceContainer prices={this.props.prices} />
                <AddToCartButton handleClick={this.addToCart} />
                <ProductDescription
                    productDescription={this.props.description}
                />
            </div>
        );
    }
}

export default observer(ProductInfo);
