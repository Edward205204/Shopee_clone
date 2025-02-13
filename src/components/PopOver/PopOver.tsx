import { useId, useRef, useState } from 'react';
import {
  useFloating,
  autoUpdate,
  useHover,
  useInteractions,
  FloatingPortal,
  shift,
  flip,
  safePolygon,
  offset,
  inline,
  arrow,
  useFocus,
  useDismiss,
  useRole,
  Placement
} from '@floating-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

interface PropType {
  children: React.ReactNode;
  renderProps: React.ReactNode;
  className?: string;
  popOverClass?: string;
  placementProps?: Placement;
}

export default function PopOver({
  children,
  className,
  renderProps,
  popOverClass,
  placementProps = 'bottom-end'
}: PropType) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const data = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [shift(), flip(), offset(10), inline(), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
    transform: false,
    placement: placementProps
  });
  const { refs, floatingStyles, context } = data;
  const hover = useHover(context, { handleClose: safePolygon() });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);
  const id = useId();
  return (
    <div className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0
              }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ ease: 'easeOut', duration: 0.3 }}
              ref={refs.setFloating}
              style={{
                transformOrigin: `${data.middlewareData.arrow?.x}px top`,
                ...floatingStyles
              }}
              {...getFloatingProps()}
              className={popOverClass}
            >
              <span
                ref={arrowRef}
                style={{
                  left: data.middlewareData.arrow?.x,
                  top: data.middlewareData.arrow?.y
                }}
                className='absolute border-[10px] border-t-transparent border-l-transparent border-r-transparent border-white top-[-18px]'
              ></span>
              {renderProps}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  );
}
