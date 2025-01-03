import { expect, test } from "@playwright/test";

test("display day orders amount metric", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByText("10", { exact: true })).toBeVisible();
  await expect(page.getByText("-2% em relação ao dia anterior")).toBeVisible();
});

test("display month orders amount metric", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByText("21", { exact: true })).toBeVisible();
  await expect(page.getByText("-29% em relação ao mês anterior")).toBeVisible();
});

test("display month canceled orders amount metric", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByText("90", { exact: true })).toBeVisible();
  await expect(page.getByText("75% em relação ao mês anterior")).toBeVisible();
});

test("display month revenue metric", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByText("R$ 2,21")).toBeVisible();
  await expect(page.getByText("89% em relação ao mês anterior")).toBeVisible();
});
