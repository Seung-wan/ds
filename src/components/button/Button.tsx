import {
  ComponentPropsWithoutRef,
  forwardRef,
  PropsWithChildren,
  ReactNode,
} from 'react';
import classnames from 'classnames';

import { Slot, Slottable } from '../common/slot';
import Spinner from '../spinner/Spinner';

import '@/index.css';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

/**
 *  Button 컴포넌트입니다.
 *  @param asChild 렌더링 위임을 위해 사용합니다.
 *  @param isLoading 로딩 상태를 처리하기 위해 사용합니다.
 *  @example
 * ```
 *  <Button>로그인</Button>
 *  <Button isLoading={isLoginLoading}>로그인</Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  (
    {
      className,
      asChild,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...restProps
    },
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
        {isLoading ? (
          <Spinner size="md" />
        ) : (
          <Slottable>
            {leftIcon && leftIcon}
            {children}
            {rightIcon && rightIcon}
          </Slottable>
        )}
      </Element>
    );
  }
);

Button.displayName = 'Button';

export default Button;
