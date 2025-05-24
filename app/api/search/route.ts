import { NextResponse } from "next/server";

interface UnsplashImage {
  id: string;
  description: string | null;
  alt_description: string | null;
  urls: {
    small: string;
    full: string;
  };
  user: {
    name: string;
    links: {
      html: string;
    };
  };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`
  );
  const data = await res.json();

  return NextResponse.json({
    results: (data.results as UnsplashImage[]).map((img) => ({
      id: img.id,
      description: img.description || img.alt_description,
      url: img.urls.small,
      fullUrl: img.urls.full,
      user: {
        name: img.user.name,
        profile: img.user.links.html,
      },
    })),
  });
}
