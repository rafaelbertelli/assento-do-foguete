interface ProductProps {
  params: Promise<{ id: string }>;
}

export default async function Product({ params }: ProductProps) {
  const { id } = await params;

  return <div>{id}</div>;
}
