import { useJsApiLoader } from '@react-google-maps/api';
import { Map } from './Map/Map';
import { Loader } from './Loader/Loader';
import { useCallback, useState } from 'react';
import {
  MapWrapper,
  ProductsTitle,
  ProductsWrapper,
  Wrapper,
} from './App.styled';
import { Layout } from './Layout/Layout';
import { ProductsList } from './ProductsList/ProductsList';
import { products } from '../utils/data';
import { Places } from './Places/Places';

const API_KEY = process.env.REACT_APP_API_KEY;
const defaultCenter = {
  lat: 50.5701,
  lng: 30.5168,
};

const libraries = ['places'];

export const App = () => {
  const [place, setPlace] = useState(defaultCenter);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const onPlaceSelect = useCallback(coordinates => {
    setPlace(coordinates);
  }, []);

  return (
    <>
      {isLoaded ? (
        <Layout>
          <Wrapper>
            <MapWrapper>
              <Map place={place} />
            </MapWrapper>
            <ProductsWrapper>
              <Places isLoaded={isLoaded} onSelect={onPlaceSelect} />
              <ProductsTitle>Products</ProductsTitle>
              <ProductsList products={products} />
            </ProductsWrapper>
          </Wrapper>
        </Layout>
      ) : (
        <Loader />
      )}
    </>
  );
};
