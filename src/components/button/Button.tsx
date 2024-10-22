import { ComponentPropsWithoutRef, forwardRef, PropsWithChildren } from 'react';
import { Slot, Slottable } from '../common/slot';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  ({ asChild, children, ...restProps }, ref) => {
    const Element = asChild ? Slot : 'button';

    return (
      <Element ref={ref} {...restProps}>
        <Slottable>{children}</Slottable>
      </Element>
    );
  }
);

Button.displayName = 'Button';

export default Button;
