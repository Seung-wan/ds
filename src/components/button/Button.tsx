import { ComponentPropsWithoutRef, forwardRef, PropsWithChildren } from 'react';
import classnames from 'classnames';
import { Slot, Slottable } from '../common/slot';

import '@/index.css';
import Spinner from '../spinner/Spinner';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  (
    { asChild, className, isLoading = false, children, disabled, ...restProps },
    ref
  ) => {
    const Element = asChild ? Slot : 'button';

    return (
      <Element
        className={classnames(
          'border border-gray-300 p-2 w-[120px]',
          { 'flex justify-center': isLoading },
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...restProps}
      >
        {isLoading ? <Spinner size="md" /> : <Slottable>{children}</Slottable>}
      </Element>
    );
  }
);

Button.displayName = 'Button';

export default Button;
