/**
 * Generic API Response types
 */

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiFailure {
  success: false;
  error: ApiError;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

/**
 * Pagination parameters
 */
export interface PaginationParams {
  limit: number;
  offset: number;
}

/**
 * Sorting parameters
 */
export type SortField = 'name' | 'number';
export type SortOrder = 'asc' | 'desc';

export interface SortParams {
  field: SortField;
  order: SortOrder;
}

/**
 * Search and filter parameters
 */
export interface SearchParams {
  query?: string;
  pagination: PaginationParams;
  sort?: SortParams;
}
