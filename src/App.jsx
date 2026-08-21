// resources/js/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Components/index";
import Femme from "./Components/products/femme";
import Homme from "./Components/products/homme";
import ProductList from "./Components/products/index";
import Show from "./Components/products/show";
import Cart from "./Components/cart";

import Checkout from "./Components/checkout";
import OrderSuccess from "./Components/order-success";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/shop/femme" element={<Femme categoryId={1} />} />
                <Route path="/shop/homme" element={<Homme categoryId={2} />} />
                <Route path="/shop" element={<ProductList />} />
                 <Route path="/products/:slug" element={<Show />} />
                <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<OrderSuccess />} />
               

            </Routes>
        </BrowserRouter>
    );
}