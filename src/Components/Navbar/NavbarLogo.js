import { Component } from "react";
import logo from "../../Assets/logo.svg";

class NavbarImage extends Component {
    render() {
        return <img className="navbar__logo" src={logo} alt="company logo" />;
    }
}

export default NavbarImage;
