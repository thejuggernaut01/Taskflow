import * as React from 'react';

import { cn } from '@/lib/utils';
import Icon from '@/lib/icons';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [toggle, setToggle] = React.useState(false);
    return (
      <div className="relative">
        <input
          type={toggle ? 'text' : 'password'}
          id="password"
          className={cn(
            'flex h-12 w-full rounded-lg border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-inactive outline-2 outline-primary focus-visible:outline-primary pl-4 md:text-base placeholder:text-sm text-secondary',
            className
          )}
          ref={ref}
          placeholder="Password"
          {...props}
        />
        <button
          type="button"
          onClick={() => setToggle((prev) => !prev)}
          className="focus-visible:outline-primary absolute top-[35%] right-5"
        >
          <Icon name={toggle ? 'open-eye' : 'slashed-eye'} />
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
