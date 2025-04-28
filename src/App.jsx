import React from "react";
import Routers from "./router/Routers";
import { fetchMetadata } from "./services";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react"

const App = () => {
  const { data: metadata } = useQuery({
    queryKey: ["metadata"],
    queryFn: fetchMetadata,
    staleTime: 21600000,
  });

  useEffect(() => {
    if (metadata) {
      document.title = metadata.settings[0].value_
      const favicon = document.querySelector("link[rel~='icon']")
      if (favicon) {
        favicon.href = metadata.images[1].value_
      }
    }
  }, [metadata])

  return (
    <div>
      <Routers />
    </div>
  );
};

export default App;
