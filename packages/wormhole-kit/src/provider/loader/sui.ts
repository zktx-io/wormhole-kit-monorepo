import type { IPlatformDefinition } from '../types';
const sui = async (): Promise<IPlatformDefinition<'Sui'>> =>
  (await import('./platforms/sui')).default;
export default sui;
