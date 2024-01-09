import styled from 'styled-components';

export const Btn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: transparent;
  border: none;
  z-index: 200;
  width: 24px;
  height: 24px;
  padding: 0;
`;

export const Icon = styled.svg`
  width: 100%;
  height: 100%;
  scale: 1;
  stroke: var(--black);

  transition: scale 200ms var(--transition), stroke 200ms var(--transition);

  &:hover,
  &:focus {
    stroke: var(--accent);
    scale: 1.2;
  }
`;
