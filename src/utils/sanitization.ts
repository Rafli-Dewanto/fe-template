import DOMPurify from "dompurify";

export const sanitizeHtml = (html: string): string => {
  if (typeof window === "undefined") {
    return html; // Server-side rendering, return as is
  }
  return DOMPurify.sanitize(html);
};

export const sanitizeInput = (input: string): string => {
  // Remove any HTML tags and trim whitespace
  return input.replace(/<[^>]*>/g, "").trim();
};

// Fixed: Changed Record<string, any> to Record<string, unknown>
export const sanitizeObject = <T extends Record<string, unknown>>(obj: T): T => {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      sanitized[key] = sanitizeInput(value);
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      // We know it's an object, so we cast it to the expected type for recursion
      sanitized[key] = sanitizeObject(value as Record<string, unknown>);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
};

export const stripScriptTags = (input: string): string => {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
};

export const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, m => map[m]);
};
