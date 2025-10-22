// components/GoogleAdContainer.tsx
"use client";

import { Box } from "@mui/material";
import { useEffect } from "react";

interface GoogleAdContainerProps {
  adSlot: string;
  format?: "auto" | "rectangle" | "vertical" | "banner";
  responsive?: boolean;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function GoogleAdContainer({
  adSlot,
  format = "auto",
  responsive = true,
  style,
}: GoogleAdContainerProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  return (
    <Box
      sx={{
        textAlign: "center",
        my: 2,
        ...style,
      }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          ...(format === "vertical" && { width: "300px", height: "600px" }),
          ...(format === "rectangle" && { width: "300px", height: "250px" }),
          ...(format === "banner" && { width: "728px", height: "90px" }),
        }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive={responsive?.toString()}
      />
    </Box>
  );
}
