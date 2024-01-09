import { GoogleMap, Marker } from '@react-google-maps/api';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { MapWrapper } from './Map.styled';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
// import { products } from 'utils/data';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  clickableIcons: false,
};

export const Map = ({ place, setZoomingProducts, setSelectedProduct }) => {
  const mapRef = useRef(undefined);
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);

  const productsCollectionRef = useMemo(() => collection(db, 'products2'), []);

  useEffect(() => {
    const allProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    allProducts();
  }, [productsCollectionRef]);

  console.log('Visible', visibleProducts);

  const updateVisibleProducts = useCallback(() => {
    console.log('My products', products);

    if (mapRef.current) {
      const bounds = mapRef.current.getBounds();

      if (bounds) {
        const filteredProducts = products.filter(({ coordinates }) => {
          const { lat, lng } = coordinates;
          const productLatLng = new window.google.maps.LatLng(lat, lng);
          return bounds.contains(productLatLng);
        });

        setVisibleProducts(filteredProducts);
        setZoomingProducts(filteredProducts);
      }
    }
  }, [setZoomingProducts, products]);

  const onLoad = useCallback(
    function callback(map) {
      mapRef.current = map;
      updateVisibleProducts();
      mapRef.current.addListener('bounds_changed', updateVisibleProducts);
    },
    [updateVisibleProducts]
  );

  const onUnmount = useCallback(
    function callback(map) {
      if (mapRef.current) {
        mapRef.current.removeListener('bounds_changed', updateVisibleProducts);
      }
      mapRef.current = undefined;
    },
    [updateVisibleProducts]
  );

  return (
    <MapWrapper>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={place}
        zoom={6.3}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
        {/* {visibleProducts.map(product => (
          <Marker
            map={mapRef.current}
            key={product.id}
            position={{
              lat: product.coordinates.lat,
              lng: product.coordinates.lng,
            }}
            onClick={() => setSelectedProduct(product)}
          />
        ))} */}
        {products.map(product => (
          <Marker
            map={mapRef.current}
            key={product.id}
            position={{
              lat: product.coordinates.lat,
              lng: product.coordinates.lng,
            }}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </GoogleMap>
    </MapWrapper>
  );
};
