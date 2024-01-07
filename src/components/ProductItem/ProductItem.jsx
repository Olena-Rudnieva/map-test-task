import {
  Icon,
  Img,
  ImgWrapper,
  Location,
  LocationWrapper,
  Price,
  Product,
  ProductWrapper,
  TextWrapper,
  Title,
} from './ProductItem.styled';
import sprite from '../../images/sprite.svg';

export const ProductItem = ({ product }) => {
  return (
    <ProductWrapper>
      <Product>
        <ImgWrapper>
          <Img src={product.img} alt={product.model} />
        </ImgWrapper>
        <TextWrapper>
          <Title>
            {product.make} {product.model}, {product.year}
          </Title>

          <Price>
            Вартість оренди: <b>{product.rentalPrice}</b>
          </Price>
          <LocationWrapper>
            <Icon>
              <use href={sprite + '#icon-map'}></use>
            </Icon>
            <Location>{product.address}</Location>
          </LocationWrapper>
        </TextWrapper>

        {/* <Button
          padding={'12px 98px'}
          type={'button'}
          text={'Learn more'}
          handleClick={handleModal}
        />
        {modal && (
          <BasicModalWindow handleModalToggle={handleModal}>
            <ModalCarDetails handleModalToggle={handleModal} car={car} />
          </BasicModalWindow>
        )} */}
      </Product>
    </ProductWrapper>
  );
};
