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

  const productsCollectionRef = useMemo(() => collection(db, 'products'), []);
  console.log('Map products', products);

  // useEffect(() => {
  //   const allProducts = async () => {
  //     const data = await getDocs(productsCollectionRef);
  //     setProducts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  //   };
  //   allProducts();
  // }, [productsCollectionRef]);

  // const updateVisibleProducts = useCallback(() => {
  //   if (mapRef.current) {
  //     const bounds = mapRef.current.getBounds();

  //     if (bounds) {
  //       const filteredProducts = products.filter(product => {
  //         return bounds.contains(
  //           new window.google.maps.LatLng(
  //             product.coordinates._lat,
  //             product.coordinates._long
  //           )
  //         );
  //       });
  //       console.log(filteredProducts);
  //       setVisibleProducts(filteredProducts);
  //       setZoomingProducts(filteredProducts);
  //     }
  //   }
  // }, [setZoomingProducts, products]);

  useEffect(() => {
    const allProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      const newProducts = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(newProducts);
    };
    allProducts();
  }, [productsCollectionRef]);

  const updateVisibleProducts = useCallback(() => {
    if (mapRef.current) {
      const bounds = mapRef.current.getBounds();

      if (bounds) {
        const filteredProducts = products.filter(product => {
          return bounds.contains(
            new window.google.maps.LatLng(
              product.coordinates._lat,
              product.coordinates._long
            )
          );
        });
        setVisibleProducts(filteredProducts);
      }
    }
  }, [products]);

  useEffect(() => {
    updateVisibleProducts();
  }, [place, products, updateVisibleProducts]);

  console.log('Visible products', visibleProducts);

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
        {products.map(product => (
          <Marker
            key={product.id}
            position={{
              lat: product.coordinates._lat,
              lng: product.coordinates._long,
            }}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </GoogleMap>
    </MapWrapper>
  );
};
