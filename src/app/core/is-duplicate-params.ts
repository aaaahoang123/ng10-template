export function isDuplicateParams(params1: any, params2: any): boolean {
  const searchParams1 = new URLSearchParams(params1);
  const searchParams2 = new URLSearchParams(params2);

  searchParams1.sort();
  searchParams2.sort();

  return searchParams1.toString() === searchParams2.toString();
}
