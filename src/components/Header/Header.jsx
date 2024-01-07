import { Button } from 'components/Button/Button';
import { HeaderWrapper } from './Header.styled';

export const Header = ({ handleClick }) => (
  <HeaderWrapper>
    <Button text={'Add product'} type={'button'} handleClick={handleClick} />
  </HeaderWrapper>
);
