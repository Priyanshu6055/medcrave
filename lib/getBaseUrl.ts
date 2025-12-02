export function getBaseUrl() {
  if (typeof window !== "undefined") return ""; // client

  // server
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}