import axios from "axios";


const productApi = axios.create({
    baseURL: "http://localhost:3000/api/product",
    withCredentials:true,
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

export default productApi;