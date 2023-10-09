import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/FilterReducer";
import { useProviderContext } from "./productContext";

export const FilterContext = createContext();

const initialState = {
    filter_products: [],
    all_Product: [],
    grid_view: true,
    sorting_value: "lowest",
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

    const handleSort = () => {
        dispatch({
            type: "GET_SORT_VALUE",
        });
    };
    useEffect(() => {
        dispatch({
            type: "GET_SORTED_PRODUCTS",
            payload: products,
        });
    }, [state.sorting_value]);

    useEffect(() => {
        dispatch({
            type: "GET_PRODUCT",
            payload: products,
        });
    }, [dispatch, products]);

    return (
        <FilterContext.Provider
            value={{ ...state, setGridView, setListView, handleSort }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () => {
    return useContext(FilterContext);
};
