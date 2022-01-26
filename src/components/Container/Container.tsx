import { StyledContainer } from './styles';

type ContainerProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Container: React.FC<ContainerProps> = ({ children, handleSubmit }) => (
  <StyledContainer onSubmit={handleSubmit}>{children}</StyledContainer>
);

export { Container };
