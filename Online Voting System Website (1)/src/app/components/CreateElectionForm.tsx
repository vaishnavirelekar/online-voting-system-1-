import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Plus, X, Upload } from "lucide-react";
import { toast } from "sonner";

interface CreateElectionFormProps {
  onCreateElection: (election: {
    title: string;
    description: string;
    candidates: { name: string; party: string }[];
    startDate: string;
    endDate: string;
    eligibleVoters: number;
  }) => void;
  onClose?: () => void;
}

export function CreateElectionForm({ onCreateElection, onClose }: CreateElectionFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [candidates, setCandidates] = useState([{ name: "", party: "" }, { name: "", party: "" }]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eligibleVoters, setEligibleVoters] = useState("");

  const addCandidate = () => {
    setCandidates([...candidates, { name: "", party: "" }]);
  };

  const removeCandidate = (index: number) => {
    if (candidates.length > 2) {
      setCandidates(candidates.filter((_, i) => i !== index));
    }
  };

  const updateCandidate = (index: number, field: "name" | "party", value: string) => {
    const newCandidates = [...candidates];
    newCandidates[index][field] = value;
    setCandidates(newCandidates);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

    onCreateElection({
      title,
      description,
      candidates: filledCandidates,
      startDate,
      endDate,
      eligibleVoters: parseInt(eligibleVoters),
    });

    // Reset form
    setTitle("");
    setDescription("");
    setCandidates([{ name: "", party: "" }, { name: "", party: "" }]);
    setStartDate("");
    setEndDate("");
    setEligibleVoters("");
    
    toast.success("Election created successfully!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Election</CardTitle>
        <CardDescription>
          Set up a new election with candidates and voting period
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Election Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., 2025 Student Council President Election"
              className="mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the election and what voters should know..."
              className="mt-2"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-2"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="eligibleVoters">Number of Eligible Voters *</Label>
            <Input
              id="eligibleVoters"
              type="number"
              value={eligibleVoters}
              onChange={(e) => setEligibleVoters(e.target.value)}
              placeholder="e.g., 1000"
              className="mt-2"
              min="1"
              required
            />
          </div>

          <div>
            <Label>Candidates * (minimum 2)</Label>
            <div className="space-y-3 mt-2">
              {candidates.map((candidate, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={candidate.name}
                    onChange={(e) => updateCandidate(index, "name", e.target.value)}
                    placeholder="Candidate Name"
                    className="flex-1"
                  />
                  <Input
                    value={candidate.party}
                    onChange={(e) => updateCandidate(index, "party", e.target.value)}
                    placeholder="Party (Optional)"
                    className="flex-1"
                  />
                  {candidates.length > 2 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeCandidate(index)}
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
            <Button type="submit" className="flex-1" size="lg">
              Create Election
            </Button>
            {onClose && (
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
