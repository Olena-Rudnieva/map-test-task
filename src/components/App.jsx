import { useJsApiLoader } from '@react-google-maps/api';
import { Map } from './Map/Map';
import { Loader } from './Loader/Loader';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  MapWrapper,
  ProductsTitle,
  ProductsWrapper,
  Wrapper,
} from './App.styled';
import { Layout } from './Layout/Layout';
import { ProductsList } from './ProductsList/ProductsList';
import { Places } from './Places/Places';
import { ProductItem } from './ProductItem/ProductItem';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const API_KEY = process.env.REACT_APP_API_KEY;

const defaultCenter = {
  lat: 50.5701,
  lng: 30.5168,
};

const libraries = ['places'];

export const App = () => {
  const [products, setProducts] = useState([]);
  const [place, setPlace] = useState(defaultCenter);
  const [zoomingProducts, setZoomingProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const onPlaceSelect = useCallback(coordinates => {
    setPlace(coordinates);
  }, []);

  const productsCollectionRef = useMemo(() => collection(db, 'products'), []);

  useEffect(() => {
    const allProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    allProducts();
  }, [productsCollectionRef]);

  console.log('App products', products);
  console.log('ZoomingProducts', zoomingProducts);

  return (
    <>
      {isLoaded ? (
        <Layout>
          <Wrapper>
            <MapWrapper>
              {
                <Map
                  place={place}
                  setZoomingProducts={setZoomingProducts}
                  setSelectedProduct={setSelectedProduct}
                />
              }
            </MapWrapper>
            <ProductsWrapper>
              <Places isLoaded={isLoaded} onSelect={onPlaceSelect} />
              <ProductsTitle>Пропозиції</ProductsTitle>
              {selectedProduct ? (
                <ul>
                  <ProductItem product={selectedProduct} />
                </ul>
              ) : (
                <ProductsList
                  products={
                    zoomingProducts.length > 0 ? zoomingProducts : products
                  }
                />
              )}
            </ProductsWrapper>
          </Wrapper>
        </Layout>
      ) : (
        <Loader />
      )}
    </>
  );
};
