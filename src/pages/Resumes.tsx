import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  FileText, 
  MoreVertical, 
  Pencil, 
  Trash2, 
  Copy,
  Clock 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useResumeStore } from '@/stores/resume-store';
import { ScoreBadge } from '@/components/builder/ScoreBadge';
import { toast } from '@/hooks/use-toast';

export default function Resumes() {
  const navigate = useNavigate();
  const { resumes, deleteResume, createResume } = useResumeStore();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    deleteResume(id);
    setDeleteConfirmId(null);
    toast({ title: 'Resume deleted', description: 'Your resume has been deleted.' });
  };

  const handleDuplicate = (resume: any) => {
    const duplicate = {
      ...resume,
      id: crypto.randomUUID(),
      name: `${resume.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    createResume(duplicate);
    toast({ title: 'Resume duplicated', description: 'A copy has been created.' });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const sortedResumes = [...resumes].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Resumes</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage your resumes
            </p>
          </div>
          <Button onClick={() => navigate('/builder/new')}>
            <Plus className="h-4 w-4 mr-2" />
            New Resume
          </Button>
        </div>

        {resumes.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">No resumes yet</h3>
                <p className="text-muted-foreground text-sm max-w-sm">
                  Create your first resume to get started. Choose from our ATS-optimized templates.
                </p>
              </div>
              <Button onClick={() => navigate('/builder/new')}>
                <Plus className="h-4 w-4 mr-2" />
                Create Resume
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Create New Card */}
            <Card 
              className="p-6 border-dashed cursor-pointer hover:border-accent/50 transition-colors flex flex-col items-center justify-center min-h-[200px]"
              onClick={() => navigate('/builder/new')}
            >
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-3">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground">Create New Resume</p>
              <p className="text-sm text-muted-foreground">Start from scratch</p>
            </Card>

            {/* Resume Cards */}
            {sortedResumes.map((resume) => (
              <Card key={resume.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground line-clamp-1">
                        {resume.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatDate(resume.updatedAt)}
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/builder/${resume.id}`)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicate(resume)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => setDeleteConfirmId(resume.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Preview Placeholder */}
                <div 
                  className="aspect-[8.5/11] bg-secondary rounded-md mb-4 overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/builder/${resume.id}`)}
                >
                  <div className="w-full h-full p-3 text-[6px] text-muted-foreground/60">
                    <div className="border-b border-border/50 pb-1 mb-1">
                      <div className="font-bold text-[8px]">{resume.contact.fullName || 'Your Name'}</div>
                      <div className="text-[5px]">{resume.contact.email}</div>
                    </div>
                    {resume.sectionOrder.slice(0, 3).map((section) => (
                      <div key={section} className="mb-1">
                        <div className="font-medium uppercase text-[5px]">{section}</div>
                        <div className="h-2 bg-muted-foreground/10 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <ScoreBadge score={resume.score || 0} size="sm" />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/builder/${resume.id}`)}
                  >
                    Edit
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resume</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this resume? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
