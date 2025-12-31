import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { Vote, ArrowLeft } from "lucide-react";
import { FaceCapture } from "./FaceCapture";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

interface RegisterPageProps {
  onRegister: (name: string, email: string, password: string, voterId: string, facePhoto: string) => void;
  onNavigateToLogin: () => void;
}

export function RegisterPage({ onRegister, onNavigateToLogin }: RegisterPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [voterId, setVoterId] = useState("");
  const [phone, setPhone] = useState("");
  const [showFaceCapture, setShowFaceCapture] = useState(false);
  const [facePhoto, setFacePhoto] = useState<string | null>(null);

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword || !voterId) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!voterId.startsWith("V")) {
      toast.error("Voter ID must start with 'V'");
      return;
    }

    // Show face capture dialog
    setShowFaceCapture(true);
  };

  const handleFaceCapture = (capturedPhoto: string) => {
    setFacePhoto(capturedPhoto);
    setShowFaceCapture(false);
    // Complete registration with face photo
    onRegister(name, email, password, voterId, capturedPhoto);
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
          <h2 className="text-2xl mb-4">Register as a Voter</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of citizens making their voice heard through secure digital voting.
          </p>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="font-semibold mb-3">Registration Requirements:</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>Valid Voter ID (starting with 'V')</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>Valid email address</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>Strong password (min 6 characters)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>Must be 18 years or older</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right side - Registration Form */}
        <Card className="shadow-2xl">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onNavigateToLogin}
              >
                <ArrowLeft className="size-4 mr-2" />
                Back to Login
              </Button>
            </div>
            <CardTitle>Voter Registration</CardTitle>
            <CardDescription>
              Create your account to participate in elections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInitialSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="voter-id">Voter ID *</Label>
                <Input
                  id="voter-id"
                  value={voterId}
                  onChange={(e) => setVoterId(e.target.value)}
                  placeholder="V123456"
                  className="mt-2"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Your unique voter identification number (must start with 'V')
                </p>
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-2"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 6 characters long
                </p>
              </div>

              <div>
                <Label htmlFor="confirm-password">Confirm Password *</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-2"
                  required
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  By registering, you agree to our Terms of Service and Privacy Policy. Your vote will be anonymous and secure.
                </p>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Register as Voter
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Face Capture Dialog */}
      <Dialog open={showFaceCapture} onOpenChange={setShowFaceCapture}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Face Capture</DialogTitle>
            <DialogDescription>
              Please capture your face to complete the registration process.
            </DialogDescription>
          </DialogHeader>
          <FaceCapture onCapture={handleFaceCapture} />
        </DialogContent>
      </Dialog>
    </div>
  );
}