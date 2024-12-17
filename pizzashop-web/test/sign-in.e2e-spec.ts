import { expect, test } from "@playwright/test";

test("sign-in successfully", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });

  await page.getByPlaceholder("Digite seu e-mail").fill("johndoe@example.com");
  await page.getByRole("button", { name: "Acessar painel" }).click();

  const toast = page.getByText("Enviamos um link de login para - johndoe@example.com");

  expect(toast).toBeVisible();

  await page.waitForTimeout(2000);
});

test("sign-in with wrong credentials", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });

  await page.getByPlaceholder("Digite seu e-mail").fill("wrong@example.com");
  await page.getByRole("button", { name: "Acessar painel" }).click();

  const toast = page.getByText("Erro ao acessar painel, tente novamente mais tarde");

  expect(toast).toBeVisible();

  await page.waitForTimeout(2000);
});

test("navigate to new restaurant page", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });

  await page.getByRole("link", { name: "Cadastrar novo estabelecimento" }).click();

  await page.waitForURL("/sign-up");
});
