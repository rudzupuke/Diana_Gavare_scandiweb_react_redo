import { Component } from "react";

class GalleryImage extends Component {
    render() {
        return (
            <img
                className="gallery-image"
                src={this.props.image}
                onClick={() => this.props.changeCurrentImage(this.props.image)}
                alt={this.props.productName}
            />
        );
    }
}

export default GalleryImage;
