export const configServices = (lazyServices: AllLazyServices) => {
  const getService = <A extends keyof AllLazyServices>(service: A) =>
    lazyServices[service]()(getService);

  const services = (Object.keys(lazyServices) as (keyof typeof lazyServices)[]).reduce(
    (prev, curr) => {
      // @ts-ignore
      prev[curr] = getService(curr);
      return prev;
    },
    {} as AllServices,
  );

  return services;
};

export const configLazyServices =
  <A extends (repos: AllRepos) => { [key: string]: Function }>(initAllLazyServices: A) =>
  (repos: AllRepos) =>
    initAllLazyServices(repos) as A extends (repos: any) => infer B ? B : never;
