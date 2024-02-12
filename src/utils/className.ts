export function className(classes: Array<string | null | undefined>): string {
  let classesWithoutNull = classes.filter((c) => c !== null && c !== undefined);
  return classesWithoutNull.filter(Boolean).join(' ');
}