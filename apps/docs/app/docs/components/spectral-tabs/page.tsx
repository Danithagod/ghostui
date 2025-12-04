'use client';

import { SpectralTabs, ThemeProvider } from 'ghostui-react';
import { ComponentPlayground } from '@/components/ComponentPlayground';
import { Code, Eye, Settings, User, Bell, Shield, Palette, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

// Demo card component for showcasing tabs in a realistic context
function DemoCard({
 children,
 title,
 theme = 'spectral'
}: {
 children: React.ReactNode;
 title?: string;
 theme?: 'spectral' | 'blood';
}) {
 const colors = theme === 'spectral' ? {
  border: 'rgba(168, 85, 247, 0.3)',
  glow: 'rgba(168, 85, 247, 0.15)',
  accent: '#A855F7'
 } : {
  border: 'rgba(239, 68, 68, 0.3)',
  glow: 'rgba(239, 68, 68, 0.15)',
  accent: '#EF4444'
 };
 return (
  <div className="relative">
   <div className="overflow-hidden rounded-lg relative" style={{
    background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)',
    border: `1px solid ${colors.border}`,
    boxShadow: `0 4px 24px ${colors.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`
   }}>
    {title && (
     <div className="px-6 py-4 border-b" style={{
      borderColor: colors.border
     }}>
      <span className="text-sm font-medium text-ghost-white/80">{title}</span>
     </div>
    )}
    <div className="p-6">
     {children}
    </div>
   </div>

   {/* Corner Accents */}
   <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{
    borderColor: colors.accent
   }} />
   <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{
    borderColor: colors.accent
   }} />
   <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{
    borderColor: colors.accent
   }} />
   <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{
    borderColor: colors.accent
   }} />
  </div>
 );
}

// Settings panel content for demo
function SettingsContent() {
 return (
  <div className="space-y-4 p-4">
   <div className="rounded-lg bg-ghost-white/5 p-4">
    <div className="flex items-center justify-between mb-2">
     <div className="flex items-center gap-3">
      <Bell className="w-4 h-4 text-ghost-white/60" />
      <span className="text-sm text-ghost-white/80">Notifications</span>
     </div>
     <div className="w-10 h-5 bg-ghost-purple/30 rounded-full relative">
      <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-ghost-purple rounded-full" />
     </div>
    </div>
   </div>
   <div className="rounded-lg bg-ghost-white/5 p-4">
    <div className="flex items-center justify-between">
     <div className="flex items-center gap-3">
      <Shield className="w-4 h-4 text-ghost-white/60" />
      <span className="text-sm text-ghost-white/80">Privacy Mode</span>
     </div>
     <div className="w-10 h-5 bg-ghost-white/20 rounded-full relative">
      <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-ghost-white/40 rounded-full" />
     </div>
    </div>
   </div>
  </div>
 );
}

// Profile content for demo
function ProfileContent() {
 return (
  <div className="p-4">
   <div className="flex items-center gap-4 mb-6">
    <div className="w-16 h-16 rounded-full bg-ghost-purple/20 flex items-center justify-center border border-ghost-purple/30">
     <User className="w-8 h-8 text-ghost-white" />
    </div>
    <div>
     <h4 className="text-lg font-semibold text-ghost-white">Ghost User</h4>
     <p className="text-sm text-ghost-white/60">ghost@spectral.dev</p>
    </div>
   </div>
   <div className="grid grid-cols-3 gap-3 text-center">
    <div className="rounded-lg bg-ghost-white/5 p-3">
     <div className="text-xl font-bold text-ghost-purple">42</div>
     <div className="text-xs text-ghost-white/50">Projects</div>
    </div>
    <div className="rounded-lg bg-ghost-white/5 p-3">
     <div className="text-xl font-bold text-ghost-purple">128</div>
     <div className="text-xs text-ghost-white/50">Commits</div>
    </div>
    <div className="rounded-lg bg-ghost-white/5 p-3">
     <div className="text-xl font-bold text-ghost-purple">7</div>
     <div className="text-xs text-ghost-white/50">Teams</div>
    </div>
   </div>
  </div>
 );
}

