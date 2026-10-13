import { Link } from "@tanstack/react-router";
import logo from "@/assets/pp/logo.png.asset.json";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2" aria-label="Planeta Poliglota - início">
          <img src={logo.url} alt="" className="h-14 w-14 object-contain" width={56} height={56} />
          <span className="hidden text-2xl font-black tracking-tight text-primary sm:inline">
            planeta poliglota
          </span>
        </Link>
        <Link
          to="/auth"
          className="text-sm font-extrabold uppercase tracking-wide text-muted-foreground hover:text-primary"
        >
          Idioma do site: Português
        </Link>
      </div>
    </header>
  );
}
