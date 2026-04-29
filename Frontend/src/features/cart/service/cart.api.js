import axios from "axios"

const cartAPIinstance = axios.create({
    baseURL: "/api/cart",
    withCredentials: true,
});

export const cartAPI = {
    addToCart: (productId,variantId,quantity) => {
        return cartAPIinstance.post(`add/${productId}/${variantId}`,{quantity});
    },
    getCart: () => {
        return cartAPIinstance.get("/");
    },
    updateQuantity: (productId,variantId,quantity) => {
        return cartAPIinstance.put(`update/${productId}/${variantId}`,{quantity});
    },
    removeCart: (productId,variantId) => {
        return cartAPIinstance.delete(`remove/${productId}/${variantId}`);
    },
    incrementQuantity: (productId,variantId) => {
        return cartAPIinstance.patch(`quantity/increment/${productId}/${variantId}`);
    },
    createRazorpayOrder: () => {
        return cartAPIinstance.post(`payment/create/order`);
    },
    verifyPayment: (paymentData) => {
        return cartAPIinstance.post(`payment/verify`, paymentData);
    },
    getOrders: () => {
        return cartAPIinstance.get(`/payment/orders`);
    }
}

export const getCart = async () => {
    const response = await cartAPI.getCart();
    console.log(response.data)
    return response.data;
}

export const incrementQuantity = async (productId,variantId) => {
    const response = await cartAPI.incrementQuantity(productId,variantId);
    console.log(response.data)
    return response.data;
}

export const decrementQuantity = async (productId,variantId) => {
    const response = await cartAPI.updateQuantity(productId,variantId,getCart().items.find(item => item.productId.toString() === productId && item.variantId.toString() === variantId).quantity - 1);
    console.log(response.data)
    return response.data;
}

export const createRazorpayOrder = async (cartId) => {
    const response = await cartAPI.createRazorpayOrder(cartId);
    console.log(response.data)
    return response.data;
}