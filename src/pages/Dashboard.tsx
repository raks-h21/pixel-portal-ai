import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { AIChatbot } from "@/components/AIChatbot";
import { LogOut, Palette, TrendingUp, Users, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  const [communityPosts, setCommunityPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchAnalytics();
    fetchCommunityPosts();
  }, []);

  const fetchAnalytics = async () => {
    if (!user) return;

    // Generate sample analytics data for the last 7 days
    const data = Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      views: Math.floor(Math.random() * 100) + 50,
      engagement: Math.floor(Math.random() * 50) + 20,
    }));
    setAnalyticsData(data);
  };

  const fetchCommunityPosts = async () => {
    const { data, error } = await supabase
      .from("community_posts")
      .select(`
        *,
        profiles:user_id (full_name, email)
      `)
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setCommunityPosts(data || []);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({ title: "Signed out successfully" });
    navigate("/auth");
  };

  const open3DGallery = () => {
    window.open("http://localhost:8080", "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gallery-gradient shadow-elegant">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Palette className="h-8 w-8 text-primary-foreground" />
              <h1 className="text-2xl font-bold text-primary-foreground">Memora</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-primary-foreground/90 hidden sm:inline">
                {user?.email}
              </span>
              <Button variant="ghost" size="icon" onClick={handleSignOut} className="text-primary-foreground hover:bg-primary/20">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-slide-up">
          <h2 className="text-3xl font-bold mb-2">Welcome to Your Dashboard</h2>
          <p className="text-muted-foreground">Manage your art gallery and explore the community</p>
        </div>

        {/* 3D Gallery Button */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <Card className="shadow-elegant border-2 border-secondary/20 hover:border-secondary/40 transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <Palette className="h-6 w-6 text-secondary" />
                    3D Art Gallery Experience
                  </h3>
                  <p className="text-muted-foreground">
                    Step into the immersive 3D gallery environment
                  </p>
                </div>
                <Button onClick={open3DGallery} variant="secondary" size="lg" className="gap-2">
                  Enter 3D Gallery
                  <ExternalLink className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="analytics" className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  Gallery Performance
                </CardTitle>
                <CardDescription>Your gallery views and engagement over the last week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--foreground))" />
                    <YAxis stroke="hsl(var(--foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)"
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="views" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="engagement" 
                      stroke="hsl(var(--secondary))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--secondary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">
                    {analyticsData.reduce((sum, d) => sum + d.views, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-secondary">
                    {analyticsData.reduce((sum, d) => sum + d.engagement, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Daily</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">
                    {Math.round(analyticsData.reduce((sum, d) => sum + d.views, 0) / 7)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Views per day</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="community" className="mt-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-secondary" />
                  Community Activity
                </CardTitle>
                <CardDescription>Recent posts from the art community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {communityPosts.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No community posts yet. Be the first to share!
                  </p>
                ) : (
                  communityPosts.map((post) => (
                    <div
                      key={post.id}
                      className="p-4 rounded-lg border border-border hover:border-secondary/30 transition-smooth"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">{post.profiles?.full_name || "Anonymous"}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(post.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm">{post.content}</p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default Dashboard;
