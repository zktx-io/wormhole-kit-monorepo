import type { PlatformDefinition } from '../types';
const evm = async (): Promise<PlatformDefinition<'Evm'>> =>
  (await import('./platforms/evm')).default;
export default evm;
