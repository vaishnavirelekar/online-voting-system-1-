import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { Vote, Shield, Lock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface LoginPageProps {
  onLogin: (email: string, password: string, role: "admin" | "voter") => void;
  onNavigateToRegister: () => void;
}

export function LoginPage({ onLogin, onNavigateToRegister }: LoginPageProps) {
  const [voterEmail, setVoterEmail] = useState("");
  const [voterPassword, setVoterPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleVoterLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voterEmail || !voterPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    onLogin(voterEmail, voterPassword, "voter");
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmail || !adminPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    onLogin(adminEmail, adminPassword, "admin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
            <Vote className="size-12 text-blue-600" />
            <h1 className="text-4xl">ElectionHub</h1>
          </div>
          <p className="text-xl text-gray-600 mb-8">
            Secure, transparent, and accessible digital voting platform for democratic elections.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="size-6 text-blue-600" />
              <span className="text-gray-700">Military-grade encryption</span>
            </div>
            <div className="flex items-center gap-3">
              <Lock className="size-6 text-blue-600" />
              <span className="text-gray-700">Anonymous & secure voting</span>
            </div>
            <div className="flex items-center gap-3">
              <Vote className="size-6 text-blue-600" />
              <span className="text-gray-700">Real-time result tracking</span>
            </div>
          </div>
        </div>

        {/* Right side - Login Forms */}
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle>Login to ElectionHub</CardTitle>
            <CardDescription>
              Choose your role and login to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="voter" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="voter">Voter Login</TabsTrigger>
                <TabsTrigger value="admin">Admin Login</TabsTrigger>
              </TabsList>

              <TabsContent value="voter" className="mt-6">
                <form onSubmit={handleVoterLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="voter-email">Email or Voter ID</Label>
                    <Input
                      id="voter-email"
                      type="text"
                      value={voterEmail}
                      onChange={(e) => setVoterEmail(e.target.value)}
                      placeholder="your@email.com or V123456"
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="voter-password">Password</Label>
                    <Input
                      id="voter-password"
                      type="password"
                      value={voterPassword}
                      onChange={(e) => setVoterPassword(e.target.value)}
                      placeholder="••••••••"
                      className="mt-2"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Login as Voter
                  </Button>
                  <div className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={onNavigateToRegister}
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      Register here
                    </button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="admin" className="mt-6">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg mb-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Demo Admin Credentials:</strong><br />
                      Email: admin@election.com<br />
                      Password: admin123
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="admin@election.com"
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="admin-password">Admin Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="••••••••"
                      className="mt-2"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    <Shield className="size-4 mr-2" />
                    Login as Admin
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
