import { PollCard, Poll } from "./PollCard";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search } from "lucide-react";

interface PollsSectionProps {
  polls: Poll[];
  onVote: (pollId: string) => void;
  onViewResults: (pollId: string) => void;
  votedPolls: string[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterCategory: string;
  onFilterChange: (category: string) => void;
}

export function PollsSection({
  polls,
  onVote,
  onViewResults,
  votedPolls,
  searchQuery,
  onSearchChange,
  filterCategory,
  onFilterChange,
}: PollsSectionProps) {
  return (
    <section id="polls" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="mb-2">Active Polls</h2>
          <p className="text-gray-600">
            Browse and participate in ongoing polls and elections
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <Input
              placeholder="Search polls..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterCategory} onValueChange={onFilterChange}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="General">General</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Politics">Politics</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Sports">Sports</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {polls.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No polls found matching your criteria</p>
            </div>
          ) : (
            polls.map((poll) => (
              <PollCard
                key={poll.id}
                poll={poll}
                onVote={onVote}
                onViewResults={onViewResults}
                hasVoted={votedPolls.includes(poll.id)}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
