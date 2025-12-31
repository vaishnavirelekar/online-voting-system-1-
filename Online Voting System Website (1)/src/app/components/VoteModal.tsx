import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Election } from "./ElectionCard";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";

interface VoteModalProps {
  election: Election | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitVote: (electionId: string, candidateId: string) => void;
  isLoggedIn: boolean;
}

export function VoteModal({ election, isOpen, onClose, onSubmitVote, isLoggedIn }: VoteModalProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!election) return null;

  const handleSubmit = () => {
    if (!isLoggedIn) {
      toast.error("Please login to vote");
      onClose();
      return;
    }

    if (!selectedCandidate) {
      toast.error("Please select a candidate");
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    onSubmitVote(election.id, selectedCandidate);
    setSelectedCandidate("");
    setShowConfirmation(false);
    onClose();
    toast.success("Vote cast successfully!");
  };

  const selectedCandidateName = election.candidates.find(c => c.id === selectedCandidate)?.name;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{election.title}</DialogTitle>
            <DialogDescription>{election.description}</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <p className="text-sm text-gray-600 mb-4">
              Select your preferred candidate. Your vote is confidential and cannot be changed once submitted.
            </p>
            <RadioGroup value={selectedCandidate} onValueChange={setSelectedCandidate}>
              {election.candidates.map((candidate) => (
                <div 
                  key={candidate.id} 
                  className="flex items-center space-x-3 py-4 px-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <RadioGroupItem value={candidate.id} id={candidate.id} />
                  <Label htmlFor={candidate.id} className="flex items-center gap-3 flex-1 cursor-pointer">
                    <Avatar>
                      <AvatarFallback>{candidate.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{candidate.name}</div>
                      {candidate.party && (
                        <div className="text-sm text-gray-500">{candidate.party}</div>
                      )}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Submit Vote
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Your Vote</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to cast your vote for <strong>{selectedCandidateName}</strong>.
              <br /><br />
              This action cannot be undone. Are you sure you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>Confirm Vote</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
