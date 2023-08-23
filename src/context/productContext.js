import axios from "axios";
import { useEffect, useReducer, useContext, createContext } from "react";
import reducer from "../reducer/ProductReducer";

const AppContext = createContext();

const API = "https://api.pujakaitem.com/api/products";
// const API = "../../server/products.json";

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: [],
    singleProduct: {},
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // API call to get products
    const getProducts = async (url) => {
        dispatch({
            type: "SET_LOADING",
        });
        try {
            const res = await axios.get(url);
            const products = await res.data;
            dispatch({
                type: "SET_API_DATA",
                payload: products,
            });
        } catch (error) {
            dispatch({
                type: "SET_API_ERROR",
            });
        }
    };

    // API call to get Single product
    const getSingleProduct = async (url) => {
        dispatch({
            type: "SET_LOADING",
        });
        try {
            const res = await axios.get(url);
            const products = await res.data;
            dispatch({
                type: "SET_SINGLE_PRODUCT",
                payload: products,
            });
        } catch (error) {
            dispatch({
                type: "SET_SINGLE_ERROR",
            });
        }
    };

    useEffect(() => {
        getProducts(API);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AppContext.Provider value={{ ...state, getSingleProduct }}>
            {children}
        </AppContext.Provider>
    );
};

const useProviderContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useProviderContext };
