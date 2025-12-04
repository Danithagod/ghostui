import { DocsLoadingSkeleton } from '@/components/DocsLoadingSkeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-ghost-dark flex items-center justify-center p-8">
      <DocsLoadingSkeleton variant="sweep" />
    </div>
  );
}
