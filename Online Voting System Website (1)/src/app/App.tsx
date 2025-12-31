import { useState, useMemo } from "react";
import { ElectionHeader } from "./components/ElectionHeader";
import { ElectionHero } from "./components/ElectionHero";
import { ElectionCard, Election, Candidate } from "./components/ElectionCard";
import { VoteModal } from "./components/VoteModal";
import { ElectionResults } from "./components/ElectionResults";
import { CreateElectionForm } from "./components/CreateElectionForm";
import { ElectionAuthModal } from "./components/ElectionAuthModal";
import { AdminDashboard } from "./components/AdminDashboard";
import { FaceAndQRDemo } from "./components/FaceAndQRDemo";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { Input } from "./components/ui/input";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./components/ui/alert-dialog";

// Mock data
const initialElections: Election[] = [
  {
    id: "1",
    title: "2025 Student Council President",
    description: "Vote for your next student council president to represent the student body",
    candidates: [
      { id: "1a", name: "Sarah Johnson", party: "Unity Party", votes: 342 },
      { id: "1b", name: "Michael Chen", party: "Progress Coalition", votes: 298 },
      { id: "1c", name: "Emily Rodriguez", party: "Student First", votes: 267 },
    ],
    startDate: "2025-01-01T00:00:00",
    endDate: "2025-01-15T23:59:59",
    totalVotes: 907,
    status: "active",
    eligibleVoters: 1500,
  },
  {
    id: "2",
    title: "Class Representative Election",
    description: "Choose your class representative for the academic year 2025",
    candidates: [
      { id: "2a", name: "David Kim", party: "Independent", votes: 156 },
      { id: "2b", name: "Jessica Martinez", party: "Student Voice", votes: 189 },
      { id: "2c", name: "James Wilson", party: "Independent", votes: 134 },
    ],
    startDate: "2025-01-05T00:00:00",
    endDate: "2025-01-20T23:59:59",
    totalVotes: 479,
    status: "active",
    eligibleVoters: 800,
  },
  {
    id: "3",
    title: "University Senate Election",
    description: "Elect faculty and student representatives to the university senate",
    candidates: [
      { id: "3a", name: "Dr. Robert Brown", party: "Academic Excellence", votes: 523 },
      { id: "3b", name: "Prof. Linda Davis", party: "Innovation Alliance", votes: 467 },
      { id: "3c", name: "Alex Thompson", party: "Student Coalition", votes: 412 },
      { id: "3d", name: "Maria Garcia", party: "Independent", votes: 389 },
    ],
    startDate: "2024-12-20T00:00:00",
    endDate: "2025-01-10T23:59:59",
    totalVotes: 1791,
    status: "active",
    eligibleVoters: 2500,
  },
];

interface User {
  name: string;
  email: string;
  role: "admin" | "voter";
  voterId?: string;
}

