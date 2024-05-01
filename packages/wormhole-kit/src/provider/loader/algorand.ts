import type { IPlatformDefinition } from '../types';
const algorand = async (): Promise<IPlatformDefinition<'Algorand'>> =>
  (await import('./platforms/algorand')).default;
export default algorand;
