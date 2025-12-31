import { Vote, LogIn, UserPlus } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  currentUser: { name: string; email: string } | null;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogout: () => void;
}

export function Header({ currentUser, onLoginClick, onSignupClick, onLogout }: HeaderProps) {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Vote className="size-8 text-blue-600" />
          <span className="font-semibold text-xl">VoteSecure</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
          <a href="#polls" className="text-gray-700 hover:text-blue-600 transition-colors">Active Polls</a>
          <a href="#results" className="text-gray-700 hover:text-blue-600 transition-colors">Results</a>
          <a href="#create" className="text-gray-700 hover:text-blue-600 transition-colors">Create Poll</a>
        </nav>

        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <span className="text-gray-700 hidden md:inline">Welcome, {currentUser.name}</span>
              <Button variant="outline" onClick={onLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" onClick={onLoginClick}>
                <LogIn className="size-4 mr-2" />
                Login
              </Button>
              <Button onClick={onSignupClick}>
                <UserPlus className="size-4 mr-2" />
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
