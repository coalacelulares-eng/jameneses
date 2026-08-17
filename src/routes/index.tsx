import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center">
      <h1 className="text-4xl font-bold text-foreground">Imobiliária J.A Meneses</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Seu parceiro de confiança para encontrar o imóvel ideal.
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="https://www.instagram.com/j.a.menesessp"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Instagram
        </a>
        <a
          href="https://www.facebook.com/JAMENESESSP"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground transition-colors hover:bg-secondary/90"
        >
          Facebook
        </a>
      </div>
    </div>
  );
}
