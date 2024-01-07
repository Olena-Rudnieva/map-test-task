import { GoogleMap, Marker } from '@react-google-maps/api';
import React, { useCallback, useRef } from 'react';
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

export const Map = ({ place }) => {
  const mapRef = useRef(undefined);

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = undefined;
  }, []);

  return (
    <MapWrapper>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={place}
        zoom={6.5}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
        {products.map(product => (
          <Marker
            key={product.id}
            map={mapRef.current}
            position={{
              lat: product.coordinates.lat,
              lng: product.coordinates.lng,
            }}
            onClick={() => console.log(product)}
          />
        ))}
      </GoogleMap>
    </MapWrapper>
  );
};
