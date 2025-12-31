import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Shield, Lock, BarChart3, CheckCircle } from "lucide-react";

export function ElectionHero() {
  return (
    <section id="home" className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="mb-6">Secure & Transparent Election Voting System</h1>
            <p className="text-xl text-gray-600 mb-8">
              Empowering democratic participation through our secure, user-friendly digital voting platform. Cast your vote with confidence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg">
                View Elections
              </Button>
              <Button size="lg" variant="outline">
                Register to Vote
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="flex flex-col items-center text-center">
                <Shield className="size-10 text-blue-600 mb-2" />
                <span className="text-sm text-gray-600">Secure Platform</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Lock className="size-10 text-blue-600 mb-2" />
                <span className="text-sm text-gray-600">Anonymous Voting</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <BarChart3 className="size-10 text-blue-600 mb-2" />
                <span className="text-sm text-gray-600">Live Results</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="size-10 text-blue-600 mb-2" />
                <span className="text-sm text-gray-600">Verified System</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1696831519270-3ea6d1d83fa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjB2b3RpbmclMjBlbGVjdGlvbnxlbnwxfHx8fDE3NjY5MTk2ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="People voting in election"
              className="rounded-lg shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
