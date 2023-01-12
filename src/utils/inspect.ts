export const inspect =
  (b: string | number) =>
  <A>(a: A) => {
    console.log(b, a);
    return a;
  };
