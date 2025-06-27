import Link from 'next/link';
import { Button } from '@/components/ui/button';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { LogoFull } from '@/components/Logo';
import { Home, Search, Compass, Shield } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-greek/5 flex flex-col relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-greek rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-greek rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-greek rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header with Logo */}
      <header className="w-full border-b border-border/50 bg-background/80 backdrop-blur-sm relative z-10">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between py-4">
            <LogoFull />
            <Link href="/">
              <Button variant="ghost" size="sm" className="hover:bg-greek/10">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>
          </div>
        </MaxWidthWrapper>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 relative z-10">
        <MaxWidthWrapper>
          <div className="text-center max-w-2xl mx-auto">
            {/* 404 Number with enhanced styling */}
            <div className="relative mb-12">
              <h1 className="text-8xl md:text-9xl font-bold text-greek/15 select-none tracking-tighter">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-greek/20 to-greek/5 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border border-greek/10">
                  <div className="relative">
                    <Search className="w-14 h-14 md:w-18 md:h-18 text-greek/70" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-greek/30 rounded-full animate-ping" />
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message with enhanced typography */}
            <div className="space-y-6 mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                  Lost in Olympus
                </h2>
                <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                  Like a mortal who has strayed from the path of the gods, 
                  this page has vanished into the mists of time. 
                  Let us guide you back to civilization.
                </p>
              </div>
              
              {/* Decorative line */}
              <div className="flex items-center justify-center space-x-4">
                <div className="w-8 h-px bg-greek/30" />
                <Shield className="w-4 h-4 text-greek/50" />
                <div className="w-8 h-px bg-greek/30" />
              </div>
            </div>

            {/* Action Buttons with enhanced styling */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/">
                <Button size="lg" className="w-full sm:w-auto group relative overflow-hidden">
                  <Home className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Return Home</span>
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Button>
              </Link>
              
              <Link href="/products">
                <Button variant="outline" size="lg" className="w-full sm:w-auto group border-greek/30 hover:border-greek hover:bg-greek/5">
                  <Compass className="w-4 h-4 transition-transform group-hover:rotate-12" />
                  <span>Explore Products</span>
                </Button>
              </Link>
            </div>

            {/* Enhanced decorative elements */}
            <div className="flex justify-center items-center space-x-6">
              <div className="flex space-x-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-greek/40 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
              <div className="text-greek/30 text-xs font-medium tracking-wider">GREEK GOD</div>
              <div className="flex space-x-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i + 5}
                    className="w-2 h-2 bg-greek/40 rounded-full animate-pulse"
                    style={{ animationDelay: `${(i + 5) * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </main>

      {/* Enhanced Footer */}
      <footer className="w-full border-t border-border/50 bg-background/80 backdrop-blur-sm py-8 relative z-10">
        <MaxWidthWrapper>
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Crafted for every journey, designed for every man.
            </p>
            <p className="text-xs text-muted-foreground/70">
              <span className="text-greek font-medium">Greek God</span> • Enduring style, unwavering confidence
            </p>
          </div>
        </MaxWidthWrapper>
      </footer>
    </div>
  );
} 