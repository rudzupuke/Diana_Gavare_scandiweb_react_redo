import React from "react";
import { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Navbar from "./Components/Navbar/Navbar";
import CartPage from "./Pages/CartPage/CartPage";
import ProductDescriptionPage from "./Pages/ProductDescriptionPage/ProductDescriptionPage";
import ProductListingPage from "./Pages/ProductListingPage/ProductListingPage";

const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route
                            path="/plp/:category"
                            element={<ProductListingPage />}
                        />
                        <Route
                            path="/"
                            element={<Navigate to="/plp/all" replace />}
                        />
                        <Route
                            path="/pdp/:productId"
                            element={<ProductDescriptionPage />}
                        />
                        <Route path="/cart" element={<CartPage />} />
                    </Routes>
                </BrowserRouter>
            </ApolloProvider>
        );
    }
}

export default App;
