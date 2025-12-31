import { Skeleton } from '@/components/ui/skeleton';

export function CareerCheckLoading() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="text-center py-4">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent/5 border border-accent/10">
          <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm text-muted-foreground">
            Analyzing your profile against real hiring signals
          </span>
        </div>
      </div>

      {/* Role Fit Skeleton */}
      <div className="p-4 rounded-lg bg-secondary/30 border border-border/30">
        <div className="flex items-center gap-3 mb-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4 mt-2" />
      </div>

      {/* Probability Skeleton */}
      <div className="p-4 rounded-lg bg-secondary/30 border border-border/30">
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-12" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
        <Skeleton className="h-3 w-2/3 mt-3" />
      </div>

      {/* Risks Skeleton */}
      <div>
        <Skeleton className="h-4 w-36 mb-3" />
        <div className="space-y-2">
          <Skeleton className="h-16 w-full rounded-lg" />
          <Skeleton className="h-16 w-full rounded-lg" />
        </div>
      </div>

      {/* Fixes Skeleton */}
      <div>
        <Skeleton className="h-4 w-32 mb-3" />
        <div className="space-y-2">
          <Skeleton className="h-14 w-full rounded-lg" />
          <Skeleton className="h-14 w-full rounded-lg" />
        </div>
      </div>

      {/* Recommendation Skeleton */}
      <Skeleton className="h-20 w-full rounded-lg" />
    </div>
  );
}
