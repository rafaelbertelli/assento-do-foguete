import { PageTitle } from "@/components/page-title";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-2">
        <PageTitle title="Página não encontrada" />
        <p className="text-accent-foreground">
          Voltar para o{" "}
          <Link to="/" className="text-sky-500 dark:text-sky-400">
            Dashboard
          </Link>
        </p>
      </div>
    </>
  );
}
