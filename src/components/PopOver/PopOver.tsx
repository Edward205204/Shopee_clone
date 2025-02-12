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
  useRole
} from '@floating-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

interface PropType {
  children: React.ReactNode;
  className?: string;
}

export default function PopOver({ children, className }: PropType) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const data = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [shift(), flip(), offset(10), inline(), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
    transform: false,
    placement: 'bottom-end'
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
              className='p-5 text-sm text-black bg-white shadow-sm cursor-pointer pr-28 '
            >
              <span
                ref={arrowRef}
                style={{
                  left: data.middlewareData.arrow?.x,
                  top: data.middlewareData.arrow?.y
                }}
                className='absolute border-[10px] border-t-transparent border-l-transparent border-r-transparent border-white top-[-18px] left-[50%]'
              ></span>
              <button className='hover:text-[#ee4d2d] block mb-4'>Tiếng Việt</button>
              <button className='hover:text-[#ee4d2d] block'>English</button>
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  );
}
