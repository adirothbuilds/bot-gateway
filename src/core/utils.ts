export function safeJson(request: Request) {
  return request.json().catch(() => ({}));
}