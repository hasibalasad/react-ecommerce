import React from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { useFilterContext } from "../context/filterContext";
import FormatPrice from "../helpers/FormatPrice";
import { Button } from "../styles/Button";

const FilterSection = () => {
    const {
        clearFilter,
        all_Product,
        updateFilterValue,
        filters: { text, category, color, price, maxPrice, minPrice },
    } = useFilterContext();

    // function to set unique data for filter
    const getUniqueData = (data, property) => {
        let propertyValue = data.map((curEl) => {
            return curEl[property];
        });
        if (property === "colors") {
            // return ["all", ...new Set([].concat(...propertyValue))];
            propertyValue = propertyValue.flat(Infinity);
        }
        return ["all", ...new Set(propertyValue)]; // using set for unique property
    };

    // to get unique data for filter
    const uniqueCategoryData = getUniqueData(all_Product, "category");
    const uniqueCompanyData = getUniqueData(all_Product, "company");
    const uniqueColorsData = getUniqueData(all_Product, "colors");

    return (
        <Wrapper>
            <div className="filter-search">
                <form onSubmit={(event) => event.preventDefault()}>
                    <input
                        type="text"
                        name="text"
                        value={text}
                        onChange={updateFilterValue}
                        placeholder="SEARCH"
                    />
                </form>
            </div>

            <div className="filter-category">
                <h3>Category</h3>
                <div>
                    {uniqueCategoryData.map((curEl, index) => (
                        <button
                            key={index}
                            type="button"
                            name="category"
                            value={curEl}
                            onClick={updateFilterValue}
                            className={
                                category === curEl ? `active` : undefined
                            }
                        >
                            {curEl}
                        </button>
                    ))}
                </div>
            </div>
            <div className="filter-company">
                <h3>Company</h3>
                <select
                    name="company"
                    id="company"
                    className="filter-company--select"
                    onClick={updateFilterValue}
                >
                    {uniqueCompanyData.map((curEl, index) => (
                        <option key={index} value={curEl}>
                            {curEl}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-colors colors">
                <h3>Colors</h3>
                <div className="filter-color-style">
                    {uniqueColorsData.map((curColor, index) => {
                        if (curColor === "all") {
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    name="color"
                                    value={curColor}
                                    onClick={updateFilterValue}
                                    className="color-all--style"
                                >
                                    All
                                </button>
                            );
                        }
                        return (
                            <button
                                key={index}
                                type="button"
                                name="color"
                                value={curColor}
                                onClick={updateFilterValue}
                                className={
                                    curColor === color
                                        ? `btnStyle active`
                                        : `btnStyle`
                                }
                                style={{ backgroundColor: curColor }}
                            >
                                {curColor === color ? <FaCheck /> : null}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="filter_price">
                <h3>Price</h3>
                <p>
                    <FormatPrice price={price} />
                </p>
                <input
                    type="range"
                    name="price"
                    max={maxPrice}
                    min={minPrice}
                    value={price}
                    onChange={updateFilterValue}
                />
            </div>
            <div className="filter-clear">
                <Button className="btn" onClick={clearFilter}>
                    Clear Filter
                </Button>
            </div>
        </Wrapper>
    );
};
const Wrapper = styled.section`
    padding: 5rem 0;
    display: flex;
    flex-direction: column;
    gap: 3rem;

    h3 {
        padding: 2rem 0;
        font-size: bold;
    }

    .filter-search {
        input {
            padding: 0.6rem 1rem;
            width: 80%;
            border-color: rgba(33, 37, 41, 0.6);
            border-radius: 5%;
        }
    }

    .filter-category {
        div {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 1.4rem;

            button {
                border: none;
                background-color: ${({ theme }) => theme.colors.white};
                text-transform: capitalize;
                cursor: pointer;

                &:hover {
                    color: ${({ theme }) => theme.colors.btn};
                }
            }

            .active {
                border-bottom: 1px solid #000;
                color: ${({ theme }) => theme.colors.btn};
            }
        }
    }

    .filter-company--select {
        padding: 0.3rem 1.2rem;
        font-size: 1.6rem;
        color: ${({ theme }) => theme.colors.text};
        text-transform: capitalize;
    }

    .filter-color-style {
        display: flex;
        justify-content: center;
    }

    .color-all--style {
        background-color: transparent;
        text-transform: capitalize;
        border: none;
        cursor: pointer;
    }
    .btnStyle {
        width: 2rem;
        height: 2rem;
        background-color: #000;
        border-radius: 50%;
        margin-left: 1rem;
        border: none;
        outline: none;
        opacity: 0.5;
        cursor: pointer;

        &:hover {
            opacity: 1;
        }
    }

    .active {
        opacity: 1;
    }

    .checkStyle {
        font-size: 1rem;
        color: #fff;
    }

    .filter_price {
        input {
            margin: 0.5rem 0 1rem 0;
            padding: 0;
            box-shadow: none;
            cursor: pointer;
        }
    }

    .filter-shipping {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .filter-clear .btn {
        background-color: #ec7063;
        color: #000;
    }
`;
export default FilterSection;
