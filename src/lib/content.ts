import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export async function getProfile() {
  const entry = await getEntry('profile', 'profile');
  if (!entry) throw new Error('content/profile.md is missing');
  return entry.data;
}

// Files are ordered by name ("01-about.md", "02-publications.md", ...);
// the anchor drops the numeric prefix ("about").
export async function getSections() {
  const all = await getCollection('sections', (s) => !s.data.hidden);
  return all
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((entry) => ({ entry, anchor: entry.id.replace(/^\d+[-_]?/, '') }));
}

// Publications are ordered by their arXiv ID (YYMM.NNNNN): newest month first,
// then by submission number. `date:` is the fallback when there is no arXiv link.
const ARXIV = /arxiv\.org\/(?:abs|pdf)\/(\d{2})(\d{2})\.(\d{4,5})/;

function pubKey(pub: CollectionEntry<'publications'>) {
  for (const url of Object.values(pub.data.links)) {
    const m = url.match(ARXIV);
    if (m) return { year: 2000 + Number(m[1]), month: Number(m[2]), seq: Number(m[3]) };
  }
  const d = pub.data.date;
  if (d) return { year: d.getFullYear(), month: d.getMonth() + 1, seq: d.getDate() };
  throw new Error(`content/publications/${pub.id}.md: add an arXiv link or a date`);
}

export async function getPublications() {
  const all = await getCollection('publications', (p) => !p.data.hidden);
  return all
    .map((entry) => ({ entry, ...pubKey(entry) }))
    .sort((a, b) => b.year - a.year || b.month - a.month || b.seq - a.seq);
}
