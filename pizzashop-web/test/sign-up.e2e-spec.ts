import { expect, test } from "@playwright/test";

test("navigate to login page", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page.getByRole("link", { name: "Fazer login" }).click();

  await page.waitForURL("/sign-in");
});

test("sign-up successfully", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page.getByPlaceholder("Nome do restaurante").fill("Pizza Shop");
  await page.getByPlaceholder("Digite seu nome").fill("John Doe");
  await page.getByPlaceholder("Telefone do restaurante").fill("11999999999");
  await page.getByPlaceholder("Digite o e-mail do restaurante").fill("johndoe@example.com");

  await page.getByRole("button", { name: "Finalizar cadastro" }).click();

  const toast = page.getByText("Restaurante cadastrado com sucesso");

  expect(toast).toBeVisible();

  await page.waitForTimeout(2000);
});

test("sign-up with wrong credentials", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page.getByPlaceholder("Nome do restaurante").fill("Wrong Shop");
  await page.getByPlaceholder("Digite seu nome").fill("John Doe");
  await page.getByPlaceholder("Telefone do restaurante").fill("11999999999");
  await page.getByPlaceholder("Digite o e-mail do restaurante").fill("johndoe@example.com");

  await page.getByRole("button", { name: "Finalizar cadastro" }).click();

  const toast = page.getByText("Erro ao cadastrar restaurante");

  expect(toast).toBeVisible();

  await page.waitForTimeout(2000);
});

// test("sign-in with wrong credentials", async ({ page }) => {
//   await page.goto("/sign-in", { waitUntil: "networkidle" });

//   await page.getByPlaceholder("Digite seu e-mail").fill("wrong@example.com");
//   await page.getByRole("button", { name: "Acessar painel" }).click();

//   const toast = page.getByText("Erro ao acessar painel, tente novamente mais tarde");

//   expect(toast).toBeVisible();

//   await page.waitForTimeout(2000);
// });

// test("navigate to new restaurant page", async ({ page }) => {
//   await page.goto("/sign-in", { waitUntil: "networkidle" });

//   await page.getByRole("link", { name: "Cadastrar novo estabelecimento" }).click();

//   await page.waitForURL("/sign-up");

//   await page.getByPlaceholder("Nome do restaurante").fill("John's Restaurant");
//   await page.getByPlaceholder("Digite seu nome").fill("John Doe");
//   await page.getByPlaceholder("Telefone do restaurante").fill("11999999999");
//   await page.getByPlaceholder("Digite o e-mail do restaurante").fill("johndoe@example.com");

//   await page.getByRole("button", { name: "Finalizar cadastro" }).click();

//   await page.waitForTimeout(2000);
// });
