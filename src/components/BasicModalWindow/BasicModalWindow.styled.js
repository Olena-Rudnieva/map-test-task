import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(18, 20, 23, 0.5);
  z-index: 100;
`;

export const ModalWrapper = styled.div`
  position: absolute;
  overflow-y: auto;
  display: flex;
  max-height: 100%;
  justify-content: center;
  border-radius: 24px;
  background-color: var(--white);
`;
