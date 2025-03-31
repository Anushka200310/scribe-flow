"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectActivityTypes } from "@/lib/projectActivityTypes";
import { Calendar1Icon, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import EntryCard from "./EntryCard";

const Entries = ({ entries }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [date, setDate] = useState(null);
  const [filteredEntries, setfilteredEntries] = useState(entries);

  const formattedDate = date ? format(date, "PPP") : "Pick a date";

  const clearFilter = () => {
    setSearchQuery("");
    setSelectedActivity("");
    setDate(null);
  };

  useEffect(() => {
    setfilteredEntries(entries); // Ensure it updates when new entries arrive
  }, [entries]);

  useEffect(() => {
    let filtered = entries;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (entry) =>
          entry.title.toLowerCase().includes(query) ||
          entry.content.toLowerCase().includes(query)
      );
    }

    if (selectedActivity) {
      filtered = filtered.filter(
        (entry) => entry.activityType === selectedActivity
      );
    }

    if (date) {
      filtered = filtered.filter((entry) =>
        isSameDay(new Date(entry.createdAt), date)
      );
    }
    setfilteredEntries(filtered);
  }, [entries, searchQuery, selectedActivity, date]);

  return (
    <>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <Input
            placeholder="Search Entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
            prefix={<Search className="h-4 w-4 text-gray-400" />}
          />
        </div>
        <Select value={selectedActivity} onValueChange={setSelectedActivity}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by activity" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(ProjectActivityTypes).map((activity) => (
              <SelectItem key={activity.id} value={activity.id}>
                <span className="flex items-center gap-2">
                  {activity.emoji} {activity.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <Calendar1Icon className="w-4 h-4" />
              {formattedDate}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {(searchQuery || selectedActivity || date) && (
          <Button
            variant="ghost"
            className="text-blue-600"
            onClick={clearFilter}
          >
            Clear Filters
          </Button>
        )}
      </div>
      {entries.length > 0 && (
        <div className="text-sm text-gray-500">
          Showing {filteredEntries.length} of {entries.length} entries
        </div>
      )}

      {filteredEntries.length === 0 ? (
        <div className="text-center p-8 flex flex-col items-center">
          <Calendar1Icon className="w-10 h-10 text-gray-400 mb-2" />
          <p className="text-gray-500">No entries found</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredEntries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </>
  );
};

export default Entries;
