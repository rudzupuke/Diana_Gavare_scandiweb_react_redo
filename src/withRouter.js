import { useLocation, useNavigate, useParams } from "react-router-dom";

// when class component is wrapped in this function, it gets access to the hooks from react-router
export const withRouter = (Component) => {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Component {...props} router={{ location, navigate, params }} />;
    }

    return ComponentWithRouterProp;
};
