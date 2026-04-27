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
}

export const getCart = async () => {
    const response = await cartAPI.getCart();
    console.log(response.data)
    return response.data;
}