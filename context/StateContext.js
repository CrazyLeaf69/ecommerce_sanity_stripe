import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const Context = createContext()

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const productInCart = cartItems.find(item => item._id === product._id)

        setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quantity)
        if (productInCart) {
            const index = cartItems.findIndex(item => item._id === product._id)
            setCartItems((items) => {
                items.splice(index, 1, {...productInCart, quantity: productInCart.quantity+quantity})
                return [...items]
            });
        } else {
            product.quantity = quantity
            setCartItems([...cartItems, {...product}])
        }
        toast.success(`${qty} ${product.name} added to the cart`)
    }
    const onRemove = (product) => {
        foundProduct = cartItems.find(item => item._id === product._id)
        setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price*foundProduct.quantity)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity)

        const newCartItems = cartItems.filter(item => item._id !== product._id)
        setCartItems(newCartItems)
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find(item => item._id === id)
        index = cartItems.findIndex(product => product._id === id)

        if (value == 'inc') {
            foundProduct = {...foundProduct, quantity: foundProduct.quantity+1}
            setCartItems((items) => {
                items.splice(index, 1, foundProduct)
                return [...items]
            });
            setTotalPrice(prevTotalPrice => prevTotalPrice + foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities+1)
        } else if (foundProduct.quantity > 1) {
            foundProduct = {...foundProduct, quantity: foundProduct.quantity-1}
            setCartItems((items) => {
                items.splice(index, 1, foundProduct)
                return [...items]
            });
            setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities-1)
        }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1)
    }
    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        })
    }

    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                onRemove,
                setShowCart,
                setCartItems,
                setTotalPrice, 
                setTotalQuantities,
                toggleCartItemQuantity
            }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)