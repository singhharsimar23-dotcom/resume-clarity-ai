import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <FileText className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">ResumeAI</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/#how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How It Works
          </Link>
          <Link
            to="/pricing"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {isHome ? (
            <Button asChild variant="hero" size="default">
              <Link to="/upload">Check My Resume</Link>
            </Button>
          ) : (
            <Button asChild variant="outline" size="default">
              <Link to="/">Home</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
