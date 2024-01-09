import { Button } from 'components/Button/Button';
import { HeaderWrapper } from './Header.styled';
import { useState } from 'react';
import { BasicModalWindow } from 'components/BasicModalWindow/BasicModalWindow';
import { ModalAddProduct } from 'components/ModalAddProduct/ModalAddProduct';

export const Header = () => {
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(state => !state);
  };

  return (
    <HeaderWrapper>
      <Button
        text={'Додати пропозицію'}
        type={'button'}
        handleClick={handleModal}
      />
      {modal && (
        <BasicModalWindow handleModalToggle={handleModal}>
          <ModalAddProduct handleModalToggle={handleModal} />
        </BasicModalWindow>
      )}
    </HeaderWrapper>
  );
};
