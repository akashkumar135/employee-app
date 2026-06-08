import { useEffect, useState, type Ref, type RefObject } from "react";

// type UseDialogProps = {
//   containerRef: ;
//   targetRef: RefObject<HTMLDivElement>;
// };

export const useDialog = (
  containerRef: RefObject<HTMLDivElement | null>,
  targetRef: RefObject<HTMLDivElement | null>,
) => {
  const [isOpen, setIsOpen] = useState(false);

  const showDialog = () => {
    setIsOpen(true);
  };

  const hideDialog = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    if (!targetRef.current) return;

    const handler = (event: Event) => {
      if (!containerRef.current) return;

      if (containerRef.current.contains(event.target)) {
        console.log("Clicked");
      }
    };

    containerRef.current.addEventListener("click", handler);

    return () => {
      if (!containerRef.current) return;

      containerRef.current.removeEventListener("click", handler);
    };
  }, []);

  return {
    showDialog,
    hideDialog,
    isOpen,
  };
};
