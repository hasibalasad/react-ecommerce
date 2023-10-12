const FilterReducer = (state, action) => {
    switch (action.type) {
        case "GET_PRODUCT":
            const maxPrice = action.payload.reduce((accEl, currEl) => {
                return Math.max(accEl, currEl.price);
            }, 0);
            return {
                ...state,
                filter_products: [...action.payload],
                all_Product: [...action.payload],
                filters: {
                    ...state.filters,
                    maxPrice: maxPrice,
                    price: maxPrice,
                },
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
            const { name, value } = action.payload;
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: value,
                },
            };

        case "FILTER_PRODUCTS":
            const {
                all_Product,
                filters: { text, category, company, color, price },
            } = state;

            let tempFilterProducts = [...all_Product];

            if (text) {
                tempFilterProducts = tempFilterProducts?.filter((currentEl) =>
                    currentEl.name.toLowerCase().includes(text)
                );
            }
            if (category !== "all") {
                tempFilterProducts = tempFilterProducts.filter(
                    (currentEl) => currentEl.category === category
                );
            }
            if (company !== "all") {
                tempFilterProducts = tempFilterProducts.filter(
                    (currentEl) => currentEl.company === company
                );
            }
            if (color !== "all") {
                tempFilterProducts = tempFilterProducts.filter((currentEl) =>
                    currentEl.colors.includes(color)
                );
            }
            if (price) {
                tempFilterProducts = tempFilterProducts.filter((currentEl) => {
                    return currentEl.price <= price;
                });
            }
            return {
                ...state,
                filter_products: tempFilterProducts,
            };

        case "CLEAR_FILTER":
            return {
                ...state,
                filters: {
                    ...state.filters,
                    text: "",
                    category: "all",
                    company: "all",
                    color: "all",
                    price: state.filters.maxPrice,
                    maxPrice: state.filters.maxPrice,
                    minPrice: 0,
                },
            };

        default:
            return state;
    }
};

export default FilterReducer;
