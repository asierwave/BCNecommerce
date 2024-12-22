import React from "react";
import { useCart } from "../context/CartContext";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { CheckoutButton } from "./CheckoutButton";

export const Cart: React.FC = () => {
  const { state, dispatch, createCheckoutSession } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="p-4 text-center">
        <ShoppingCart
          className="mx-auto mb-2"
          size={24}
        />
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      <div className="space-y-4">
        {state.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  dispatch({
                    type: "UPDATE_QUANTITY",
                    payload: {
                      id: item.id,
                      quantity: Math.max(0, item.quantity - 1),
                    },
                  })
                }
                className="p-1 rounded-full hover:bg-gray-100">
                <Minus size={20} />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() =>
                  dispatch({
                    type: "UPDATE_QUANTITY",
                    payload: { id: item.id, quantity: item.quantity + 1 },
                  })
                }
                className="p-1 rounded-full hover:bg-gray-100">
                <Plus size={20} />
              </button>
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE_ITEM", payload: item.id })
                }
                className="p-1 rounded-full hover:bg-gray-100 text-red-500">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total:</span>
          <span className="text-xl font-bold">${state.total.toFixed(2)}</span>
        </div>
        <button
          onClick={createCheckoutSession}
          className="p-2 bg-blue-500 text-white rounded">
          Checkout
        </button>
      </div>
    </div>
  );
};
