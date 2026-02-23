import styled from 'styled-components';

export const StyledButton = styled.button`
  background-color: var(--palette-primary-main);
  color: #ffffff;
  margin: var(--button-margin-base);
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &.size-small {
    padding: var(--button-padding-small);
    font-size: var(--button-fontSize-small);
  }

  &.size-medium {
    padding: var(--button-padding-medium);
    font-size: var(--button-fontSize-medium);
  }

  &.size-large {
    padding: var(--button-padding-large);
    font-size: var(--button-fontSize-large);
  }

  &:hover {
    opacity: 0.8;
    background-color: var(--palette-primary-main);
  }
`;
