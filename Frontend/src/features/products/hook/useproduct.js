import {createProduct,getSellerProduct,getAllProduct} from "../services/product.api";
import {useDispatch} from "react-redux";
import {setsellerproduct,setallproduct} from "../state/product.slice";


export const useProduct = () => {
    
    const dispatch = useDispatch();



    async function handleCreateProduct(formData){
        try {
            const data = await createProduct(formData);
            dispatch(setsellerproduct(data.product));
            return data.product;
        } catch (error) {
            throw error;
        }
    }

    async function handleGetSellerProduct(){
        try {
            const data = await getSellerProduct();
            dispatch(setsellerproduct(data.products));
            return data.product;
        } catch (error) {
            throw error;
        }
    }

    async function handleGetAllProduct(){
        try {
            const data = await getAllProduct();
            dispatch(setallproduct(data.products));
            return data.products;
        } catch (error) {
            throw error;
        }
    }

    return {
        handleCreateProduct,
        handleGetSellerProduct,
        handleGetAllProduct
    }
}