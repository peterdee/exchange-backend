import { compare, hash } from 'scryptwrap';

export async function compareHashWithPlaintext(
  hashed: string,
  plaintext: string,
): Promise<boolean> {
  return compare(hashed, plaintext);
}

export async function createHash(value: string): Promise<string> {
  return hash(value);
}
