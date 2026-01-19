import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        # Assuming the server is already running or I need to start it.
        # I'll start the server in the background if it's not running.
        await page.goto("http://localhost:3000")
        await page.screenshot(path="final_verification.png", full_page=False)

        logo = await page.query_selector(".logo-img")
        if logo:
            box = await logo.bounding_box()
            print(f"Logo Bounding Box: {box}")
        else:
            print("Logo not found")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
