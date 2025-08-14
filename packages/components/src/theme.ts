export interface SUITheme {
  // Primary colors
  primary?: string;
  primarySubtle?: string;
  primaryNeutral?: string;

  // Semantic colors
  success?: string;
  warning?: string;
  error?: string;

  // Input specific colors
  inputBorder?: string;
  inputBackground?: string;
  inputText?: string;
  inputBorderError?: string;
  inputBorderDisabled?: string;

  // Skeleton colors
  skeletonBase?: string;
  skeletonHighlight?: string;
}

/**
 * Apply a custom theme by setting CSS variables
 *
 * @example
 * import { applyTheme } from '@scaffold-ui/components';
 *
 * applyTheme({
 *   primary: '#ff6b6b',
 *   primarySubtle: '#dae8ff',
 *   success: '#51cf66',
 *   warning: '#ffd43b',
 *   error: '#ff8863'
 * });
 */
export function applyTheme(theme: SUITheme): void {
  const root = document.documentElement;

  // Primary colors
  if (theme.primary) root.style.setProperty("--color-sui-primary", theme.primary, "important");
  if (theme.primarySubtle) root.style.setProperty("--color-sui-primary-subtle", theme.primarySubtle, "important");
  if (theme.primaryNeutral) root.style.setProperty("--color-sui-primary-neutral", theme.primaryNeutral, "important");

  // Semantic colors
  if (theme.success) root.style.setProperty("--color-sui-success", theme.success, "important");
  if (theme.warning) root.style.setProperty("--color-sui-warning", theme.warning, "important");
  if (theme.error) root.style.setProperty("--color-sui-error", theme.error, "important");

  // Input colors
  if (theme.inputBorder) root.style.setProperty("--color-sui-input-border", theme.inputBorder, "important");
  if (theme.inputBackground) root.style.setProperty("--color-sui-input-background", theme.inputBackground, "important");
  if (theme.inputText) root.style.setProperty("--color-sui-input-text", theme.inputText, "important");
  if (theme.inputBorderError)
    root.style.setProperty("--color-sui-input-border-error", theme.inputBorderError, "important");
  if (theme.inputBorderDisabled)
    root.style.setProperty("--color-sui-input-border-disabled", theme.inputBorderDisabled, "important");

  // Skeleton colors
  if (theme.skeletonBase) root.style.setProperty("--color-sui-skeleton-base", theme.skeletonBase, "important");
  if (theme.skeletonHighlight)
    root.style.setProperty("--color-sui-skeleton-highlight", theme.skeletonHighlight, "important");
}

/**
 * Get the current theme values
 */
export function getCurrentTheme(): SUITheme {
  const root = document.documentElement;
  const getProperty = (name: string) => getComputedStyle(root).getPropertyValue(name).trim();

  return {
    primary: getProperty("--color-sui-primary"),
    primarySubtle: getProperty("--color-sui-primary-subtle"),
    primaryNeutral: getProperty("--color-sui-primary-neutral"),

    success: getProperty("--color-sui-success"),
    warning: getProperty("--color-sui-warning"),
    error: getProperty("--color-sui-error"),

    inputBorder: getProperty("--color-sui-input-border"),
    inputBackground: getProperty("--color-sui-input-background"),
    inputText: getProperty("--color-sui-input-text"),
    inputBorderError: getProperty("--color-sui-input-border-error"),
    inputBorderDisabled: getProperty("--color-sui-input-border-disabled"),

    skeletonBase: getProperty("--color-sui-skeleton-base"),
    skeletonHighlight: getProperty("--color-sui-skeleton-highlight"),
  };
}

/**
 * Reset theme to default values
 */
export function resetTheme(): void {
  const root = document.documentElement;

  // Remove all custom CSS properties to fall back to defaults
  const properties = [
    "--color-sui-primary",
    "--color-sui-primary-subtle",
    "--color-sui-primary-neutral",
    "--color-sui-success",
    "--color-sui-warning",
    "--color-sui-error",
    "--color-sui-input-border",
    "--color-sui-input-background",
    "--color-sui-input-text",
    "--color-sui-input-border-error",
    "--color-sui-input-border-disabled",
    "--color-sui-skeleton-base",
    "--color-sui-skeleton-highlight",
  ];

  properties.forEach((property) => {
    root.style.removeProperty(property);
  });
}
