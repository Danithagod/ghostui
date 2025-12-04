import { cn } from "@/lib/utils";

interface PropDefinition {
    name: string;
    type: string;
    required?: boolean;
    default?: string;
    description: string;
}

interface PropsTableProps {
    props: PropDefinition[];
    className?: string;
}

export function PropsTable({ props, className }: PropsTableProps) {
    return (
        <div 
            className={cn("bg-[#0a0412] rounded-lg overflow-hidden", className)}
            style={{ 
                border: '1px solid rgba(255, 111, 0, 0.2)',
                boxShadow: '0 0 20px rgba(255, 111, 0, 0.1)'
            }}
        >
            <table className="w-full text-sm">
                <thead style={{ 
                    backgroundColor: 'rgba(255, 111, 0, 0.1)',
                    borderBottom: '1px solid rgba(255, 111, 0, 0.2)'
                }}>
                    <tr>
                        <th className="text-left px-4 py-3 text-ghost-white font-semibold">Prop</th>
                        <th className="text-left px-4 py-3 text-ghost-white font-semibold">Type</th>
                        <th className="text-left px-4 py-3 text-ghost-white font-semibold">Required</th>
                        <th className="text-left px-4 py-3 text-ghost-white font-semibold">Description</th>
                    </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'rgba(255, 111, 0, 0.1)' }}>
                    {props.map((prop) => (
                        <tr key={prop.name}>
                            <td className="px-4 py-3 text-ghost-white/90 font-mono">{prop.name}</td>
                            <td className="px-4 py-3 text-ghost-white/70 font-mono text-xs">{prop.type}</td>
                            <td className="px-4 py-3 text-ghost-white/70">{prop.required ? 'Yes' : 'No'}</td>
                            <td className="px-4 py-3 text-ghost-white/70">{prop.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
