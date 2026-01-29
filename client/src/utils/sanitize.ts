import DOMPurify from 'dompurify';

const ALLOWED_TAGS = [
  'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li',
  'strong', 'em', 'b', 'i',
  'code', 'pre',
  'blockquote',
  'a', 'img',
  'br', 'hr',
];

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: ['href', 'title', 'src', 'alt', 'width', 'height'],
    ALLOW_DATA_ATTR: false,
  });
}