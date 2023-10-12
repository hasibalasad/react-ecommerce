const CartReducer = (state, action) => {
    if (action.type === "ADD_TO_CART") {
        const { id, color, amount, product } = action.payload;
        let newCartItem = {
            id: id + color,
            name: product.name,
            price: product.price,
            amount,
            color,
            image: product.image[0].url,
        };
        return {
            ...state,
            cart: [...state.cart, newCartItem],
        };
    }

    if (action.type === "REMOVE_CART_ITEM") {
        let updatedCartItem = state.cart.filter((curEl) => {
            return curEl.id !== action.payload;
        });
        return {
            ...state,
            cart: updatedCartItem,
        };
    }

    if (action.type === "CLEAR_CART") {
        return {
            ...state,
            cart: [],
        };
    }
    return state;
};

export default CartReducer;
