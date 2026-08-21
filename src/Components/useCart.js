import { useEffect, useState } from "react";

export default function useCart() {

    const [cartCount, setCartCount] = useState(0);

    const updateCartCount = () => {

        const storedCart =
            localStorage.getItem("divara_cart");

        if (!storedCart) {
            setCartCount(0);
            return;
        }

        try {

            const cart = JSON.parse(storedCart);

            const count = cart.reduce(
                (total, item) =>
                    total + Number(item.quantity),
                0
            );

            setCartCount(count);

        } catch (error) {

            setCartCount(0);

        }
    };


    useEffect(() => {

        updateCartCount();

        window.addEventListener(
            "storage",
            updateCartCount
        );

        window.addEventListener(
            "cartUpdated",
            updateCartCount
        );

        return () => {

            window.removeEventListener(
                "storage",
                updateCartCount
            );

            window.removeEventListener(
                "cartUpdated",
                updateCartCount
            );

        };

    }, []);


    return {
        cartCount,
        updateCartCount,
    };
}