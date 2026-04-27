import { cartAPI } from "../service/cart.api";
import { useDispatch } from "react-redux";
import { addToCart as addToCartAction, setCart } from "../state/cart.slice";

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
    
    return {
        addToCart,
        getCart,
        handleGetCart,
        handleRemoveFromCart,
        handleUpdateQuantity
    }
}