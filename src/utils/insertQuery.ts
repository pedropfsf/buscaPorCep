export default function insertQuery(nameQuery: string, valueQuery: string): string {
  if (!valueQuery) {
    return "";
  }

  return `${nameQuery}=${valueQuery}`;
}