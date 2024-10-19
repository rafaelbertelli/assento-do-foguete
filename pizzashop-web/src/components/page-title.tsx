import { Helmet } from "react-helmet-async";

interface PageTitleProps {
  title: string;
}

export function PageTitle({ title }: PageTitleProps) {
  return (
    <>
      <Helmet title={title} />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      </div>
    </>
  );
}
