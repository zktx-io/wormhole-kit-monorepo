import type { PlatformDefinition } from '../types';
const sui = async (): Promise<PlatformDefinition<'Sui'>> =>
  (await import('./platforms/sui')).default;
export default sui;
