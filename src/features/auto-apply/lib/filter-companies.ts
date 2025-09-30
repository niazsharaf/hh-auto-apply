import { readFile } from 'fs/promises';

export async function filterCompanies(file: string): Promise<Set<string>> {
  try {
    const data = await readFile(file, 'utf-8');
    return new Set(
      data
        .split('\n')
        .filter(Boolean)
        .map((line) => line.split(' | ')[0]),
    );
  } catch {
    return new Set();
  }
}
