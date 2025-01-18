"use server";

export async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const secretToTest = process.env.SECRET_TO_TEST;
  console.log(secretToTest);

  return products;
}
