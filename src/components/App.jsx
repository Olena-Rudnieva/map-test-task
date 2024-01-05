import { useJsApiLoader } from '@react-google-maps/api';
import { Map } from './Map/Map';
import { Loader } from './Loader/Loader';
import { Autocomplete } from './Autocomplete/Autocomplete';
import { useCallback, useState } from 'react';
const API_KEY = process.env.REACT_APP_API_KEY;
const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

const libraries = ['places'];

export const App = () => {
  const [center, setCenter] = useState(defaultCenter);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const onPlaceSelect = useCallback(coordinates => {
    setCenter(coordinates);
  }, []);

  return (
    <div>
      <div>
        <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect} />
        {/* <button>Markers</button> */}
      </div>
      <div>{isLoaded ? <Map center={center} /> : <Loader />}</div>
    </div>
  );
};
