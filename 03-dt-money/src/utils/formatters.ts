export function dateFormatter(date: string) {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
}

export function priceFormatter(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}
