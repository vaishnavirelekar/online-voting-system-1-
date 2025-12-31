import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Shield, Lock, BarChart3 } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="mb-6">Secure Online Voting Made Simple</h1>
            <p className="text-xl text-gray-600 mb-8">
              Create, manage, and participate in polls and elections with our secure, transparent, and user-friendly voting platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg">
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="flex flex-col items-center text-center">
                <Shield className="size-10 text-blue-600 mb-2" />
                <span className="text-sm text-gray-600">Secure & Safe</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Lock className="size-10 text-blue-600 mb-2" />
                <span className="text-sm text-gray-600">Private Voting</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <BarChart3 className="size-10 text-blue-600 mb-2" />
                <span className="text-sm text-gray-600">Real-time Results</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1746016168296-f2ecff6ebbc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGVjaG5vbG9neSUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjY4MTE3NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Digital voting interface"
              className="rounded-lg shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
