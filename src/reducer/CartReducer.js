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
    return state;
};

export default CartReducer;
