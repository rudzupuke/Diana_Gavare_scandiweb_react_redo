import { Component } from "react";

import GalleryImage from "./GalleryImage";

class ProductImages extends Component {
    render() {
        return (
            <div className="pdp-gallery ">
                {this.props.gallery.map((img, index) => {
                    return (
                        <GalleryImage
                            key={index}
                            image={img}
                            changeCurrentImage={() =>
                                this.props.changeCurrentImage(img)
                            }
                            productName={this.props.productName}
                        />
                    );
                })}
            </div>
        );
    }
}

export default ProductImages;
