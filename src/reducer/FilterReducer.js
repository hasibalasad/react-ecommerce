const FilterReducer = (state, action) => {
    switch (action.type) {
        case "GET_PRODUCT":
            return {
                ...state,
                filter_products: [...action.payload],
                all_Products: [...action.payload],
            };
        case "SET_GRIDVIEW":
            return {
                ...state,
                grid_view: true,
            };

        default:
            return state;
    }
};

export default FilterReducer;
