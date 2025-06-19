import { useQuery } from '@tanstack/react-query';
// import { z } from 'zod'; // Unused
import { VaporizerSchema, type Vaporizer } from '../lib/schemas/vaporizerSchemas';
import { apiUrl } from '../config'; // Use exported apiUrl

/**
 * Fetches a single vaporizer by its slug.
 * @param slug - The slug of the vaporizer to fetch.
 * @returns A promise that resolves to the vaporizer data.
 */
const fetchVaporizerBySlug = async (slug: string): Promise<Vaporizer> => {
  const response = await fetch(`${apiUrl}/api/vaporizers/${slug}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Vaporizer with slug "${slug}" not found.`);
    }
    const errorBody = await response.text();
    throw new Error(`Network response was not ok for fetching vaporizer ${slug}: ${errorBody || response.statusText}`);
  }

  const data = await response.json();
  return VaporizerSchema.parse(data); // Validate with Zod schema
};

/**
 * React Query hook to fetch a vaporizer by its slug.
 * @param slug - The slug of the vaporizer. The query will not run if the slug is falsy.
 * @returns The React Query object for the vaporizer fetch operation.
 */
export const useVaporizerBySlug = (slug: string | undefined) => {
  return useQuery<Vaporizer, Error, Vaporizer, readonly (string | undefined)[]>({
    queryKey: ['vaporizer', slug] as const, // Query key: unique identifier for this query
    queryFn: async (): Promise<Vaporizer> => {
      if (!slug) {
        // Should not happen if `enabled` is used correctly, but as a safeguard.
        return Promise.reject(new Error('Slug is undefined, cannot fetch vaporizer.'));
      }
      return fetchVaporizerBySlug(slug);
    },
    enabled: !!slug, // Only run the query if slug is truthy
    staleTime: 1000 * 60 * 5, // Data considered fresh for 5 minutes
    gcTime: 1000 * 60 * 30, // Data cached for 30 minutes (renamed from cacheTime in v5)
    retry: (failureCount: number, error: Error) => {
      // Do not retry on 404 errors
      if (error.message.includes('not found')) {
        return false;
      }
      // Retry up to 2 times for other errors
      return failureCount < 2;
    },
  });
};
