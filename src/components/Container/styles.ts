import styled from 'styled-components';

const StyledContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #002855;
  width: 100vw;
  max-width: 285px;
  height: 350px;
  padding: 1rem 0.75rem;
  margin: auto;

  @media (min-width: 768px) {
    max-width: 400px;
    height: 380px;
    padding: 1.5rem;
  }

  .container-password {
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    margin-bottom: 2rem;

    .icon {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .password {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .length-wrapper {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    color: white;
    margin-bottom: 1rem;

    input {
      width: 70%;
      background: none;
      border: none;
      border-bottom: 1px solid white;
      color: white;
      text-align: right;
      font-size: 1rem;
      outline: none;
    }

    /* To hide arrows from number input */
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    /* Firefox */
    input[type='number'] {
      -moz-appearance: textfield;
    }
  }

  .checkbox-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    margin-bottom: 1rem;

    svg {
      cursor: pointer;
    }
  }

  button {
    cursor: pointer;
    width: 100%;
    padding: 0.55rem;
    background: #0466c8;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    color: white;
    font-size: 1rem;
    margin-top: 1.5rem;

    &:hover {
      background: #1389ff;
    }
  }
`;

export { StyledContainer };
