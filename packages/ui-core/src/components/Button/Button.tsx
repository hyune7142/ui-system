import { StyledButton } from './styled';
import type { ButtonProps } from './types';

export const Button = ({ children, size = 'medium', className, ...props }: ButtonProps) => {
  const sizeClass = `size-${size}`;
  const combinedClassName = className ? `${sizeClass} ${className}` : sizeClass;

  return (
    <StyledButton className={combinedClassName} {...props}>
      {children}
    </StyledButton>
  );
};
