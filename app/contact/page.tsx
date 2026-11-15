import { ArticlePage } from "@/components/ArticlePage";
import { site } from "@/content/site";
import type { Article } from "@/content/types";
import { pageMeta } from "@/lib/meta";

const contact: Article = {
  title: "Contact Me",
  description: `How to contact ${site.name}.`,
  lead: [
    {
      type: "prose",
      paragraphs: [
        "The best way to reach me about engineering roles, or anything in the [[/|main article]], is email or LinkedIn.",
      ],
    },
  ],
  sections: [
    {
      heading: "Contact information",
      blocks: [
        {
          type: "list",
          items: [
            `**Email:** [[mailto:${site.email}|${site.email}]]`,
            `**LinkedIn:** [[${site.links.linkedin}|linkedin.com/in/dennisrhom]]`,
            `**GitHub:** [[${site.links.github}|github.com/dennisrhom]]`,
            `**Location:** ${site.location}`,
          ],
        },
      ],
    },
    {
      heading: "Work eligibility",
      blocks: [{ type: "prose", paragraphs: [site.eligibility] }],
    },
  ],
};

export const metadata = pageMeta({ title: contact.title, description: contact.description, path: "/contact/" });

export default function ContactPage() {
  return <ArticlePage article={contact} tab="contact" articleHref="/" />;
}
