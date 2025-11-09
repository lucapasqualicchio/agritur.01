import { useEffect } from 'react';

type SEOProps = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string; // default: /og-image.png
  twitterCard?: 'summary' | 'summary_large_image';
  urlPath?: string; // optional absolute/relative URL
};

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
    document.head.appendChild(el!);
  } else {
    Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
  }
}

export default function SEO({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage = '/og-image.png',
  twitterCard = 'summary_large_image',
  urlPath,
}: SEOProps) {
  useEffect(() => {
    // Title
    document.title = title;

    // Description
    let desc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!desc) {
      desc = document.createElement('meta');
      desc.setAttribute('name', 'description');
      document.head.appendChild(desc);
    }
    desc.setAttribute('content', description);

    // Open Graph
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: ogTitle || title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: ogDescription || description });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: ogImage });
    if (urlPath) {
      upsertMeta('meta[property="og:url"]', { property: 'og:url', content: urlPath });
    }
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });

    // Twitter
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: twitterCard });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: ogTitle || title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: ogDescription || description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: ogImage });
  }, [title, description, ogTitle, ogDescription, ogImage, twitterCard, urlPath]);

  return null;
}