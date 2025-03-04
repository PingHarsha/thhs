export function formatKeys(keys: Set<string>): string[] {
  const newKeys: string[] = [];
  keys.forEach(key => {
    // Remove underscores and capitalize the first letter of each word
    newKeys.push(key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
  });
  return newKeys;
}
