import { Link } from "react-router-dom";
import { Wrench, Zap, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Wrench className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Empire Utilities</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link to="/tools" className="text-muted-foreground hover:text-foreground transition-colors">
              Tools
            </Link>
            <Button asChild>
              <Link to="/tools">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Zap className="w-4 h-4" />
          Powerful Tools at Your Fingertips
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
          Your Ultimate
          <span className="text-primary"> Utility Toolkit</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          A collection of powerful, free tools designed to make your everyday tasks simpler and more efficient.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link to="/tools">
              Explore Tools
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">
              All tools run directly in your browser for instant results without any uploads.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">100% Private</h3>
            <p className="text-muted-foreground">
              Your data never leaves your device. Everything is processed locally.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Wrench className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Always Free</h3>
            <p className="text-muted-foreground">
              No sign-ups, no limits, no hidden fees. Just tools that work.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2024 Empire Utilities. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
