import React from 'react';
import { cn } from '@/lib/utils';

type LoaderProps = {
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ className }) => {
  return (
    <>
      <span
        className={cn(
          'w-7 h-7 border-4 border-white border-b-transparent rounded-full inline-block loader-animation',
          className
        )}
      ></span>
    </>
  );
};

export default Loader;
