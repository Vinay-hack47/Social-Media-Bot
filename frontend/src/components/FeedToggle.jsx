"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useEffect, useState } from "react"

const FeedToggle = ({ selected, onChange }) => {
  const [value, setValue] = useState(selected || "all")

  // Synchronize internal state with external onChange prop
  useEffect(() => {
    onChange(value)
  }, [value, onChange]) // Added onChange to dependency array for completeness [^1]

  return (
    <div className="w-full flex justify-center py-4">
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(val) => val && setValue(val)}
        className="bg-muted rounded-lg shadow-sm overflow-hidden" // Added overflow-hidden for cleaner rounded corners
      >
        <ToggleGroupItem
          value="all"
          className="px-6 py-2 text-sm font-medium data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
          aria-label="All Posts"
        >
          All Users
        </ToggleGroupItem>
        <ToggleGroupItem
          value="following"
          className="px-6 py-2 text-sm font-medium data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
          aria-label="Following Posts"
        >
          Following Only
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}

export default FeedToggle
