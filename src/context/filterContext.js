import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/FilterReducer";
import { useProviderContext } from "./productContext";

export const FilterContext = createContext();

const initialState = {
    filter_products: [],
    all_Product: [],
    grid_view: true,
    sorting_value: "lowest",
    filters: {
        text: "",
        category: "all",
        company: "all",
        color: "all",
    },
};

export const FilterContextProvider = ({ children }) => {
    const { products } = useProviderContext();
    const [state, dispatch] = useReducer(reducer, initialState);

    // to set view of products
    const setGridView = () => {
        dispatch({
            type: "SET_GRIDVIEW",
        });
    };
    // to set view of products
    const setListView = () => {
        dispatch({
            type: "SET_LISTVIEW",
        });
    };

    const handleSort = (event) => {
        let userValue = event.target.value;
        dispatch({
            type: "GET_SORT_VALUE",
            payload: userValue,
        });
    };

    const updateFilterValue = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        dispatch({
            type: "UPDATE_FILTERS_VALUE",
            payload: { name, value },
        });
    };

    useEffect(() => {
        dispatch({
            type: "FILTER_PRODUCTS",
        });
        dispatch({
            type: "GET_SORTED_PRODUCTS",
        });
    }, [products, state.sorting_value, state.filters]);

    useEffect(() => {
        dispatch({
            type: "GET_PRODUCT",
            payload: products,
        });
    }, [dispatch, products]);

    return (
        <FilterContext.Provider
            value={{
                ...state,
                setGridView,
                setListView,
                handleSort,
                updateFilterValue,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () => {
    return useContext(FilterContext);
};
