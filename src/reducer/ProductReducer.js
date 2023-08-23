const ProductReducer = (state, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                isLoading: true,
            };
        case "SET_API_DATA":
            const featureData = action.payload.filter((product) => {
                return product.featured === true;
            });
            return {
                ...state,
                isLoading: false,
                isError: false,
                featureProducts: featureData,
                products: action.payload,
            };
        case "SET_SINGLE_PRODUCT":
            return {
                ...state,
                isLoading: false,
                isError: false,
                singleProduct: action.payload,
            };
        case "SET_API_ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case "SET_SINGLE_ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true,
            };

        default:
            return state;
    }
};

export default ProductReducer;
