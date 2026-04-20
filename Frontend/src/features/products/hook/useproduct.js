import {createProduct,getSellerProduct} from "../services/product.api";
import {useDispatch} from "react-redux";
import {setsellerproduct} from "../state/product.slice";


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

    return {
        handleCreateProduct,
        handleGetSellerProduct
    }
}