import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Election } from "./ElectionCard";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { ArrowLeft, CheckCircle2, Calendar, Users, Clock } from "lucide-react";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface VotingPageProps {
  election: Election;
  onBack: () => void;
  onSubmitVote: (electionId: string, candidateId: string) => void;
  hasVoted: boolean;
  votedCandidateId?: string;
}

export function VotingPage({ election, onBack, onSubmitVote, hasVoted, votedCandidateId }: VotingPageProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = () => {
    if (!selectedCandidate) {
      toast.error("Please select a candidate");
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    onSubmitVote(election.id, selectedCandidate);
    setShowConfirmation(false);
    toast.success("Vote cast successfully!");
  };

  const selectedCandidateName = election.candidates.find(c => c.id === selectedCandidate)?.name;
  
  const now = new Date();
  const endDate = new Date(election.endDate);
  const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const turnout = election.eligibleVoters > 0 
    ? ((election.totalVotes / election.eligibleVoters) * 100).toFixed(1) 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="size-4 mr-2" />
          Back to Elections
        </Button>

        {/* Election Info Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <CardTitle>{election.title}</CardTitle>
                  <Badge variant={election.status === "active" ? "default" : "secondary"}>
                    {election.status === "active" ? "Active" : "Closed"}
                  </Badge>
                </div>
                <CardDescription className="text-base">{election.description}</CardDescription>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="size-5 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-600">Voting Period</div>
                  <div className="font-semibold">
                    {new Date(election.startDate).toLocaleDateString()} - {new Date(election.endDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Clock className="size-5 text-orange-600" />
                <div>
                  <div className="text-sm text-gray-600">Time Remaining</div>
                  <div className="font-semibold">{daysLeft} days left</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Users className="size-5 text-green-600" />
                <div>
                  <div className="text-sm text-gray-600">Voter Turnout</div>
                  <div className="font-semibold">{turnout}% ({election.totalVotes}/{election.eligibleVoters})</div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Voting Section */}
        <div className="max-w-4xl mx-auto">
          {hasVoted ? (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-8 text-green-600" />
                  <div>
                    <CardTitle className="text-green-900">Vote Successfully Cast</CardTitle>
                    <CardDescription className="text-green-700">
                      Thank you for participating in this election
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    Your vote has been recorded securely and anonymously. You cannot change your vote once submitted.
                  </p>
                  {votedCandidateId && (
                    <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <Avatar className="size-12">
                        <AvatarFallback className="bg-green-600 text-white">
                          {election.candidates.find(c => c.id === votedCandidateId)?.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-green-900">You voted for:</div>
                        <div className="text-lg font-bold text-green-700">
                          {election.candidates.find(c => c.id === votedCandidateId)?.name}
                        </div>
                        {election.candidates.find(c => c.id === votedCandidateId)?.party && (
                          <div className="text-sm text-green-600">
                            {election.candidates.find(c => c.id === votedCandidateId)?.party}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Cast Your Vote</CardTitle>
                <CardDescription>
                  Select your preferred candidate below. Your vote is confidential and cannot be changed once submitted.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Voting Instructions:</h4>
                  <ul className="space-y-1 text-sm text-blue-800">
                    <li>• Select one candidate by clicking on their card</li>
                    <li>• Review your selection carefully before confirming</li>
                    <li>• You can only vote once in this election</li>
                    <li>• Your vote is anonymous and secure</li>
                  </ul>
                </div>

                <RadioGroup value={selectedCandidate} onValueChange={setSelectedCandidate}>
                  <div className="space-y-4">
                    {election.candidates.map((candidate) => (
                      <div
                        key={candidate.id}
                        className={`flex items-center space-x-4 p-6 border-2 rounded-lg hover:bg-gray-50 transition-all cursor-pointer ${
                          selectedCandidate === candidate.id
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200"
                        }`}
                        onClick={() => setSelectedCandidate(candidate.id)}
                      >
                        <RadioGroupItem value={candidate.id} id={candidate.id} />
                        <Avatar className="size-16">
                          <AvatarFallback className="text-xl">
                            {candidate.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <Label htmlFor={candidate.id} className="flex-1 cursor-pointer">
                          <div>
                            <div className="text-xl font-bold">{candidate.name}</div>
                            {candidate.party && (
                              <div className="text-gray-600 mt-1">{candidate.party}</div>
                            )}
                          </div>
                        </Label>
                        {selectedCandidate === candidate.id && (
                          <CheckCircle2 className="size-6 text-blue-600" />
                        )}
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                <div className="mt-8 flex gap-4">
                  <Button variant="outline" onClick={onBack} className="flex-1">
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    className="flex-1" 
                    size="lg"
                    disabled={!selectedCandidate}
                  >
                    Submit Vote
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Candidate Information */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Candidate Information</CardTitle>
              <CardDescription>Learn more about each candidate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {election.candidates.map((candidate) => (
                  <div key={candidate.id} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-4">
                      <Avatar className="size-14">
                        <AvatarFallback>
                          {candidate.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{candidate.name}</h4>
                        {candidate.party && (
                          <Badge variant="outline" className="mt-1">{candidate.party}</Badge>
                        )}
                        <p className="text-gray-600 mt-2 text-sm">
                          Candidate #{election.candidates.indexOf(candidate) + 1} running for {election.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Your Vote</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-4">
                <p>
                  You are about to cast your vote for:
                </p>
                <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <Avatar>
                    <AvatarFallback className="bg-blue-600 text-white">
                      {selectedCandidateName?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-lg">{selectedCandidateName}</div>
                    {election.candidates.find(c => c.id === selectedCandidate)?.party && (
                      <div className="text-sm text-gray-600">
                        {election.candidates.find(c => c.id === selectedCandidate)?.party}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Important:</strong> This action cannot be undone. Once you confirm, your vote will be permanently recorded.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Confirm & Cast Vote
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
