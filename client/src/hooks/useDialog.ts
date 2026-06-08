import { useEffect, useRef, useState } from "react";

export const useDialog = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const showDialog = () => {
    setIsOpen(true);
  };

  const hideDialog = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!containerRef.current) return;

      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        !triggerRef.current?.contains(event.target as Node)
      ) {
        console.log("Closed");
        hideDialog();
      }
    };

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  return {
    showDialog,
    hideDialog,
    isOpen,
    containerRef,
    triggerRef,
  };
};
