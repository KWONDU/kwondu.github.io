import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// All editable content lives in /content. See README.md.

const profile = defineCollection({
  loader: glob({ pattern: 'profile.md', base: './content' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      title: z.string(),
      affiliation: z.object({ name: z.string(), url: z.url().optional() }),
      portrait: image(),
      links: z
        .array(
          z.object({
            label: z.string(),
            url: z.string(),
            icon: z.enum(['mail', 'scholar', 'github', 'linkedin', 'x', 'cv', 'link']).default('link'),
          }),
        )
        .default([]),
      coauthors: z.record(z.string(), z.url()).default({}),
      description: z.string(),
    }),
});

const sections = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/sections' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      type: z.enum(['text', 'publications', 'timeline', 'list', 'showcase']),
      hidden: z.boolean().default(false),
      // "list" sections: icon shown before every item.
      icon: z.enum(['award', 'star']).optional(),
      items: z
        .array(
          z.object({
            name: z.string(),
            role: z.string().optional(),
            date: z.string().optional(),
            url: z.url().optional(),
            logo: image().optional(),
            // "list" sections with an icon: medal color.
            medal: z.enum(['gold', 'silver', 'bronze']).optional(),
          }),
        )
        .default([]),
    }),
});

const publications = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/publications' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Optional: by default the year and order come from the arXiv link.
      date: z.coerce.date().optional(),
      // Full venue name (tooltip), and the short label shown above the title.
      venue: z.string(),
      venueShort: z.string(),
      selected: z.boolean().default(false),
      hidden: z.boolean().default(false),
      cover: image().optional(),
      // Suffix "*" for equal contribution, "#" for corresponding author.
      authors: z.array(z.string()),
      links: z.record(z.string(), z.url()).default({}),
    }),
});

const showcase = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/showcase' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.string().optional(),
      url: z.url().optional(),
      logo: image().optional(),
      hidden: z.boolean().default(false),
    }),
});

export const collections = { profile, sections, publications, showcase };
