import { Wrapper } from 'components/App.styled';
import { Button } from 'components/Button/Button';
import { ButtonWrapper, Form, Input, Label } from './ModalAddProduct.styled';
import { useMemo, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';

// const API_KEY = process.env.API_KEY;
const API_KEY = 'AIzaSyB4mS4uj8ECVBkeDr2hozHfagX3ucWIBRc';

export const ModalAddProduct = ({ handleModalToggle }) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [place, setPlace] = useState('');

  const handleChange = event => {
    switch (event.target.name) {
      case 'make':
        setMake(event.target.value);
        break;
      case 'model':
        setModel(event.target.value);
        break;
      case 'year':
        setYear(event.target.value);
        break;
      case 'image':
        setImage(event.target.value);
        break;
      case 'rentalPrice':
        setRentalPrice(event.target.value);
        break;
      case 'place':
        setPlace(event.target.value);
        break;
      default:
        return;
    }
  };

  const data = { make, model, year, img: image, rentalPrice, address: place };

  const productsCollectionRef = useMemo(() => collection(db, 'products2'), []);

  const addProduct = async () => {
    try {
      const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        place
      )}&key=${API_KEY}`;
      const geocodingResponse = await fetch(geocodingUrl);
      const geocodingData = await geocodingResponse.json();
      const { lat, lng } = geocodingData.results[0].geometry.location;
      const newCoordinates = {
        lat: lat,
        lng: lng,
      };

      const newData = {
        ...data,
        coordinates: newCoordinates,
      };
      await addDoc(productsCollectionRef, newData);
    } catch (error) {
      alert('Помилка при геокодуванні');
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!make || !model || !year || !image || !rentalPrice || !place) {
      alert('Введіть дані!');
      return;
    }
    console.log(data);
    addProduct();
    handleModalToggle();
    reset();
    alert(
      'Ваша пропозиція додана. Оновіть сторінку для відображення на карті.'
    );
  };

  const reset = () => {
    setMake('');
    setModel('');
    setYear('');
    setImage('');
    setRentalPrice('');
    setPlace('');
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Label>
          <Input
            type="text"
            name="make"
            required
            value={make}
            placeholder="Марка авто"
            onChange={handleChange}
          />
        </Label>
        <Label>
          <Input
            type="text"
            name="model"
            required
            value={model}
            placeholder="Модель"
            onChange={handleChange}
          />
        </Label>
        <Label>
          <Input
            type="text"
            name="year"
            required
            value={year}
            placeholder="Рік випуску"
            onChange={handleChange}
          />
        </Label>
        <Label>
          <Input
            type="text"
            name="image"
            required
            value={image}
            placeholder="Фото"
            onChange={handleChange}
          />
        </Label>
        <Label>
          <Input
            type="text"
            name="rentalPrice"
            required
            value={rentalPrice}
            placeholder="Вартість оренди"
            onChange={handleChange}
          />
        </Label>
        <Label>
          <Input
            type="text"
            name="place"
            required
            value={place}
            placeholder="Місто"
            onChange={handleChange}
          />
        </Label>

        <ButtonWrapper>
          <Button
            padding={'12px 50px'}
            text={'Додати пропозицію'}
            type={'submit'}
            handleClick={handleSubmit}
          />
        </ButtonWrapper>
      </Form>
    </Wrapper>
  );
};
