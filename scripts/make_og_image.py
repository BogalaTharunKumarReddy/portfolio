"""Render public/og-image.png (1200x630 social preview). Run: python3 scripts/make_og_image.py
Edit NAME / ROLE below to change the text. Requires Playwright with Chromium."""
from pathlib import Path
from playwright.sync_api import sync_playwright

NAME = "Tharun Kumar Reddy"
ROLE = "Frontend Developer"
LINE = "HTML · CSS · JavaScript · ReactJS · MySQL"

HTML = f"""<html><body style="margin:0;width:1200px;height:630px;background:radial-gradient(ellipse 80% 70% at 15% 0%,#bfdbfe,#eef3fb 55%,#f6f8fc);
font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#0f172a;display:flex;flex-direction:column;justify-content:center;padding:0 90px;box-sizing:border-box;position:relative;overflow:hidden">
<div style="position:absolute;right:-120px;top:-120px;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#93c5fd,#2563eb 55%,transparent 72%);opacity:.45;filter:blur(2px)"></div>
<div style="position:absolute;right:60px;top:90px;width:300px;height:300px;border-radius:50%;border:2px solid rgba(8,145,178,.5)"></div>
<div style="width:84px;height:84px;border-radius:22px;background:linear-gradient(135deg,#2563eb,#0e7490);display:grid;place-items:center;color:#fff;font-weight:800;font-size:32px;margin-bottom:36px;box-shadow:0 14px 30px -10px rgba(37,99,235,.6)">TKR</div>
<div style="font-size:72px;font-weight:800;letter-spacing:-1.5px;line-height:1.05">{NAME}</div>
<div style="font-size:42px;margin-top:18px;background:linear-gradient(120deg,#2563eb,#0891b2 60%,#0d9488);-webkit-background-clip:text;color:transparent;font-weight:700">{ROLE}</div>
<div style="font-size:26px;margin-top:28px;color:#475569;font-family:ui-monospace,monospace">{LINE}</div>
</body></html>"""

out = Path(__file__).resolve().parent.parent / "public" / "og-image.png"
with sync_playwright() as p:
    b = p.chromium.launch()
    page = b.new_page(viewport={"width": 1200, "height": 630})
    page.set_content(HTML)
    page.screenshot(path=str(out))
    b.close()
print("wrote", out)
