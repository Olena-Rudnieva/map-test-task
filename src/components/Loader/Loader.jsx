import { ThreeDots } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';

export const Loader = () => (
  <LoaderWrapper>
    <ThreeDots
      height="80"
      width="80"
      radius={1}
      color="var(--black)"
      ariaLabel="puff-loading"
      visible={true}
    />
  </LoaderWrapper>
);
