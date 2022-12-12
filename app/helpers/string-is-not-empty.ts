import { helper } from '@ember/component/helper';

export function stringIsNotEmpty(args: any[]) {
  const [string] = args;
  if (!string) return false;
  return (string as string).replace(/\s/g, '').length > 0;
}

export default helper(stringIsNotEmpty);
