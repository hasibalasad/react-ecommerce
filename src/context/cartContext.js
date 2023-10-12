import { useContext, createContext, useReducer } from "react";
import reducer from "../reducer/CartReducer";

const CartContext = createContext();

const initialState = {
    cart: [],
};
const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart = (id, color, amount, product) => {
        dispatch({
            type: "ADD_TO_CART",
            payload: { id, color, amount, product },
        });
    };
    return (
        <CartContext.Provider value={{ ...state, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

const useCartContext = () => {
    return useContext(CartContext);
};

export { CartContextProvider, useCartContext };
