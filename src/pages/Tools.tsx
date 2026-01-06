import { Link } from "react-router-dom";
import { 
  ArrowLeft, QrCode, Key, Palette, Code, FileText, Hash, 
  Lock, Calendar, RefreshCw, Binary, FileCode, Clock, 
  GitCompare, Eye, Shuffle, ImageIcon, Volume2, Ruler 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  path: string;
  active: boolean;
}

const tools: Tool[] = [
  // Text Tools
  { id: "base64", name: "Base64 Encoder", description: "Encode and decode Base64 text", icon: <Binary className="w-6 h-6" />, category: "Text", path: "/tools/base64", active: false },
  { id: "lorem-ipsum", name: "Lorem Ipsum Generator", description: "Generate placeholder text", icon: <FileText className="w-6 h-6" />, category: "Text", path: "/tools/lorem-ipsum", active: false },
  { id: "html-entity", name: "HTML Entity Encoder", description: "Encode/decode HTML entities", icon: <Code className="w-6 h-6" />, category: "Text", path: "/tools/html-entity", active: false },
  { id: "text-diff", name: "Text Diff Checker", description: "Compare two texts side by side", icon: <GitCompare className="w-6 h-6" />, category: "Text", path: "/tools/text-diff", active: false },
  { id: "markdown-preview", name: "Markdown Preview", description: "Preview markdown in real-time", icon: <Eye className="w-6 h-6" />, category: "Text", path: "/tools/markdown-preview", active: false },
  { id: "case-converter", name: "Case Converter", description: "Convert text case styles", icon: <Shuffle className="w-6 h-6" />, category: "Text", path: "/tools/case-converter", active: false },
  
  // Developer Tools
  { id: "qr-code", name: "QR Code Generator", description: "Generate QR codes with custom colors", icon: <QrCode className="w-6 h-6" />, category: "Developer", path: "/tools/qr-code-generator", active: true },
  { id: "uuid-generator", name: "UUID Generator", description: "Generate unique identifiers", icon: <Hash className="w-6 h-6" />, category: "Developer", path: "/tools/uuid", active: false },
  { id: "jwt-decoder", name: "JWT Decoder", description: "Decode and inspect JWT tokens", icon: <Lock className="w-6 h-6" />, category: "Developer", path: "/tools/jwt", active: false },
  { id: "regex-tester", name: "Regex Tester", description: "Test regular expressions", icon: <Code className="w-6 h-6" />, category: "Developer", path: "/tools/regex", active: false },
  { id: "code-minifier", name: "Code Minifier", description: "Minify CSS, JS, and HTML", icon: <FileCode className="w-6 h-6" />, category: "Developer", path: "/tools/minifier", active: false },
  { id: "cron-parser", name: "Cron Expression Parser", description: "Parse and validate cron expressions", icon: <Clock className="w-6 h-6" />, category: "Developer", path: "/tools/cron", active: false },
  
  // Converters
  { id: "color-converter", name: "Color Converter", description: "Convert between color formats", icon: <Palette className="w-6 h-6" />, category: "Converters", path: "/tools/color-converter", active: false },
  { id: "css-unit", name: "CSS Unit Converter", description: "Convert between CSS units", icon: <Ruler className="w-6 h-6" />, category: "Converters", path: "/tools/css-unit", active: false },
  { id: "timestamp", name: "Timestamp Converter", description: "Convert Unix timestamps", icon: <Calendar className="w-6 h-6" />, category: "Converters", path: "/tools/timestamp", active: false },
  
  // Security
  { id: "password-generator", name: "Password Generator", description: "Generate secure passwords", icon: <Key className="w-6 h-6" />, category: "Security", path: "/tools/password", active: false },
  
  // Media
  { id: "image-compressor", name: "Image Compressor", description: "Compress images without quality loss", icon: <ImageIcon className="w-6 h-6" />, category: "Media", path: "/tools/image-compressor", active: false },
  { id: "audio-converter", name: "Audio Converter", description: "Convert audio file formats", icon: <Volume2 className="w-6 h-6" />, category: "Media", path: "/tools/audio-converter", active: false },
];

const categories = [...new Set(tools.map(t => t.category))];

const Tools = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <h1 className="text-xl font-bold">All Tools</h1>
        </div>
      </header>

      {/* Tools Grid */}
      <main className="container mx-auto px-4 py-8">
        {categories.map(category => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{category}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tools.filter(t => t.category === category).map(tool => (
                <Link
                  key={tool.id}
                  to={tool.active ? tool.path : "#"}
                  className={`group p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all ${!tool.active && 'opacity-60 cursor-not-allowed'}`}
                  onClick={e => !tool.active && e.preventDefault()}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {tool.icon}
                    </div>
                    {!tool.active && (
                      <Badge variant="secondary">Coming Soon</Badge>
                    )}
                  </div>
                  <h3 className="font-semibold mb-2">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Tools;
