import { Component } from "react";

import chevronLeft from "../../Assets/chevron-left.svg";
import chevronRight from "../../Assets/chevron-right.svg";

class CartProductImage extends Component {
    state = { currentImage: this.props.img };

    showPreviousImage = () => {
        let index = this.props.gallery.findIndex(
            (image) => image === this.state.currentImage
        );

        if (index > 0) {
            this.setState({ currentImage: this.props.gallery[index - 1] });
        }
    };

    showNextImage = () => {
        let index = this.props.gallery.findIndex(
            (image) => image === this.state.currentImage
        );

        if (index < this.props.gallery.length - 1) {
            this.setState({ currentImage: this.props.gallery[index + 1] });
        }
    };

    render() {
        return (
            <div className="cart-product-image-container">
                {this.props.gallery.length > 1 && (
                    <button
                        className="cart-product-image-container__previous-btn"
                        onClick={this.showPreviousImage}
                    >
                        <img
                            className="cart-product-image-container__previous-img"
                            src={chevronLeft}
                            alt=""
                        />
                    </button>
                )}
                <img
                    className="cart-product-image-container__image"
                    src={this.state.currentImage}
                    alt={this.props.productName}
                />
                {this.props.gallery.length > 1 && (
                    <button
                        className="cart-product-image-container__next-btn"
                        onClick={this.showNextImage}
                    >
                        <img
                            className="cart-product-image-container__next-img"
                            src={chevronRight}
                            alt=""
                        />
                    </button>
                )}
            </div>
        );
    }
}

export default CartProductImage;
