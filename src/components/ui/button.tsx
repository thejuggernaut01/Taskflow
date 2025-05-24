import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import Loader from '@/components/custom/loader';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-white transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 focus-visible:outline-primary',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white shadow hover:bg-primary/90 disabled:bg-custom-blue-5',
        destructive:
          'bg-destructive text-white shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-background/80 text-black',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary-foreground underline-offset-2 hover:underline !px-1',
        cancel: 'bg-[#C0BECE] text-white shadow hover:bg-[#C0BECE]/90',
      },
      size: {
        default: 'h-12 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
      layout: {
        full: 'w-full',
        max: 'w-max',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      layout: 'max',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isSubmitting?: boolean;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      layout,
      asChild = false,
      isSubmitting,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, layout, className }))}
        ref={ref}
        {...props}
      >
        {' '}
        {isSubmitting ? <Loader /> : children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
