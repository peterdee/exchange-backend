import { compare, hash } from 'scryptwrap';

export async function compareHashWithPlaintext(
  hashed: string,
  plaintext: string,
) {
  return compare(hashed, plaintext);
}

export async function createHash(value: string) {
  return hash(value);
}
