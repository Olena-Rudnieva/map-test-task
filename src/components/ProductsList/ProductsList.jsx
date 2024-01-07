import { ProductItem } from 'components/ProductItem/ProductItem';
import { Products } from './ProductsList.styled';
// import { Container } from 'components/Container/Container';

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
