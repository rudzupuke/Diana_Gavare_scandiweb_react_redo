import { Component } from "react";
import ProductCard from "./ProductCard";
import { CartStore } from "../../Stores/CartStore";
import { AttributeClickTrackingStore } from "../../Stores/AttributeClickTrackingStore";
import ShowMoreButton from "./ShowMoreButton";

class ProductContainer extends Component {
    state = {
        data: null,
        productsPerLoad: 6,
        productsInCurrentLoad: null,
    };

    indexOfFirstProduct = 0;
    indexOfLastProduct = this.state.productsPerLoad;

    componentDidMount() {
        this.setState({
            data: this.props.data.category.products,
        });
    }

    componentDidUpdate(prevProps) {
        // when component loads data and sets is as data state, change productsInCurrentLoad state:s
        if (this.state.data && !this.state.productsInCurrentLoad) {
            this.setState({
                productsInCurrentLoad: this.state.data.slice(
                    this.indexOfFirstProduct,
                    this.indexOfLastProduct
                ),
            });
        }

        // to update component with the right data when user changes category:
        if (
            prevProps.data.variables.title !== this.props.data.variables.title
        ) {
            this.indexOfLastProduct = this.state.productsPerLoad;

            this.setState({
                data: this.props.data.category.products,
                productsInCurrentLoad: this.props.data.category.products.slice(
                    this.indexOfFirstProduct,
                    this.indexOfLastProduct
                ),
            });
        }
    }

    showMoreProducts = () => {
        if (this.state.data.length > this.state.productsInCurrentLoad.length) {
            this.indexOfLastProduct += this.state.productsPerLoad;
            this.setState({
                productsInCurrentLoad: this.state.data.slice(
                    0,
                    this.indexOfLastProduct
                ),
            });
        }
    };

    addToCart = (productId, attributeType, attribute, prices) => {
        CartStore.addProductToCart(productId, attributeType, attribute, prices);
        // only call the untrackProduct function if product has attributes & was tracked (products with no
        // attributes aren't tracked):
        if (attributeType !== "NO-ATTRIBUTES")
            AttributeClickTrackingStore.untrackProduct(productId);
    };

    createProducts = () => {
        if (this.state.productsInCurrentLoad) {
            return this.state.productsInCurrentLoad.map((product) => {
                return (
                    <ProductCard
                        key={product.id}
                        productId={product.id}
                        attributeName={
                            product.attributes.length > 0
                                ? product.attributes[0].name
                                : "NO-ATTRIBUTES"
                        }
                        prices={product.prices}
                        productBrand={product.brand}
                        productName={product.name}
                        image={product.gallery[0]}
                        inStock={product.inStock}
                        addToCart={this.addToCart}
                    />
                );
            });
        }
    };

    createLoadMoreButton = () => {
        if (this.state.productsInCurrentLoad)
            if (
                this.state.data.length > this.state.productsInCurrentLoad.length
            ) {
                // render Show More button only when length of all products is bigger than length of productsInCurrentLoad
                // (if there are more products to be shown)
                return (
                    <div className="plp-container__button-container">
                        <ShowMoreButton handleClick={this.showMoreProducts} />
                    </div>
                );
            }
    };

    render() {
        return (
            <>
                <div className="plp-container__items">
                    {this.createProducts()}
                </div>

                {this.createLoadMoreButton()}
            </>
        );
    }
}

export default ProductContainer;
