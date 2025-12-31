import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Election } from "./ElectionCard";
import { Switch } from "./ui/switch";

interface EditElectionModalProps {
  election: Election | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateElection: (electionId: string, updates: {
    title: string;
    description: string;
    candidates: { id: string; name: string; party: string; votes: number }[];
    startDate: string;
    endDate: string;
    eligibleVoters: number;
    resultsReleased: boolean;
  }) => void;
}

export function EditElectionModal({ election, isOpen, onClose, onUpdateElection }: EditElectionModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [candidates, setCandidates] = useState<{ id: string; name: string; party: string; votes: number }[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eligibleVoters, setEligibleVoters] = useState("");
  const [resultsReleased, setResultsReleased] = useState(false);

  useEffect(() => {
    if (election) {
      setTitle(election.title);
      setDescription(election.description);
      setCandidates(election.candidates);
      setStartDate(election.startDate.slice(0, 16));
      setEndDate(election.endDate.slice(0, 16));
      setEligibleVoters(election.eligibleVoters.toString());
      setResultsReleased((election as any).resultsReleased || false);
    }
  }, [election]);

  const addCandidate = () => {
    setCandidates([...candidates, { id: Date.now().toString(), name: "", party: "", votes: 0 }]);
  };

  const removeCandidate = (id: string) => {
    if (candidates.length > 2) {
      setCandidates(candidates.filter((c) => c.id !== id));
    } else {
      toast.error("Election must have at least 2 candidates");
    }
  };

  const updateCandidate = (id: string, field: "name" | "party", value: string) => {
    setCandidates(candidates.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!election) return;

    if (!title || !description || !startDate || !endDate || !eligibleVoters) {
      toast.error("Please fill in all required fields");
      return;
    }

    const filledCandidates = candidates.filter(c => c.name.trim() !== "");
    if (filledCandidates.length < 2) {
      toast.error("Please provide at least 2 candidates");
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      toast.error("End date must be after start date");
      return;
    }

    onUpdateElection(election.id, {
      title,
      description,
      candidates: filledCandidates,
      startDate,
      endDate,
      eligibleVoters: parseInt(eligibleVoters),
      resultsReleased,
    });

    onClose();
    toast.success("Election updated successfully!");
  };

  if (!election) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Election</DialogTitle>
          <DialogDescription>
            Update election details, candidates, and settings
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="edit-title">Election Title *</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="edit-description">Description *</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-startDate">Start Date *</Label>
              <Input
                id="edit-startDate"
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-endDate">End Date *</Label>
              <Input
                id="edit-endDate"
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-2"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="edit-eligibleVoters">Number of Eligible Voters *</Label>
            <Input
              id="edit-eligibleVoters"
              type="number"
              value={eligibleVoters}
              onChange={(e) => setEligibleVoters(e.target.value)}
              className="mt-2"
              min="1"
              required
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label htmlFor="results-released" className="cursor-pointer">
                Release Results to Public
              </Label>
              <p className="text-sm text-gray-500 mt-1">
                Allow voters to view election results
              </p>
            </div>
            <Switch
              id="results-released"
              checked={resultsReleased}
              onCheckedChange={setResultsReleased}
            />
          </div>

          <div>
            <Label>Candidates * (minimum 2)</Label>
            <div className="space-y-3 mt-2">
              {candidates.map((candidate) => (
                <div key={candidate.id} className="flex gap-2">
                  <Input
                    value={candidate.name}
                    onChange={(e) => updateCandidate(candidate.id, "name", e.target.value)}
                    placeholder="Candidate Name"
                    className="flex-1"
                  />
                  <Input
                    value={candidate.party}
                    onChange={(e) => updateCandidate(candidate.id, "party", e.target.value)}
                    placeholder="Party (Optional)"
                    className="flex-1"
                  />
                  <div className="w-20 flex items-center justify-center text-sm text-gray-600">
                    {candidate.votes} votes
                  </div>
                  {candidates.length > 2 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeCandidate(candidate.id)}
                    >
                      <X className="size-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={addCandidate}
              className="mt-3"
            >
              <Plus className="size-4 mr-2" />
              Add Candidate
            </Button>
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1">
              Update Election
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
