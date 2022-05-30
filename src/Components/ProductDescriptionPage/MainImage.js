import { Component } from "react";

class MainImage extends Component {
    render() {
        return (
            <div className="pdp-main-image-container">
                <img
                    className="main-image"
                    src={this.props.image}
                    alt={this.props.productName}
                />
            </div>
        );
    }
}

export default MainImage;
