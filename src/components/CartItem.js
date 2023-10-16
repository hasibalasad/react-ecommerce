import React from "react";
import FormatPrice from "../helpers/FormatPrice";
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import { useCartContext } from "../context/cartContext";

const CartItem = ({ id, name, color, amount, price, image, max }) => {
    const { removeCartItem, setIncrease, setDecrease } = useCartContext();
    return (
        <div className="cart-heading grid grid-five-column">
            <div className="cart-image--name">
                <div>
                    <figure>
                        <img src={image} alt={name} />
                    </figure>
                </div>
                <div>
                    <p>{name}</p>
                    <div className="color-div">
                        <p>color:</p>
                        <div
                            className="color-style"
                            style={{ backgroundColor: color, color: color }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* price   */}
            <div className="cart-hide">
                <p>
                    <FormatPrice price={price} />
                </p>
            </div>

            {/* Quantity */}
            <CartAmountToggle
                amount={amount}
                setIncrease={() => setIncrease(id)}
                setDecrease={() => setDecrease(id)}
            />

            {/* Subtotal */}
            <div className="cart-hide">
                <p>
                    <FormatPrice price={price * amount} />
                </p>
            </div>

            <div>
                <FaTrash
                    className="remove_icon"
                    onClick={() => removeCartItem(id)}
                />
            </div>
        </div>
    );
};

export default CartItem;
