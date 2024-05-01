import type { IPlatformDefinition } from '../types';
const evm = async (): Promise<IPlatformDefinition<'Evm'>> =>
  (await import('./platforms/evm')).default;
export default evm;
