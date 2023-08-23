import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/FilterReducer";
import { useProviderContext } from "./productContext";

export const FilterContext = createContext();

const initialState = {
    filter_products: [],
    all_Product: [],
    grid_view: true,
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

    useEffect(() => {
        dispatch({
            type: "GET_PRODUCT",
            payload: products,
        });
    }, [dispatch, products]);
    return (
        <FilterContext.Provider value={{ ...state, setGridView }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () => {
    return useContext(FilterContext);
};
