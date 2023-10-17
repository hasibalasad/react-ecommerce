const CartReducer = (state, action) => {
    if (action.type === "ADD_TO_CART") {
        const { id, color, amount, product } = action.payload;
        let existingProductCart = state.cart.find((curEl) => {
            return curEl.id === id + color;
        });

        if (existingProductCart) {
            let updatedCartItem = state.cart.map((curEl) => {
                if (curEl.id === id + color) {
                    let newAmount = curEl.amount + amount;

                    if (newAmount >= curEl.max) {
                        newAmount = curEl.max;
                    }

                    return {
                        ...curEl,
                        amount: newAmount,
                    };
                } else {
                    return curEl;
                }
            });

            return {
                state,
                cart: updatedCartItem,
            };
        } else {
            let newCartItem = {
                id: id + color,
                name: product.name,
                price: product.price,
                amount,
                color,
                image: product.image[0].url,
                max: product.stock,
            };
            return {
                ...state,
                cart: [...state.cart, newCartItem],
            };
        }
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

    if (action.type === "SET_INCREASE") {
        let updatedCart = state.cart.map((curEl) => {
            if (curEl.id === action.payload) {
                let newAmount = curEl.amount + 1;

                if (newAmount >= curEl.max) {
                    newAmount = curEl.max;
                }
                return {
                    ...curEl,
                    amount: newAmount,
                };
            } else {
                return curEl;
            }
        });
        return {
            state,
            cart: updatedCart,
        };
    }
    if (action.type === "SET_DECREASE") {
        let updatedCart = state.cart.map((curEl) => {
            if (curEl.id === action.payload) {
                let newAmount = curEl.amount - 1;

                if (newAmount <= 1) {
                    newAmount = 1;
                }
                return {
                    ...curEl,
                    amount: newAmount,
                };
            } else {
                return curEl;
            }
        });
        return {
            state,
            cart: updatedCart,
        };
    }

    if (action.type === "CLEAR_CART") {
        return {
            ...state,
            cart: [],
        };
    }

    if (action.type === "CART_TOTAL_ITEM_PRICE") {
        let updatedItemVal = state.cart.reduce(
            (initialValue, currentItem) => {
                let { amount, price } = currentItem;
                initialValue.item = initialValue.item + amount;
                initialValue.price = initialValue.price + amount * price;
                return initialValue;
            },
            { item: 0, price: 0 }
        );

        return {
            ...state,
            totalItem: updatedItemVal.item,
            totalPrice: updatedItemVal.price,
        };
    }

    return state;
};

export default CartReducer;
