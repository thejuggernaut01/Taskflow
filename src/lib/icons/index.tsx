import { cloneElement } from 'react';
import { z } from 'zod';

import More from '@/assets/icons/more.svg?react';
import OpenEye from '@/assets/icons/open-eye.svg?react';
import SlashedEye from '@/assets/icons/slashed-eye.svg?react';

const iconEnums = z.enum(['more', 'open-eye', 'slashed-eye']);

export type iconTypes = z.infer<typeof iconEnums>;

interface IconInterface extends React.SVGProps<SVGSVGElement> {
  name: iconTypes;
  svgProp?: React.SVGProps<SVGElement>;
  className?: string;
}

const icons: Record<iconTypes, JSX.Element> = {
  more: <More />,
  'open-eye': <OpenEye />,
  'slashed-eye': <SlashedEye />,
};

const Icon = ({ name, svgProp, className, ...props }: IconInterface) => {
  return cloneElement(icons[name], { className, ...props, ...svgProp });
};

export default Icon;
