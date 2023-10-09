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
        case "SET_LISTVIEW":
            return {
                ...state,
                grid_view: false,
            };

        case "GET_SORT_VALUE":
            const selectSortEl = document.getElementById("sort");
            const sortValue =
                selectSortEl.options[selectSortEl.selectedIndex].value;
            // console.log(sortValue);
            return {
                ...state,
                sorting_value: sortValue,
            };

        case "GET_SORTED_PRODUCTS":
            let newSortProducts;
            const tempSortProducts = [...action.payload];

            if (state.sorting_value === "a-z") {
                newSortProducts = tempSortProducts.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
            }
            if (state.sorting_value === "z-a") {
                newSortProducts = tempSortProducts.sort((a, b) => {
                    return b.name.localeCompare(a.name);
                });
            }
            if (state.sorting_value === "lowest") {
                newSortProducts = tempSortProducts.sort((a, b) => {
                    return a.price - b.price;
                });
            }
            if (state.sorting_value === "highest") {
                newSortProducts = tempSortProducts.sort((a, b) => {
                    return b.price - a.price;
                });
            }
            return {
                ...state,
                filter_products: newSortProducts,
            };

        default:
            return state;
    }
};

export default FilterReducer;
