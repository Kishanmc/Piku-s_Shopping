import React from 'react';
import { useParams } from 'react-router-dom';
import Breadcrum from '../component/breadcrum/breadcrum';
import { useShopContext } from '../contents/shopcontext';
import ProductDisplay from '../component/productdisplay/productdisplay';
import DescriptionBox from '../component/descibe/describe';
import RelatedProducts from '../component/RelatedProducts/RelatedProducts';

const Product = () => {
    const { all_product } = useShopContext();
    const { productid } = useParams();

    const product = all_product.find((item) => item.id === Number(productid));

    if (!product) {
        return <div>Loading product...</div>;
    }

    return (
        <div>
            <Breadcrum product={product} />
            <ProductDisplay product={product} />
            <DescriptionBox product={product} />
            <RelatedProducts product={product} />
        </div>
    );
};

export default Product;
