import React, { useEffect } from "react";

export function useFocusInput(ref, shouldFocus, label) {
  useEffect(() => {
    console.log(shouldFocus, label);
    if (shouldFocus) {
      console.log("object");
      ref && ref.current.focus();
    }
  }, [ref, shouldFocus, label]);
}