export default function App() {
  const [elections, setElections] = useState<Election[]>(initialElections);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<"admin" | "voter">("voter");
  const [votedElections, setVotedElections] = useState<{ [electionId: string]: string }>({});
  const [selectedElectionForVoting, setSelectedElectionForVoting] = useState<Election | null>(null);
  const [selectedElectionForResults, setSelectedElectionForResults] = useState<Election | null>(null);
  const [isVotingModalOpen, setIsVotingModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteElectionId, setDeleteElectionId] = useState<string | null>(null);

  const totalVoters = 5000; // Mock total registered voters

  const filteredElections = useMemo(() => {
    return elections.filter((election) => {
      const matchesSearch = election.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          election.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [elections, searchQuery]);

  const activeElections = filteredElections.filter(e => e.status === "active");
  const upcomingElections = filteredElections.filter(e => e.status === "upcoming");
  const closedElections = filteredElections.filter(e => e.status === "closed");

  const handleLogin = (email: string, password: string) => {
    // Mock login - check if admin credentials
    if (email === "admin@election.com" && password === "admin123") {
      setCurrentUser({ 
        name: "Admin User", 
        email: "admin@election.com", 
        role: "admin" 
      });
      setCurrentView("admin");
      toast.success("Welcome Admin!");
    } else {
      // Regular voter login
      setCurrentUser({ 
        name: email.split("@")[0], 
        email, 
        role: "voter",
        voterId: "V" + Math.floor(Math.random() * 1000000)
      });
      toast.success("Successfully logged in!");
    }
  };

  const handleSignup = (name: string, email: string, password: string, voterId: string) => {
    setCurrentUser({ name, email, role: "voter", voterId });
    toast.success("Registration successful! You can now vote.");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView("voter");
    setVotedElections({});
    toast.success("Logged out successfully");
  };

  const handleVote = (electionId: string) => {
    if (!currentUser) {
      setAuthModalTab("login");
      setIsAuthModalOpen(true);
      return;
    }
    
    if (votedElections[electionId]) {
      toast.error("You have already voted in this election");
      return;
    }
    
    const election = elections.find((e) => e.id === electionId);
    if (election) {
      setSelectedElectionForVoting(election);
      setIsVotingModalOpen(true);
    }
  };

  const handleSubmitVote = (electionId: string, candidateId: string) => {
    setElections((prevElections) =>
      prevElections.map((election) => {
        if (election.id === electionId) {
          return {
            ...election,
            candidates: election.candidates.map((candidate) =>
              candidate.id === candidateId 
                ? { ...candidate, votes: candidate.votes + 1 } 
                : candidate
            ),
            totalVotes: election.totalVotes + 1,
          };
        }
        return election;
      })
    );
    setVotedElections({ ...votedElections, [electionId]: candidateId });
  };

  const handleViewResults = (electionId: string) => {
    const election = elections.find((e) => e.id === electionId);
    if (election) {
      setSelectedElectionForResults(election);
    }
  };

  const handleCreateElection = (electionData: {
    title: string;
    description: string;
    candidates: { name: string; party: string }[];
    startDate: string;
    endDate: string;
    eligibleVoters: number;
  }) => {
    const now = new Date();
    const startDate = new Date(electionData.startDate);
    const status = startDate > now ? "upcoming" : "active";

    const newElection: Election = {
      id: Date.now().toString(),
      title: electionData.title,
      description: electionData.description,
      candidates: electionData.candidates.map((candidate, idx) => ({
        id: `${Date.now()}-${idx}`,
        name: candidate.name,
        party: candidate.party,
        votes: 0,
      })),
      startDate: electionData.startDate,
      endDate: electionData.endDate,
      totalVotes: 0,
      status,
      eligibleVoters: electionData.eligibleVoters,
    };
    setElections([newElection, ...elections]);
  };

  const handleDeleteElection = (electionId: string) => {
    setElections(elections.filter(e => e.id !== electionId));
    setDeleteElectionId(null);
    toast.success("Election deleted successfully");
  };

  const handleSwitchView = (view: "admin" | "voter") => {
    setCurrentView(view);
    toast.success(`Switched to ${view} view`);
  };

  // Results view
  if (selectedElectionForResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ElectionHeader
          currentUser={currentUser}
          onLoginClick={() => {
            setAuthModalTab("login");
            setIsAuthModalOpen(true);
          }}
          onSignupClick={() => {
            setAuthModalTab("signup");
            setIsAuthModalOpen(true);
          }}
          onLogout={handleLogout}
          onSwitchView={currentUser?.role === "admin" ? handleSwitchView : undefined}
          currentView={currentView}
        />
        <ElectionResults 
          election={selectedElectionForResults} 
          onBack={() => setSelectedElectionForResults(null)}
          votedCandidateId={votedElections[selectedElectionForResults.id]}
        />
        <ElectionAuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleLogin}
          onSignup={handleSignup}
          initialTab={authModalTab}
        />
        <Toaster />
      </div>
    );
  }

  // Admin view
  if (currentUser?.role === "admin" && currentView === "admin") {
    return (
      <div className="min-h-screen bg-gray-50">
        <ElectionHeader
          currentUser={currentUser}
          onLoginClick={() => {}}
          onSignupClick={() => {}}
          onLogout={handleLogout}
          onSwitchView={handleSwitchView}
          currentView={currentView}
        />
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="elections">Manage Elections</TabsTrigger>
                <TabsTrigger value="create">Create Election</TabsTrigger>
                <TabsTrigger value="face-qr">Face & QR System</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard">
                <AdminDashboard elections={elections} totalVoters={totalVoters} />
              </TabsContent>

              <TabsContent value="elections">
                <Card>
                  <CardHeader>
                    <CardTitle>Manage Elections</CardTitle>
                    <CardDescription>View and manage all elections in the system</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                        <Input
                          placeholder="Search elections..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredElections.map((election) => (
                        <ElectionCard
                          key={election.id}
                          election={election}
                          onViewResults={handleViewResults}
                          onEdit={(id) => toast.info("Edit functionality coming soon")}
                          onDelete={(id) => setDeleteElectionId(id)}
                          isAdmin={true}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="create">
                <CreateElectionForm onCreateElection={handleCreateElection} />
              </TabsContent>

              <TabsContent value="face-qr">
                <FaceAndQRDemo />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <AlertDialog open={!!deleteElectionId} onOpenChange={(open) => !open && setDeleteElectionId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Election</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this election? This action cannot be undone and all votes will be lost.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteElectionId && handleDeleteElection(deleteElectionId)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Toaster />
      </div>
    );
  }

  // Voter view
  return (
    <div className="min-h-screen bg-gray-50">
      <ElectionHeader
        currentUser={currentUser}
        onLoginClick={() => {
          setAuthModalTab("login");
          setIsAuthModalOpen(true);
        }}
        onSignupClick={() => {
          setAuthModalTab("signup");
          setIsAuthModalOpen(true);
        }}
        onLogout={handleLogout}
        onSwitchView={currentUser?.role === "admin" ? handleSwitchView : undefined}
        currentView={currentView}
      />
      
      <ElectionHero />
      
      <section id="elections" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="mb-2">Available Elections</h2>
            <p className="text-gray-600">
              Browse and participate in ongoing and upcoming elections
            </p>
          </div>

          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <Input
                placeholder="Search elections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs defaultValue="active" className="w-full">
            <TabsList>
              <TabsTrigger value="active">
                Active <Badge variant="secondary" className="ml-2">{activeElections.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="upcoming">
                Upcoming <Badge variant="secondary" className="ml-2">{upcomingElections.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="results">
                Results <Badge variant="secondary" className="ml-2">{closedElections.length}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeElections.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">No active elections at this time</p>
                  </div>
                ) : (
                  activeElections.map((election) => (
                    <ElectionCard
                      key={election.id}
                      election={election}
                      onVote={handleVote}
                      onViewResults={handleViewResults}
                      hasVoted={!!votedElections[election.id]}
                    />
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="upcoming" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingElections.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">No upcoming elections</p>
                  </div>
                ) : (
                  upcomingElections.map((election) => (
                    <ElectionCard
                      key={election.id}
                      election={election}
                      onViewResults={handleViewResults}
                    />
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="results" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {closedElections.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">No closed elections yet</p>
                  </div>
                ) : (
                  closedElections.map((election) => (
                    <ElectionCard
                      key={election.id}
                      election={election}
                      onViewResults={handleViewResults}
                      hasVoted={!!votedElections[election.id]}
                    />
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <VoteModal
        election={selectedElectionForVoting}
        isOpen={isVotingModalOpen}
        onClose={() => setIsVotingModalOpen(false)}
        onSubmitVote={handleSubmitVote}
        isLoggedIn={!!currentUser}
      />

      <ElectionAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
        initialTab={authModalTab}
      />

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="mb-4">ElectionHub</h3>
              <p className="text-gray-400">
                Secure, transparent, and accessible digital voting for democratic elections.
              </p>
            </div>
            <div>
              <h4 className="mb-4">For Voters</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#elections" className="hover:text-white transition-colors">Elections</a></li>
                <li><a href="#results" className="hover:text-white transition-colors">Results</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@electionhub.com</li>
                <li>1-800-VOTE-2025</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ElectionHub. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}