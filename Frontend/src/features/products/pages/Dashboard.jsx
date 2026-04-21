import React, { useEffect } from 'react'
import { useProduct } from '../hook/useproduct'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const { handleGetSellerProduct } = useProduct()
    const sellerproduct = useSelector(
        (state) => state.product.sellerproduct
    )
    console.log(sellerproduct)
    useEffect(() => {
        handleGetSellerProduct()
    }, []);
    return (
        <div>
            dashboard
        </div>
    )
}

export default Dashboard