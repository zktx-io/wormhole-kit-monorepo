import type { PlatformDefinition } from '../types';
const algorand = async (): Promise<PlatformDefinition<'Algorand'>> =>
  (await import('./platforms/algorand')).default;
export default algorand;
