import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "FreshTable", short_name: "FreshTable", description: "Easy healthy recipes for everyday life.", start_url: "/", display: "standalone", background_color: "#ffffff", theme_color: "#15372c", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] };
}
