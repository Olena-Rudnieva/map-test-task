import styled from 'styled-components';

export const ProductWrapper = styled.li`
  width: 274px;
  color: #14161a;
  background-color: #ffffff;
  border-radius: 14px;
`;

export const Product = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const ImgWrapper = styled.div`
  overflow: hidden;
  border-radius: 14px;
  width: 250px;
  height: 150px;
  margin-bottom: 14px;
`;

export const Img = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 14px;
  cursor: pointer;
  transform: scale(1);
  transition: 0.3s ease-in-out;

  &:hover,
  &:focus {
    transform: scale(1.1);
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Title = styled.p`
  max-width: 235px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 8px;
`;

export const Price = styled.p`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 8px;
`;

export const LocationWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

export const Icon = styled.svg`
  width: 24px;
  height: 24px;
`;

export const Location = styled.p`
  font-size: 14px;
  font-weight: 400;
`;
