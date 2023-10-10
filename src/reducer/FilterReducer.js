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
            // const selectSortEl = document.getElementById("sort");
            // const sortValue = selectSortEl.options[selectSortEl.selectedIndex].value;
            return {
                ...state,
                sorting_value: action.payload,
            };

        case "GET_SORTED_PRODUCTS":
            const { filter_products, sorting_value } = state;

            const tempSortProducts = [...filter_products];

            const sortingProduct = (a, b) => {
                switch (sorting_value) {
                    case "a-z":
                        return a.name.localeCompare(b.name);
                    case "z-a":
                        return b.name.localeCompare(a.name);
                    case "lowest":
                        return a.price - b.price;
                    case "highest":
                        return b.price - a.price;

                    default:
                        return tempSortProducts;
                }
            };
            let newSortProducts = tempSortProducts.sort(sortingProduct);

            return {
                ...state,
                filter_products: newSortProducts,
            };

        case "UPDATE_FILTERS_VALUE":
            return {
                ...state,
                text: action.payload,
            };

        case "FILTER_PRODUCTS":
            const { all_Products, text } = state;
            let tempFilterProducts = all_Products ? [...all_Products] : [];
            tempFilterProducts = tempFilterProducts?.filter((currentEl) =>
                currentEl.name.toLowerCase().includes(text)
            );
            return {
                ...state,
                filter_products: tempFilterProducts,
            };

        default:
            return state;
    }
};

export default FilterReducer;
