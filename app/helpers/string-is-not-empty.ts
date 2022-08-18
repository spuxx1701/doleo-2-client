import { helper } from '@ember/component/helper';

export function stringIsNotEmpty(args: any[]) {
  let [string] = args;
  return (string as string).replace(/\s/g, '').length > 0;
}

export default helper(stringIsNotEmpty);