// Theme toggle demo component
function ThemeToggleDemo() {
 const [currentTheme, setCurrentTheme] = useState<'spectral' | 'blood'>('spectral');
 const tabs = [{
  id: 'profile',
  label: 'Profile',
  icon: <User className="w-4 h-4" />,
  content: <ProfileContent />
 }, {
  id: 'settings',
  label: 'Settings',
  icon: <Settings className="w-4 h-4" />,
  content: <SettingsContent />
 }, {
  id: 'appearance',
  label: 'Appearance',
  icon: <Palette className="w-4 h-4" />,
  content: <div className="p-4 space-y-4">
  <p className="text-sm text-ghost-white/70">
  Customize the look and feel of your interface.
  </p>
  <div className="flex gap-3">
  <button onClick={() => setCurrentTheme('spectral')} className={`flex-1 p-4 rounded-lg border transition-all ${currentTheme === 'spectral' ? 'border-ghost-purple bg-ghost-purple/20' : 'border-ghost-white/20 hover:border-ghost-purple/50'}`}>
  <Moon className="w-5 h-5 mx-auto mb-2 text-ghost-purple" />
  <span className="text-sm text-ghost-white/80">Spectral</span>
  </button>
  <button onClick={() => setCurrentTheme('blood')} className={`flex-1 p-4 rounded-lg border transition-all ${currentTheme === 'blood' ? 'border-red-500 bg-red-500/20' : 'border-ghost-white/20 hover:border-red-500/50'}`}>
  <Sun className="w-5 h-5 mx-auto mb-2 text-red-500" />
  <span className="text-sm text-ghost-white/80">Blood Moon</span>
  </button>
  </div>
  </div>
 }];
 return <ThemeProvider defaultTheme={currentTheme} key={currentTheme}>
 <DemoCard title="User Dashboard" theme={currentTheme}>
 <SpectralTabs tabs={tabs} defaultTab="profile" variant={currentTheme} />
 </DemoCard>
 </ThemeProvider>;
}
export default function SpectralTabsPage() {
 const basicTabs = [{
  id: 'preview',
  label: 'Preview',
  icon: <Eye className="w-4 h-4" />,
  content: <div className="p-4 text-ghost-white/80">
  <p className="mb-3">This is the preview tab content with spectral styling.</p>
  <p className="text-sm text-ghost-white/60">
  Notice the smooth transition animation when switching between tabs.
  </p>
  </div>
 }, {
  id: 'code',
  label: 'Code',
  icon: <Code className="w-4 h-4" />,
  content: (
   <div className="p-4 bg-ghost-gray/20 rounded">
    <pre className="text-xs text-ghost-white/80 font-mono">{`<SpectralTabs
  tabs={tabs}
  defaultTab="preview"
/>`}</pre>
   </div>
  )
 }, {
  id: 'settings',
  label: 'Settings',
  icon: <Settings className="w-4 h-4" />,
  content: <div className="p-4 text-ghost-white/80">
  Configure your spectral preferences here.
  </div>
 }];
 return <div className="space-y-12">
 <div className="space-y-4">
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">SpectralTabs</h1>
 <p className="lead text-ghost-white/90">
 Tab navigation component with glowing active indicators, smooth freeze-frame transitions,
 and theme-aware styling for both Spectral Purple and Blood Moon themes.
 </p>
 </div>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Basic Usage</h2>

 <p>
 The simplest way to use SpectralTabs is to provide an array of tab items with unique IDs,
 labels, and content. Each tab can optionally include an icon for enhanced visual appeal.
 Click on the tabs below to see the smooth freeze-frame transitions:
 </p>

 <ComponentPlayground 
  preview={
   <div className="w-full max-w-lg mx-auto">
    <DemoCard title="Component Preview">
     <SpectralTabs tabs={basicTabs} defaultTab="preview" />
    </DemoCard>
   </div>
  } 
  code={`import { SpectralTabs } from 'ghostui-react';
 import { Code, Eye, Settings } from 'lucide-react';

 const tabs = [
  {
   id: 'preview',
   label: 'Preview',
   icon: <Eye className="w-4 h-4" />,
   content: <div className="p-4">Preview content</div>,
  },
  {
   id: 'code',
   label: 'Code',
   icon: <Code className="w-4 h-4" />,
   content: <div className="p-4">Code content</div>,
  },
  {
   id: 'settings',
   label: 'Settings',
   icon: <Settings className="w-4 h-4" />,
   content: <div className="p-4">Settings content</div>,
  },
 ];

 export default function Example() {
  return <SpectralTabs tabs={tabs} defaultTab="preview" />;
 }`} 
  api={
   <div className="space-y-6">
    <h3 className="text-xl md:text-2xl font-semibold text-ghost-white">Props</h3>
    <div className="overflow-x-auto">
     <table className="w-full text-left text-sm text-ghost-white/80">
      <thead className="border-b border-ghost-purple/20 text-ghost-purple">
       <tr>
        <th className="py-2 px-4">Prop</th>
        <th className="py-2 px-4">Type</th>
        <th className="py-2 px-4">Default</th>
        <th className="py-2 px-4">Description</th>
       </tr>
      </thead>
      <tbody>
       <tr className="border-b border-ghost-purple/10">
        <td className="py-2 px-4 font-mono text-ghost-green">tabs</td>
        <td className="py-2 px-4 font-mono text-xs">TabItem[]</td>
        <td className="py-2 px-4 font-mono text-xs">Required</td>
        <td className="py-2 px-4">Array of tab items</td>
       </tr>
       <tr className="border-b border-ghost-purple/10">
        <td className="py-2 px-4 font-mono text-ghost-green">defaultTab</td>
        <td className="py-2 px-4 font-mono text-xs">string</td>
        <td className="py-2 px-4 font-mono text-xs">First tab ID</td>
        <td className="py-2 px-4">Initially active tab</td>
       </tr>
       <tr className="border-b border-ghost-purple/10">
        <td className="py-2 px-4 font-mono text-ghost-green">onTabChange</td>
        <td className="py-2 px-4 font-mono text-xs">(tabId: string) =&gt; void</td>
        <td className="py-2 px-4 font-mono text-xs">-</td>
        <td className="py-2 px-4">Callback on tab change</td>
       </tr>
       <tr className="border-b border-ghost-purple/10">
        <td className="py-2 px-4 font-mono text-ghost-green">variant</td>
        <td className="py-2 px-4 font-mono text-xs">'spectral' | 'blood'</td>
        <td className="py-2 px-4 font-mono text-xs">From ThemeProvider</td>
        <td className="py-2 px-4">Theme color variant</td>
       </tr>
       <tr className="border-b border-ghost-purple/10">
        <td className="py-2 px-4 font-mono text-ghost-green">className</td>
        <td className="py-2 px-4 font-mono text-xs">string</td>
        <td className="py-2 px-4 font-mono text-xs">-</td>
        <td className="py-2 px-4">Additional CSS classes</td>
       </tr>
      </tbody>
     </table>
    </div>

    <h4 className="text-sm font-semibold text-ghost-white mt-4">TabItem Interface</h4>
    <pre className="bg-ghost-gray/20 p-3 rounded text-xs text-ghost-white/80 font-mono overflow-x-auto">
{`{
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  tooltip?: ReactNode;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  tooltipClassName?: string;
}`}
    </pre>
   </div>
  } 
 />

 <div className="prose prose-invert max-w-none mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Theme Support</h2>

 <p>
 SpectralTabs automatically adapts to your ThemeProvider context, supporting both
 <span className="text-purple-400 mx-1">Spectral Purple</span> and
 <span className="text-red-400 mx-1">Blood Moon</span> themes.
 Click the theme buttons in the Appearance tab to see the colors change:
 </p>
 </div>

 <ComponentPlayground 
  preview={
   <div className="w-full max-w-lg mx-auto">
    <ThemeToggleDemo />
   </div>
  } 
  previewSize="lg" 
  code={`import { SpectralTabs, ThemeProvider } from 'ghostui-react';
 import { User, Settings, Palette } from 'lucide-react';
 import { useState } from 'react';

 function ThemedTabs() {
  const [theme, setTheme] = useState<'spectral' | 'blood'>('spectral');

  const tabs = [
   {
    id: 'profile',
    label: 'Profile',
    icon: <User className="w-4 h-4" />,
    content: <ProfileContent />,
   },
   {
    id: 'settings',
    label: 'Settings',
    icon: <Settings className="w-4 h-4" />,
    content: <SettingsContent />,
   },
   {
    id: 'appearance',
    label: 'Appearance',
    icon: <Palette className="w-4 h-4" />,
    content: (
     <ThemeSelector
     currentTheme={theme}
     onThemeChange={setTheme}
     />
    ),
   },
  ];

  return (
   <ThemeProvider defaultTheme={theme}>
   <SpectralTabs
   tabs={tabs}
   variant={theme}
   defaultTab="profile"
   />
   </ThemeProvider>
  );
 }`} />

 <div className="prose prose-invert max-w-none mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Side-by-Side Theme Comparison</h2>

 <p>
 Here's a direct comparison of both theme variants:
 </p>
 </div>

 <div className="grid md:grid-cols-2 gap-6">
 <div>
 <p className="text-sm text-ghost-purple mb-3 font-medium">Spectral Purple</p>
 <ThemeProvider defaultTheme="spectral">
 <DemoCard title="Spectral Theme" theme="spectral">
 <SpectralTabs tabs={basicTabs.slice(0, 2)} defaultTab="preview" variant="spectral" />
 </DemoCard>
 </ThemeProvider>
 </div>
 <div>
 <p className="text-sm text-red-400 mb-3 font-medium">Blood Moon</p>
 <ThemeProvider defaultTheme="blood">
 <DemoCard title="Blood Moon Theme" theme="blood">
 <SpectralTabs tabs={basicTabs.slice(0, 2)} defaultTab="preview" variant="blood" />
 </DemoCard>
 </ThemeProvider>
 </div>
 </div>

 <div className="prose prose-invert max-w-none mt-12">
 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Animation Details</h2>

 <p>
 SpectralTabs features a sophisticated freeze-frame animation system:
 </p>

 <ul>
 <li>Spring-based tab indicator movement with natural physics</li>
 <li>Directional content transitions (slides left/right based on tab order)</li>
 <li>Blur effect during transitions for a cinematic feel</li>
 <li>Scale animations for depth perception</li>
 <li>Glowing effects that respond to the active theme</li>
 </ul>

 <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">Accessibility</h2>

 <ul>
 <li>Keyboard navigable with arrow keys and tab</li>
 <li>Proper ARIA attributes for tab navigation</li>
 <li>Focus visible indicators</li>
 </ul>
 </div>
 </div>;
}