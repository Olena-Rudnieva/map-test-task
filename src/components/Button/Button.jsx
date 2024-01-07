import { ButtonStyle } from './Button.styled';

export const Button = ({ type, text, handleClick }) => {
  return (
    <ButtonStyle type={type} onClick={handleClick}>
      {text}
    </ButtonStyle>
  );
};
