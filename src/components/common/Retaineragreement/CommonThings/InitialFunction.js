export function InitialFunction(initial ) {
    return initial?.length === 2
      ? initial
      : initial
          .split(" ")
          .filter((word) => word)
          .map((word) => word[0])
          .join(" ");
  }
  