import { PageTitle } from "@/components/page-title";
import { Link, useRouteError } from "react-router-dom";

export function Error() {
  const error = useRouteError() as Error;

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-2">
        <PageTitle title="Whoops, algo não saiu como esperado!" />
        <p className="text-accent-foreground">
          Um erro aconteceu na aplicação, veja mais detalhes abaixo:
        </p>

        <pre>{error?.message || JSON.stringify(error, null, 2)}</pre>
        <pre className="text-accent-foreground">
          Voltar para o{" "}
          <Link to="/" className="text-sky-500 dark:text-sky-400">
            Dashboard
          </Link>
        </pre>
      </div>
    </>
  );
}
