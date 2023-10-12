import { useContext, createContext, useReducer, useEffect } from "react";
import reducer from "../reducer/CartReducer";

const CartContext = createContext();

const getLocalCartData = () => {
    const localCartData = localStorage.getItem("cartData");
    if (localCartData.length === 0) {
        return [];
    } else {
        return JSON.parse(localCartData);
    }
};

const initialState = {
    // cart: [],
    cart: getLocalCartData(),
};
const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart = (id, color, amount, product) => {
        dispatch({
            type: "ADD_TO_CART",
            payload: { id, color, amount, product },
        });
    };
    const removeCartItem = (id) => {
        dispatch({
            type: "REMOVE_CART_ITEM",
            payload: id,
        });
    };

    const clearCart = () => {
        dispatch({
            type: "CLEAR_CART",
        });
    };

    useEffect(() => {
        localStorage.setItem("cartData", JSON.stringify(state.cart));
    }, [state.cart]);

    return (
        <CartContext.Provider
            value={{ ...state, addToCart, removeCartItem, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

const useCartContext = () => {
    return useContext(CartContext);
};

export { CartContextProvider, useCartContext };
