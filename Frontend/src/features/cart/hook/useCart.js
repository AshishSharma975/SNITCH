import { cartAPI } from "../service/cart.api";
import { useDispatch } from "react-redux";
import { addToCart as addToCartAction, setCart, incrementItemQuantity, decrementItemQuantity, removeItem, clearCart } from "../state/cart.slice";

export const useCart = () => {
    const dispatch = useDispatch();
    const addToCart = async (productId,variantId,quantity,price) => {
        try{
            const res = await cartAPI.addToCart(productId,variantId,quantity);
            dispatch(setCart(res.data.cart));
        }catch(err){
            console.log(err);
        }
    }

    const getCart = async () => {
        try {
            const res = await cartAPI.getCart();
            dispatch(setCart(res.data.cart));
            return res.data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    const handleGetCart = async () => {
        try {
            await getCart();
        } catch (err) {
            console.log(err);
        }
    }

    const handleRemoveFromCart = async (productId, variantId) => {
        try {
            const res = await cartAPI.removeCart(productId, variantId);
            dispatch(setCart(res.data.cart));
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdateQuantity = async (productId, variantId, quantity) => {
        if (quantity < 1) return;
        try {
            const res = await cartAPI.updateQuantity(productId, variantId, quantity);
            dispatch(setCart(res.data.cart));
        } catch (err) {
            console.log(err);
        }
    }

    const handleIncrementQuantity = async (productId, variantId) => {
        try {
            const res = await cartAPI.incrementQuantity(productId, variantId);
            dispatch(setCart(res.data.cart));
        } catch (err) {
            console.log(err);
        }
    }

    const handleDecrementQuantity = async (productId, variantId) => {
        try {
            const res = await cartAPI.decrementQuantity(productId, variantId);
            dispatch(decrementItemQuantity({productId,variantId}));
        } catch (err) {
            console.log(err);
        }
    }

    const handleRemoveItem = async (productId, variantId) => {
        try {
            const res = await cartAPI.removeCart(productId, variantId);
            dispatch(removeItem({productId,variantId}));
        } catch (err) {
            console.log(err);
        }
    }

    const handleClearCart = async () => {
        try {
            const res = await cartAPI.clearCart();
            dispatch(clearCart());
        } catch (err) {
            console.log(err);
        }
    }

    const handleCreateRazorpayOrder = async () => {
        try {
            const res = await cartAPI.createRazorpayOrder();
            return res.data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    
    const handleVerifyPayment = async (paymentData) => {
        try {
            const res = await cartAPI.verifyPayment(paymentData);
            dispatch(clearCart());
            return res.data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    const handleGetOrders = async () => {
        try {
            const res = await cartAPI.getOrders();
            return res.data.orders;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    
    return {
        addToCart,
        getCart,
        handleGetCart,
        handleRemoveFromCart,
        handleUpdateQuantity,
        handleIncrementQuantity,
        handleDecrementQuantity,
        handleRemoveItem,
        handleClearCart,
        handleCreateRazorpayOrder,
        handleVerifyPayment,
        handleGetOrders
    }
}