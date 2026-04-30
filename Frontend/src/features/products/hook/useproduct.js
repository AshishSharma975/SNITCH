import {createProduct,getSellerProduct,getAllProduct,getProductById,addProductVariant,deleteProductVariant} from "../services/product.api";
import {useDispatch} from "react-redux";
import {setsellerproduct,setallproduct} from "../state/product.slice";


export const useProduct = () => {
    
    const dispatch = useDispatch();



    async function handleCreateProduct(formData){
        try {
            const data = await createProduct(formData);
            // DO NOT overwrite the array state with the single product object.
            // The dashboard will refetch the list when it mounts.
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

    async function handleGetProductById(productId){
        try {
            const data = await getProductById(productId);
            return data.product;
        } catch (error) {
            throw error;
        }
    }

    async function handleCreateProductVariant(productId, newProductVariant){
        try {
            const data = await addProductVariant(productId, newProductVariant);
            return data.variant;
        } catch (error) {
            throw error;
        }
    }

    async function handleDeleteProductVariant(productId, variantId){
        try {
            const data = await deleteProductVariant(productId, variantId);
            return data.product;
        } catch (error) {
            throw error;
        }
    }

    return {
        handleCreateProduct,
        handleGetSellerProduct,
        handleGetAllProduct,
        handleGetProductById,
        handleCreateProductVariant,
        handleDeleteProductVariant
    }
}