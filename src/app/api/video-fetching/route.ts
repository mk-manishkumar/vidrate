import { NextResponse } from "next/server";
import axios from "axios";

// ===== Video URL Utilities =====
const URL_PATTERNS: Record<string, (url: URL) => string | null> = {
  "youtu.be": (url) => url.pathname.substring(1),

  "youtube.com": (url) => {
    if (url.pathname === "/watch") return url.searchParams.get("v");
    if (url.pathname.startsWith("/embed/")) return url.pathname.split("/")[2];
    if (url.pathname.startsWith("/shorts/")) return url.pathname.split("/")[2];
    return null;
  },
};

function normalizeHostname(hostname: string) {
  return hostname.replace(/^www\./, "").replace(/^m\./, "");
}

function extractVideoId(videoUrl: string): string | null {
  try {
    const url = new URL(videoUrl);
    const normalizedHost = normalizeHostname(url.hostname);

    if (URL_PATTERNS[normalizedHost]) return URL_PATTERNS[normalizedHost](url);

    if (normalizedHost.includes("youtube.com")) return URL_PATTERNS["youtube.com"](url);

    return null;
  } catch {
    return null;
  }
}

// ===== API Route =====
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const videoUrl = searchParams.get("url");

  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!videoUrl) return NextResponse.json({ error: "YouTube video URL is required." }, { status: 400 });

  const videoId = extractVideoId(videoUrl);

  if (!videoId) return NextResponse.json({ error: "Invalid YouTube video URL." }, { status: 400 });

  try {
    const response = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
      params: { part: "snippet,contentDetails", id: videoId, key: API_KEY },
    });

    if (!response.data.items?.length) return NextResponse.json({ error: "Video not found." }, { status: 404 });

    const video = response.data.items[0];

    const title = video.snippet.title;
    const thumbnail = video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default?.url;

    const duration = video.contentDetails.duration;

    return NextResponse.json({ title, thumbnail, duration });
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") console.log("YouTube API error:", error);

    if (error.response) return NextResponse.json({ error: error.response.data?.error?.message || "YouTube API error" }, { status: error.response.status });

    return NextResponse.json({ error: "Failed to fetch video details." }, { status: 500 });
  }
}
