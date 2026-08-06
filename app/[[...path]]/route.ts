import { NextRequest } from "next/server";
import pages from "../../snapshot/pages.json";

const capturedPages = pages as Record<string, string>;

function normalisePath(pathname: string) {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed || "/";
}

export async function GET(request: NextRequest) {
  const key = normalisePath(request.nextUrl.pathname);
  let html = capturedPages[key];
  if (!html) return new Response("Not found", { status: 404 });
  if (key === "/contact") {
    html = html.replace(
      /<script[^>]*id=["']gform_recaptcha-js["'][^>]*><\/script>/i,
      "",
    );
    html = html.replace(
      "</head>",
      `<script>
window.oaRecaptchaReady = function () {
  var container = document.querySelector('.ginput_recaptcha[data-sitekey]');
  if (!container || container.dataset.oaRendered === 'true') return;
  container.dataset.oaRendered = 'true';
  window.grecaptcha.render(container, {
    sitekey: container.dataset.sitekey,
    theme: container.dataset.theme || 'light',
    tabindex: Number(container.dataset.tabindex || 0)
  });
};
</script>
<script src="https://www.google.com/recaptcha/api.js?onload=oaRecaptchaReady&render=explicit" async defer></script>
</head>`,
    );
  }
  if (key === "/contact" && request.nextUrl.searchParams.get("sent") === "1") {
    html = html.replace(
      /(<form[^>]*id=["']gform_4["'][^>]*>)/i,
      '<div role="status" style="padding:18px 22px;margin:0 0 24px;background:#e8f5eb;border-left:4px solid #2f7d32;color:#183c1a">Thank you. Your message has been sent.</div>$1',
    );
  }
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

export async function HEAD(request: NextRequest) {
  const exists = Boolean(capturedPages[normalisePath(request.nextUrl.pathname)]);
  return new Response(null, { status: exists ? 200 : 404 });
}

export const dynamic = "force-dynamic";
