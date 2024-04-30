import type { PlatformDefinition } from '../types';
const aptos = async (): Promise<PlatformDefinition<'Aptos'>> =>
  // eslint-disable-next-line import/no-unresolved
  (await import('./platforms/aptos')).default;
export default aptos;
