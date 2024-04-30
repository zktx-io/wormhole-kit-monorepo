import type { PlatformDefinition } from '../types';
const solana = async (): Promise<PlatformDefinition<'Solana'>> =>
  (await import('./platforms/solana')).default;
export default solana;
