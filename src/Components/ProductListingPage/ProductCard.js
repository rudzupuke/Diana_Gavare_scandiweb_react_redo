import { Component } from "react";
import { AttributeClickTrackingStore } from "../../Stores/AttributeClickTrackingStore";

import { observer } from "mobx-react";

import ProductCardPriceContainer from "./ProductCardPriceContainer";
import AddToCartButton from "./AddToCartButton";
import { Link } from "react-router-dom";

class ProductCard extends Component {
    state = { style: { display: "none" } };

    // if product doesn't have any attributes, then it is not getting tracked, this.props.addToCart needs
    // "attribute" as an argument, to not get an error clicking on the AddToCartButtone if the product is not
    // tracked, "no-attribute" string is created for those products that don't have attributes:
    attribute = AttributeClickTrackingStore.getProductAttribute(
        this.props.productId
    )
        ? AttributeClickTrackingStore.getProductAttribute(this.props.productId)
        : "no-attribute";

    render() {
        return (
            <div
                // if product has attributes and IS tracked, or there are no attributes, then selected class is added
                // to the product card
                className={
                    "product-card" +
                    ` 
                ${
                    AttributeClickTrackingStore.isProductTracked(
                        this.props.productId
                    ) ||
                    (this.props.attributeName === "NO-ATTRIBUTES" &&
                        this.props.inStock)
                        ? "selected"
                        : ""
                }
                `
                }
                onMouseEnter={() => {
                    this.setState({ style: { display: "block" } });
                }}
                onMouseLeave={() => {
                    this.setState({ style: { display: "none" } });
                }}
            >
                {/* if product has attributes and IS tracked, or there are no attributes and product is IN stock, 
                then AddToCartButton component is rendered */}
                {((AttributeClickTrackingStore.isProductTracked(
                    this.props.productId
                ) &&
                    this.props.inStock) ||
                    (this.props.attributeName === "NO-ATTRIBUTES" &&
                        this.props.inStock)) && (
                    <AddToCartButton
                        handleClick={() =>
                            this.props.addToCart(
                                this.props.productId,
                                this.props.attributeName,
                                this.attribute,
                                this.props.prices
                            )
                        }
                        style={this.state.style}
                    />
                )}
                <div>
                    <Link to={`/pdp/${this.props.productId}`}>
                        <div className="product-card__image-container">
                            <img
                                className="product-card__image"
                                src={this.props.image}
                                alt={this.props.productName}
                            />
                            <div
                                className={
                                    this.props.inStock
                                        ? "image-overlay"
                                        : "image-overlay--out-of-stock"
                                }
                            ></div>
                        </div>
                    </Link>
                    <p
                        className={`product-card__product-name ${
                            this.props.inStock ? "" : "out-of-stock"
                        }`}
                    >
                        {this.props.productBrand} {this.props.productName}
                    </p>

                    <ProductCardPriceContainer
                        prices={this.props.prices}
                        inStock={this.props.inStock}
                    />
                </div>
            </div>
        );
    }
}

export default observer(ProductCard);
