export const configService = (lazyServices: AllLazyServices) => {
  // @ts-ignore
  const getService = <A extends keyof AllLazyServices>(service: A) =>
    lazyServices[service]()(getService);

  const services = (Object.keys(lazyServices) as (keyof typeof lazyServices)[]).reduce(
    (prev, curr) => {
      prev[curr] = getService(curr);
      return prev;
    },
    {} as AllServices,
  );

  return services;
};
