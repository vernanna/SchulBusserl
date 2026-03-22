type UrlParamValue = string | number | boolean | null;

export function resourceWithUrlParameters(resource: string, parameters: Record<string, UrlParamValue>): string {
  const [base, existingQuery = ''] = resource.split('?');
  const searchParams = new URLSearchParams(existingQuery);

  for (const [key, value] of Object.entries(parameters)) {
    if (value === null) {
      continue;
    }
    searchParams.set(key, String(value));
  }

  const query = searchParams.toString();

  return query.length > 0 ? `${base}?${query}` : base;
}
