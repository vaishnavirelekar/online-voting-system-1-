import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Poll } from "./PollCard";
import { toast } from "sonner";

interface VotingModalProps {
  poll: Poll | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitVote: (pollId: string, optionId: string) => void;
  isLoggedIn: boolean;
}

export function VotingModal({ poll, isOpen, onClose, onSubmitVote, isLoggedIn }: VotingModalProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");

  if (!poll) return null;

  const handleSubmit = () => {
    if (!isLoggedIn) {
      toast.error("Please login to vote");
      onClose();
      return;
    }

    if (!selectedOption) {
      toast.error("Please select an option");
      return;
    }

    onSubmitVote(poll.id, selectedOption);
    setSelectedOption("");
    onClose();
    toast.success("Vote submitted successfully!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{poll.title}</DialogTitle>
          <DialogDescription>{poll.description}</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
            {poll.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-3 py-3 px-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                  {option.text}
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
  );
}
