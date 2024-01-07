import styled from 'styled-components';

export const ButtonStyle = styled.button`
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.43;
  background: #14161a;
  padding: 10px 30px;
  border-radius: 12px;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  transition: background 300ms var(--transition);

  &:hover,
  &:focus {
    background: #4a556c;
  }
`;
