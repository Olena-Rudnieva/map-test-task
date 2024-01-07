import { GoogleMap, Marker } from '@react-google-maps/api';
import React, { useCallback, useRef, useState } from 'react';
import { MapWrapper } from './Map.styled';
import { products } from 'utils/data';

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
  const mapRef = useRef(null);
  const [visibleProducts, setVisibleProducts] = useState([]);

  const updateVisibleProducts = useCallback(() => {
    if (mapRef.current) {
      const bounds = mapRef.current.getBounds();

      if (bounds) {
        const filteredProducts = products.filter(product => {
          return bounds.contains(
            new window.google.maps.LatLng(
              product.coordinates.lat,
              product.coordinates.lng
            )
          );
        });

        setVisibleProducts(filteredProducts);
        setZoomingProducts(filteredProducts);
      }
    }
  }, [setZoomingProducts]);

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
        zoom={6}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
        {visibleProducts.map(product => (
          <Marker
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

export default Map;
