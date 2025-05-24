import { NextRequest, NextResponse } from 'next/server';

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }
 try {
    const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=20&client_id=${UNSPLASH_ACCESS_KEY}`);

    if (!res.ok) {
      throw new Error('Failed to fetch from Unsplash');
    }

    const data = await res.json();

    return NextResponse.json({
      results: data.results.map((img: any) => ({
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
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}