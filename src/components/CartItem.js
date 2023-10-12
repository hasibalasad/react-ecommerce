import React from "react";
import FormatPrice from "../helpers/FormatPrice";
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";

const CartItem = ({ id, name, color, amount, price, image }) => {
    return (
        <div className="cart_heading grid grid-five-column">
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
            <CartAmountToggle amount={amount} />
            {/* #TODO  //setIncrease={} setDecrease={} in CartAmountToggle */}

            {/* Subtotal */}
            <div className="cart-hide">
                <p>
                    <FormatPrice price={price * amount} />
                </p>
            </div>

            <div>
                <FaTrash className="remove_icon" />
            </div>
        </div>
    );
};

export default CartItem;
