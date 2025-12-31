import { Vote, LogIn, UserPlus, Shield, Users as UsersIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface HeaderProps {
  currentUser: { name: string; email: string; role: "admin" | "voter" } | null;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogout: () => void;
  onSwitchView?: (view: "admin" | "voter") => void;
  currentView?: "admin" | "voter";
}

export function ElectionHeader({ 
  currentUser, 
  onLoginClick, 
  onSignupClick, 
  onLogout,
  onSwitchView,
  currentView = "voter"
}: HeaderProps) {
  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Vote className="size-8 text-blue-600" />
          <div>
            <span className="font-semibold text-xl">ElectionHub</span>
            {currentUser && (
              <Badge variant="outline" className="ml-2">
                {currentUser.role === "admin" ? <Shield className="size-3 mr-1" /> : <UsersIcon className="size-3 mr-1" />}
                {currentUser.role.toUpperCase()}
              </Badge>
            )}
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {currentUser?.role === "admin" ? (
            <>
              <a href="#dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">Dashboard</a>
              <a href="#elections" className="text-gray-700 hover:text-blue-600 transition-colors">Elections</a>
              <a href="#create" className="text-gray-700 hover:text-blue-600 transition-colors">Create Election</a>
              <a href="#voters" className="text-gray-700 hover:text-blue-600 transition-colors">Manage Voters</a>
            </>
          ) : (
            <>
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="#elections" className="text-gray-700 hover:text-blue-600 transition-colors">Elections</a>
              <a href="#results" className="text-gray-700 hover:text-blue-600 transition-colors">Results</a>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <span className="text-gray-700 hidden md:inline">Welcome, {currentUser.name}</span>
              {currentUser.role === "admin" && onSwitchView && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onSwitchView(currentView === "admin" ? "voter" : "admin")}
                >
                  {currentView === "admin" ? "Voter View" : "Admin View"}
                </Button>
              )}
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
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
