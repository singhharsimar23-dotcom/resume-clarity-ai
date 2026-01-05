import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TemplateBrowser } from '@/components/dashboard/TemplateBrowser';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function Templates() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Resume Templates</h1>
          <p className="text-muted-foreground mt-1">
            Choose from profession-specific templates designed to pass ATS systems
          </p>
        </div>
        <TemplateBrowser />
      </main>
      <Footer />
    </div>
  );
}
