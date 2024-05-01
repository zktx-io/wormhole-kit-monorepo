import type { IPlatformDefinition } from '../types';
const aptos = async (): Promise<IPlatformDefinition<'Aptos'>> =>
  // eslint-disable-next-line import/no-unresolved
  (await import('./platforms/aptos')).default;
export default aptos;
