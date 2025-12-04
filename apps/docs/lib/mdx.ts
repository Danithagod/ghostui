import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ComponentMeta {
    title: string;
    description: string;
    category: string;
}

export async function getComponentContent(slug: string) {
    const filePath = path.join(contentDirectory, 'components', `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const { content, frontmatter } = await compileMDX<ComponentMeta>({
        source: fileContent,
        options: { parseFrontmatter: true },
    });

    return {
        content,
        meta: frontmatter,
        slug,
    };
}

export function getAllComponentSlugs() {
    const componentsDir = path.join(contentDirectory, 'components');

    if (!fs.existsSync(componentsDir)) {
        return [];
    }

    const files = fs.readdirSync(componentsDir);
    return files
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => file.replace(/\.mdx$/, ''));
}
