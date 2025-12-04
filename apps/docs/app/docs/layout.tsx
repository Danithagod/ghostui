import { Sidebar } from '@/components/Sidebar';

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-ghost-dark">
            <Sidebar />
            <main className="ml-80 flex-1 w-full">
                <div className="mx-auto max-w-6xl px-8 py-16 md:px-12">
                    {children}
                </div>
            </main>
        </div>
    );
}
