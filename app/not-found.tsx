import { ArticlePage } from "@/components/ArticlePage";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <ArticlePage
      article={{
        title: "Page not found",
        description: "",
        lead: [
          {
            type: "prose",
            paragraphs: [
              `${site.brand} does not have a page at this address. The link may be out of date.`,
              "Go to the [[/|main article]] or the [[/contact/|Contact Me]] page.",
            ],
          },
        ],
        sections: [],
      }}
    />
  );
}
