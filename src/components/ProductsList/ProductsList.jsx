import { ProductItem } from 'components/ProductItem/ProductItem';
import { Products } from './ProductsList.styled';

export const ProductsList = ({ products }) => {
  return (
    <>
      <Products>
        {products.map(product => (
          <ProductItem product={product} key={product.id} />
        ))}
      </Products>
    </>
  );
};
