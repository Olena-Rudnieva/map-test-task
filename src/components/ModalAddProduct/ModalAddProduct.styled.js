import styled from 'styled-components';

export const Wrapper = styled.div`
  /* padding: 30px; */
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  border: 1px solid #111;
  width: 300px;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 1px 6px rgba(46, 47, 66, 0.08),
    0px 1px 1px rgba(46, 47, 66, 0.16), 0px 2px 1px rgba(46, 47, 66, 0.08);
`;

export const Label = styled.label`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const Input = styled.input`
  border: 1px solid #111;
  border-radius: 4px;
  padding: 4px;
  font-size: 16px;
`;

export const ButtonWrapper = styled.div`
  margin-top: 30px;
`;
