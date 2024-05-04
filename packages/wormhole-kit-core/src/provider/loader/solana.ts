import type { IPlatformDefinition } from '../types';
const solana = async (): Promise<IPlatformDefinition<'Solana'>> =>
  (await import('./platforms/solana')).default;
export default solana;
