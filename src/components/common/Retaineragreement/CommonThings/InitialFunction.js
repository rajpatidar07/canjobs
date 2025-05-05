// eslint-disable-next-line import/no-anonymous-default-export
export default function InitialFunction({initial}) {
    return initial.length === 2
      ? initial
      : initial
          .split(" ")
          .filter((word) => word)
          .map((word) => word[0])
          .join(" ");
}
