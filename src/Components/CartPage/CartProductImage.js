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
                <img
                    className="cart-product-image-container__image"
                    src={this.state.currentImage}
                    alt={this.props.productName}
                />
                {this.props.gallery.length > 1 && (
                    <div className="cart-product-image-container__arrows">
                        <button onClick={this.showPreviousImage}>
                            {/* <div> */}
                            <img
                                className="cart-product-image-container__previous-img"
                                src={chevronLeft}
                                alt=""
                            />
                            {/* </div> */}
                        </button>
                        <button onClick={this.showNextImage}>
                            {/* <div> */}
                            <img
                                className="cart-product-image-container__next-img"
                                src={chevronRight}
                                alt=""
                            />
                            {/* </div> */}
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default CartProductImage;
