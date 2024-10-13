import {
  forwardRef,
  PropsWithChildren,
  HTMLAttributes,
  Children,
  isValidElement,
  cloneElement,
  ReactNode,
  ReactElement,
  Ref,
  MutableRefObject,
} from 'react';

interface SlotProps extends HTMLAttributes<HTMLElement> {}

export const Slot = forwardRef<HTMLElement, PropsWithChildren<SlotProps>>(
  ({ children, ...restProps }, ref) => {
    const childrenArray = Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);

    if (slottable) {
      const newElement = slottable.props.children as ReactNode;
      const newChildren = childrenArray.map((children) => {
        if (children !== slottable) {
          return children;
        }

        if (isValidElement(newElement)) {
          return newElement.props.children;
        }

        return null;
      });

      return isValidElement(newElement)
        ? cloneElement(
            newElement,
            {
              ...(mergeProps(restProps, newElement.props) as any),
              ref: ref
                ? composeRefs(ref, (newElement as any).ref)
                : (newElement as any).ref,
            },
            newChildren
          )
        : null;
    }

    if (isValidElement(children)) {
      return cloneElement(children, {
        ...(mergeProps(restProps, children.props) as any),
        ref: ref
          ? composeRefs(ref, (children as any).ref)
          : (children as any).ref,
      });
    }

    return null;
  }
);

export const Slottable = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

const isSlottable = (children: ReactNode): children is ReactElement => {
  return isValidElement(children) && children.type === Slottable;
};

type PossibleRef<T> = Ref<T> | undefined;

function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as MutableRefObject<T>).current = value;
  }
}

function composeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T) => refs.forEach((ref) => setRef(ref, node));
}

type AnyProps = Record<string, any>;

function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);

    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === 'style') {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue]
        .filter(Boolean)
        .join(' ');
    }
  }

  return { ...slotProps, ...overrideProps };
}
