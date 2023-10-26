import { FC, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  id: string;
  children: ReactNode | ReactNode[];
};

export const PortalComponent: FC<Props> = ({ id, children }) => {
  const element = useRef(document.querySelector(`#${id}`) || document.createElement('div'));

  return createPortal(children, element.current);
};
