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
        try{
            const res = await cartAPI.getCart();
            dispatch(setCart(res.data.cart));
        }catch(err){
            console.log(err);
        }
    }
    return {
        addToCart,
        getCart
    }
}