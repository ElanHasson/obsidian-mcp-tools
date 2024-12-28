import { type } from "arktype";

/**
 * Error response from the API
 * Content-Type: application/json
 * Used in various error responses across endpoints
 * @property errorCode - A 5-digit error code uniquely identifying this particular type of error
 * @property message - Message describing the error
 */
export const ApiError = type({
  errorCode: "number",
  message: "string",
});

/**
 * JSON representation of a note including parsed tag and frontmatter data as well as filesystem metadata
 * Content-Type: application/vnd.olrapi.note+json
 * GET /vault/{filename} or GET /active/ with Accept: application/vnd.olrapi.note+json
 */
export const ApiNoteJson = type({
  content: "string",
  frontmatter: "Record<string, string>",
  path: "string",
  stat: {
    ctime: "number",
    mtime: "number",
    size: "number",
  },
  tags: "string[]",
});

/**
 * Response from the root endpoint providing basic server details and authentication status
 * Content-Type: application/json
 * GET / - This is the only API request that does not require authentication
 */
export const ApiStatusResponse = type({
  authenticated: "boolean",
  ok: "string",
  service: "string",
  versions: {
    obsidian: "string",
    self: "string",
  },
});

/**
 * Response from searching vault files using advanced search
 * Content-Type: application/json
 * POST /search/
 * Returns array of matching files and their results
 * Results are only returned for non-falsy matches
 */
export const ApiSearchResponse = type({
  filename: "string",
  result: "string|number|string[]|object|boolean",
}).array();

/**
 * Match details for simple text search results
 * Content-Type: application/json
 * Used in ApiSimpleSearchResult
 */
export const ApiSimpleSearchMatch = type({
  match: {
    start: "number",
    end: "number",
  },
  context: "string",
});

/**
 * Result from searching vault files with simple text search
 * Content-Type: application/json
 * POST /search/simple/
 * Returns matches with surrounding context
 */
export const ApiSimpleSearchResponse = type({
  filename: "string",
  matches: ApiSimpleSearchMatch.array(),
  score: "number",
});

/**
 * Result entry from semantic search
 * Content-Type: application/json
 * Used in ApiSearchResponse
 */
export const ApiSmartSearchResult = type({
  path: "string",
  text: "string",
  score: "number",
  breadcrumbs: "string",
});

/**
 * Response from semantic search containing list of matching results
 * Content-Type: application/json
 * POST /search/smart/
 */
export const ApiSmartSearchResponse = type({
  results: ApiSmartSearchResult.array(),
});

/**
 * Parameters for semantic search request
 * Content-Type: application/json
 * POST /search/smart/
 * @property query - A search phrase for semantic search
 * @property filter.folders - An array of folder names to include. For example, ["Public", "Work"]
 * @property filter.excludeFolders - An array of folder names to exclude. For example, ["Private", "Archive"]
 * @property filter.limit - The maximum number of results to return
 */
export const ApiSearchParameters = type({
  query: "string",
  filter: {
    folders: "string[]?",
    excludeFolders: "string[]?",
    limit: "number?",
  },
});

/**
 * Command information from Obsidian's command palette
 * Content-Type: application/json
 * Used in ApiCommandsResponse
 */
export const ApiCommand = type({
  id: "string",
  name: "string",
});

/**
 * Response containing list of available Obsidian commands
 * Content-Type: application/json
 * GET /commands/
 */
export const ApiCommandsResponse = type({
  commands: ApiCommand.array(),
});

/**
 * Response containing list of files in a vault directory
 * Content-Type: application/json
 * GET /vault/ or GET /vault/{pathToDirectory}/
 * Note that empty directories will not be returned
 */
export const ApiVaultDirectoryResponse = type({
  files: "string[]",
});

/**
 * Response containing vault file information
 * Content-Type: application/json
 * POST /vault/{pathToFile}
 * Returns array of matching files and their results
 * Results are only returned for non-falsy matches
 */
export const ApiVaultFileResponse = type({
  frontmatter: {
    tags: "string[]",
    description: "string?",
  },
  content: "string",
  path: "string",
  stat: {
    ctime: "number",
    mtime: "number",
    size: "number",
  },
  tags: "string[]",
});

/**
 * Empty response for successful operations that don't return content
 * Content-Type: none (204 No Content)
 * Used by:
 * - PUT /vault/{filename}
 * - PUT /active/
 * - PUT /periodic/{period}/
 * - POST /commands/{commandId}/
 * - DELETE endpoints
 * Returns 204 No Content
 */
export const ApiNoContentResponse = type("undefined");

/**
 * Parameters for executing a template
 * Content-Type: application/json
 * POST /templates/execute/
 * @property name - The name of the template to execute
 * @property arguments - A key-value object of arguments to pass to the template
 * @property createFile - Whether to create a new file from the template
 * @property targetPath - The path to save the file; required if createFile is true
 */
export const ApiTemplateExecutionParams = type({
  name: "string",
  arguments: "Record<string, string>",
  createFile: "boolean?",
  targetPath: "string?",
});

/**
 * Response from executing a template
 * Content-Type: application/json
 * POST /templates/execute/
 * @property message - A message describing the result of the template execution
 */
export const ApiTemplateExecutionResponse = type({
  message: "string",
  content: "string",
});

// Export types for TypeScript usage
export type ApiErrorType = typeof ApiError.infer;
export type ApiNoteJsonType = typeof ApiNoteJson.infer;
export type ApiStatusResponseType = typeof ApiStatusResponse.infer;
export type ApiSearchResponseType = typeof ApiSearchResponse.infer;
export type ApiSimpleSearchResponseType = typeof ApiSimpleSearchResponse.infer;
export type ApiSmartSearchResultType = typeof ApiSmartSearchResult.infer;
export type ApiSmartSearchResponseType = typeof ApiSmartSearchResponse.infer;
export type ApiCommandType = typeof ApiCommand.infer;
export type ApiCommandsResponseType = typeof ApiCommandsResponse.infer;
export type ApiVaultDirectoryResponseType =
  typeof ApiVaultDirectoryResponse.infer;
export type ApiVaultFileResponseType = typeof ApiVaultFileResponse.infer;
export type ApiSearchParametersType = typeof ApiSearchParameters.infer;
export type ApiNoContentResponseType = typeof ApiNoContentResponse.infer;
export type ApiTemplateExecutionParamsType =
  typeof ApiTemplateExecutionParams.infer;
export type ApiTemplateExecutionResponseType =
  typeof ApiTemplateExecutionResponse.infer;

// Additional API response types can be added here
export const MIME_TYPE_OLRAPI_NOTE_JSON = "application/vnd.olrapi.note+json";
