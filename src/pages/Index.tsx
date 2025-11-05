import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Palette, Sparkles, Users, TrendingUp } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gallery-gradient min-h-screen flex items-center justify-center px-4">
        <div className="container mx-auto text-center animate-fade-in">
          <div className="mb-8 inline-block">
            <div className="p-4 rounded-full bg-secondary/20 backdrop-blur-sm">
              <Palette className="h-16 w-16 text-secondary" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 tracking-tight">
            Artisan Gallery
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Experience art in a whole new dimension. Explore stunning 2D collections and step into immersive 3D galleries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              onClick={() => navigate("/auth")}
              className="text-lg gap-2"
            >
              Get Started
              <Sparkles className="h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate("/auth")}
              className="text-lg border-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Artisan Gallery</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg card-gradient shadow-card transition-smooth hover:shadow-elegant">
              <div className="inline-block p-4 rounded-full bg-secondary/10 mb-4">
                <TrendingUp className="h-10 w-10 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Advanced Analytics</h3>
              <p className="text-muted-foreground">
                Track your gallery's performance with detailed insights and engagement metrics.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg card-gradient shadow-card transition-smooth hover:shadow-elegant">
              <div className="inline-block p-4 rounded-full bg-secondary/10 mb-4">
                <Users className="h-10 w-10 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Vibrant Community</h3>
              <p className="text-muted-foreground">
                Connect with fellow artists and art enthusiasts from around the world.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg card-gradient shadow-card transition-smooth hover:shadow-elegant">
              <div className="inline-block p-4 rounded-full bg-secondary/10 mb-4">
                <Sparkles className="h-10 w-10 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Art Assistant</h3>
              <p className="text-muted-foreground">
                Get personalized recommendations and creative inspiration from our AI assistant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gallery-gradient">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Ready to Showcase Your Art?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of artists and collectors in the most innovative art gallery platform.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate("/auth")}
            className="text-lg"
          >
            Start Your Journey
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <p className="text-sm opacity-90">
            © 2024 Artisan Gallery. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
