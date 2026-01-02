import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, History, LogOut, User, LayoutDashboard, Files, Plus, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const landingSections = [
  { id: "how-it-works", label: "How It Works" },
  { id: "intelligence-layers", label: "Intelligence Layers" },
  { id: "live-demo", label: "Live Demo" },
  { id: "build-resume", label: "Build Resume" },
  { id: "pricing", label: "Pricing" },
];

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { user, signOut, loading } = useAuth();
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  // Track active section on scroll
  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      const sections = landingSections.map((s) => ({
        id: s.id,
        element: document.getElementById(s.id),
      }));

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const sectionTop = section.element.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(section.id);
            return;
          }
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <FileText className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">ResumeAI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground flex items-center gap-1.5"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                to="/resumes"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground flex items-center gap-1.5"
              >
                <Files className="h-4 w-4" />
                Resumes
              </Link>
              <Link
                to="/upload"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                AI Review
              </Link>
            </>
          ) : isHome ? (
            <>
              {landingSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-sm transition-colors relative py-1 ${
                    activeSection === section.id
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {section.label}
                  {activeSection === section.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-700 rounded-full" />
                  )}
                </button>
              ))}
            </>
          ) : (
            <>
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
            </>
          )}
        </nav>

        {/* Mobile Section Nav - Horizontal scroll on home */}
        {isHome && !user && (
          <div className="hidden md:flex lg:hidden overflow-x-auto scrollbar-hide gap-4 mx-4">
            {landingSections.slice(0, 3).map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-sm whitespace-nowrap transition-colors ${
                  activeSection === section.id
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          {isHome && !user && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}

          {!loading && (
            <>
              {user ? (
                <>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/builder/new">
                      <Plus className="h-4 w-4 mr-1" />
                      New Resume
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <User className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <div className="px-2 py-1.5">
                        <p className="text-sm font-medium text-foreground">
                          {user.email}
                        </p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard" className="flex items-center gap-2">
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/history" className="flex items-center gap-2">
                          <History className="h-4 w-4" />
                          Analysis History
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Button asChild variant="outline" size="sm">
                  <Link to="/auth">Sign In</Link>
                </Button>
              )}
            </>
          )}
          {isHome && !user && (
            <Button asChild variant="hero" size="default" className="hidden sm:inline-flex">
              <Link to="/upload">Check My Resume</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && isHome && !user && (
        <div className="lg:hidden border-t border-border bg-background px-6 py-4">
          <nav className="flex flex-col gap-3">
            {landingSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-left text-sm py-2 transition-colors ${
                  activeSection === section.id
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
