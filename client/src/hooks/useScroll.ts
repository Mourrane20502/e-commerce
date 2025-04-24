import { useEffect, useState } from "react";

export default function useScroll(initialValue: boolean = false) {
  const [isScrolled, setIsScrolled] = useState(initialValue);
  const hansleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", hansleScroll);
    return () => {
      window.removeEventListener("scroll", hansleScroll);
    };
  }, []);

  return { isScrolled };
}
