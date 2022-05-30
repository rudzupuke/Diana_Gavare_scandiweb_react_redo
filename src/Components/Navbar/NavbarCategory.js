import { Component } from "react";
import { Link } from "react-router-dom";

class NavbarCategory extends Component {
    render() {
        return (
            <li key={this.props.categoryName}>
                <Link
                    className={`
                    ${
                        this.props.active
                            ? "navbar-category-link--active"
                            : "navbar-category-link"
                    }`}
                    to={`/plp/${this.props.categoryName}`}
                >
                    {" "}
                    {this.props.categoryName}
                </Link>
            </li>
        );
    }
}

export default NavbarCategory;
