import { config, fields, collection } from "@keystatic/core";

/**
 * Keystatic CMS — content source of truth for projects/research case studies
 * and blog posts. Edited via /keystatic; content is committed to the repo.
 *
 * Storage is `local` in development (writes straight to disk) and switches to
 * GitHub mode in production via env (see Phase 4). The public site always reads
 * the committed files through `src/lib/content.ts`.
 */

const IMAGE_DIR = "public/images/projects";
const IMAGE_PATH = "/images/projects/";

export default config({
  // GitHub mode activates only when the App credentials are present; otherwise
  // local mode. Gating on the env var (not NODE_ENV) keeps `next build` working
  // — makeRouteHandler validates GitHub config eagerly, so it must not resolve
  // to GitHub mode during a build that has no credentials. In dev this stays
  // local (edit freely, no auth); on Vercel, set the four KEYSTATIC_GITHUB_*
  // vars (see .env.example + docs/CMS_SETUP.md) and redeploy to enable editing
  // on the live site.
  storage: process.env.KEYSTATIC_GITHUB_CLIENT_ID
    ? {
        kind: "github",
        repo: { owner: "daaffalbari", name: "daaffalbari-v2" },
      }
    : { kind: "local" },

  ui: {
    brand: { name: "Daffa Albari" },
    navigation: {
      Portfolio: ["projects"],
      Writing: ["posts"],
    },
  },

  collections: {
    projects: collection({
      label: "Projects & Research",
      slugField: "title",
      path: "src/content/projects/*",
      format: { contentField: "body" },
      columns: ["title", "kind", "year"],
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: { label: "Title" },
          slug: {
            label: "URL slug",
            description: "The /work/<slug> address. Derived from the title.",
          },
        }),

        kind: fields.select({
          label: "Kind",
          description: "Product ships to users; Research is a study or system.",
          options: [
            { label: "Product", value: "product" },
            { label: "Research", value: "research" },
          ],
          defaultValue: "product",
        }),

        year: fields.text({
          label: "Year",
          description: "e.g. 2025 or 2024–2025",
        }),

        company: fields.text({
          label: "Organization",
          description: "Optional — company or context (e.g. PT. Indonesia Indicator)",
        }),

        category: fields.text({
          label: "Category",
          description: "e.g. Healthcare, Data Science, Mobile/ML",
        }),

        featured: fields.checkbox({
          label: "Featured",
          description: "Featured projects lead the Selected work index.",
          defaultValue: false,
        }),

        order: fields.integer({
          label: "Sort order",
          description: "Lower numbers appear first.",
          defaultValue: 0,
        }),

        description: fields.text({
          label: "Short description",
          description: "One or two lines, shown in the Selected work list.",
          multiline: true,
        }),

        lede: fields.text({
          label: "Lede",
          description: "The standfirst under the title on the case page.",
          multiline: true,
        }),

        role: fields.text({ label: "Role" }),
        timeline: fields.text({ label: "Timeline", description: "e.g. 2025 — ongoing" }),
        team: fields.text({ label: "Team", description: "e.g. Solo, or 4 cross-functional" }),

        stack: fields.array(fields.text({ label: "Technology" }), {
          label: "Stack",
          itemLabel: (props) => props.value || "Technology",
        }),

        coverImage: fields.image({
          label: "Cover image",
          description: "Hero plate. Optional — research cases can use a diagram in the body instead.",
          directory: IMAGE_DIR,
          publicPath: IMAGE_PATH,
        }),
        coverAlt: fields.text({ label: "Cover image — alt text" }),
        coverCaption: fields.text({ label: "Cover caption", description: "Mono caption under the plate." }),

        gallery: fields.array(
          fields.object({
            image: fields.image({
              label: "Image",
              directory: IMAGE_DIR,
              publicPath: IMAGE_PATH,
            }),
            alt: fields.text({ label: "Alt text" }),
            caption: fields.text({ label: "Caption" }),
          }),
          {
            label: "Gallery",
            description: "Additional images/diagrams shown after the narrative.",
            itemLabel: (props) => props.fields.caption.value || "Image",
          }
        ),

        metrics: fields.array(
          fields.object({
            figure: fields.text({ label: "Figure", description: "e.g. ~0, 75%, Gov" }),
            label: fields.text({ label: "Label", multiline: true }),
            accent: fields.checkbox({ label: "Highlight in accent", defaultValue: false }),
          }),
          {
            label: "Metrics",
            description: "The hairline figure band. Keep to 2–4 for balance.",
            itemLabel: (props) =>
              `${props.fields.figure.value || "—"} · ${props.fields.label.value || ""}`,
          }
        ),

        achievements: fields.array(fields.text({ label: "Recognition" }), {
          label: "Recognition",
          description: "Awards, adoption, deployments.",
          itemLabel: (props) => props.value || "Recognition",
        }),

        links: fields.object({
          live: fields.url({ label: "Live URL" }),
          github: fields.url({ label: "Source URL" }),
          video: fields.url({ label: "Video URL" }),
          paper: fields.url({ label: "Paper / write-up URL" }),
        }),

        body: fields.markdoc({
          label: "Case study",
          description:
            "The narrative: problem, approach, what you built, results. Headings become section breaks.",
          options: {
            image: {
              directory: "public/images/projects/body",
              publicPath: "/images/projects/body/",
            },
          },
        }),
      },
    }),

    posts: collection({
      label: "Blog posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "body" },
      columns: ["title", "publishedAt"],
      entryLayout: "content",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        publishedAt: fields.date({
          label: "Published date",
          defaultValue: { kind: "today" },
        }),
        draft: fields.checkbox({
          label: "Draft",
          description: "Drafts are hidden from the live site.",
          defaultValue: false,
        }),
        excerpt: fields.text({
          label: "Excerpt",
          description: "Shown in the blog index and used for social previews.",
          multiline: true,
        }),
        coverImage: fields.image({
          label: "Cover image",
          directory: "public/images/blog",
          publicPath: "/images/blog/",
        }),
        coverAlt: fields.text({ label: "Cover image — alt text" }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value || "Tag",
        }),
        body: fields.markdoc({
          label: "Body",
          options: {
            image: {
              directory: "public/images/blog/body",
              publicPath: "/images/blog/body/",
            },
          },
        }),
      },
    }),
  },
});
