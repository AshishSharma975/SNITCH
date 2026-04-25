import axios from "axios";


const productApi = axios.create({
    baseURL: "/api/product",
    withCredentials: true,
});



export async function createProduct(formData){
    try {
        const response = await productApi.post("/create", formData);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export async function getSellerProduct(){
    try {
        const response = await productApi.get("/seller");
        return response.data;
    } catch (error) {
        throw error;
    }
}


export async function getAllProduct(){
    try {
        const response = await productApi.get("/");
        return response.data;
    } catch (error) {
        throw error;
    }
}


export async function getProductById(productId){


    try {
        const response = await productApi.get(`/details/${productId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function addProductVariant(productId, newProductVariant){
    const formData = new FormData();

    newProductVariant.images.forEach((img) => {
        if(img.file) {
            formData.append("images", img.file);
        }
    });

    formData.append("stock", newProductVariant.stock);
    formData.append("priceAmount", newProductVariant.price.amount);
    formData.append("attributes", JSON.stringify(newProductVariant.attributes));

    try {
        const response = await productApi.post(`/${productId}/variant`, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteProductVariant(productId, variantId){
    try {
        const response = await productApi.delete(`/${productId}/variant/${variantId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default productApi;