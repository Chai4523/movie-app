import { SegmentedControl, Text } from "@mantine/core";
import { useState } from "react";

export default function SearchPage() {
  const [mediaType, setMediaType] = useState("movie");

  return (
    <div>
      Search Page
      <Text>Explore</Text>
      <SegmentedControl
        value={mediaType}
        onChange={setMediaType}
        data={[
          { label: "Movies", value: "movie" },
          { label: "TV Shows", value: "tv" },
        ]}
      />
      
    </div>
  );
}
