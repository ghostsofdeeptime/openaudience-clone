import { NextRequest } from "next/server";

const UPSTREAM_ORIGIN = "https://www.openaudience.com";
const FORWARDED_REQUEST_HEADERS = [
  "accept",
  "accept-language",
  "content-type",
  "cookie",
  "referer",
  "user-agent",
];

function isTextResponse(contentType: string) {
  return (
    contentType.startsWith("text/") ||
    contentType.includes("javascript") ||
    contentType.includes("json") ||
    contentType.includes("xml") ||
    contentType.includes("svg")
  );
}

function rewriteText(body: string, mirrorOrigin: string) {
  const escapedMirror = mirrorOrigin.replaceAll("/", "\\/");

  return body
    .replaceAll("https://www.openaudience.com", mirrorOrigin)
    .replaceAll("http://www.openaudience.com", mirrorOrigin)
    .replaceAll("https:\\/\\/www.openaudience.com", escapedMirror)
    .replaceAll("http:\\/\\/www.openaudience.com", escapedMirror)
    .replaceAll("//www.openaudience.com", `//${new URL(mirrorOrigin).host}`);
}

function rewriteResponseHeaders(headers: Headers, mirrorOrigin: string) {
  const result = new Headers(headers);

  for (const name of [
    "connection",
    "content-encoding",
    "content-length",
    "content-security-policy",
    "content-security-policy-report-only",
    "cross-origin-embedder-policy",
    "cross-origin-opener-policy",
    "cross-origin-resource-policy",
    "transfer-encoding",
    "x-frame-options",
  ]) {
    result.delete(name);
  }

  const location = result.get("location");
  if (location) {
    result.set("location", rewriteText(location, mirrorOrigin));
  }

  const setCookie = result.get("set-cookie");
  if (setCookie) {
    result.set(
      "set-cookie",
      setCookie.replace(/;\s*Domain=\.?openaudience\.com/gi, ""),
    );
  }

  return result;
}

async function mirror(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> },
) {
  await context.params;
  const upstreamUrl = new URL(request.nextUrl.pathname, UPSTREAM_ORIGIN);
  upstreamUrl.search = request.nextUrl.search;

  const requestHeaders = new Headers();
  for (const name of FORWARDED_REQUEST_HEADERS) {
    const value = request.headers.get(name);
    if (value) requestHeaders.set(name, value);
  }
  requestHeaders.set("x-forwarded-host", "www.openaudience.com");
  requestHeaders.set("x-forwarded-proto", "https");

  const hasBody = request.method !== "GET" && request.method !== "HEAD";
  const upstreamResponse = await fetch(upstreamUrl, {
    method: request.method,
    headers: requestHeaders,
    body: hasBody ? await request.arrayBuffer() : undefined,
    redirect: "manual",
    cache: "no-store",
  });

  const responseHeaders = rewriteResponseHeaders(
    upstreamResponse.headers,
    request.nextUrl.origin,
  );

  if (request.method === "HEAD") {
    return new Response(null, {
      status: upstreamResponse.status,
      headers: responseHeaders,
    });
  }

  const contentType = upstreamResponse.headers.get("content-type") ?? "";
  if (isTextResponse(contentType)) {
    const body = rewriteText(
      await upstreamResponse.text(),
      request.nextUrl.origin,
    );
    responseHeaders.set("content-length", String(new TextEncoder().encode(body).length));
    return new Response(body, {
      status: upstreamResponse.status,
      headers: responseHeaders,
    });
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers: responseHeaders,
  });
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export { mirror as DELETE, mirror as GET, mirror as HEAD, mirror as OPTIONS };
export { mirror as PATCH, mirror as POST, mirror as PUT };
