import type { Article, Block, Infobox as InfoboxData } from "@/content/types";
import type { OutlineSection } from "@/lib/outline";
import { FileLink, Gallery, MultiImage, Thumb, VideoThumb } from "./Media";
import { RichText } from "./RichText";

/** The text of an article: infobox, lead, then sections. */
export function ArticleBody({ article, sections }: { article: Article; sections: OutlineSection[] }) {
  return (
    <>
      {article.infobox && <Infobox box={article.infobox} fallbackTitle={article.title} />}
      <Blocks blocks={article.lead} />
      {sections.map((s) => (
        <SectionView key={s.id} section={s} />
      ))}
    </>
  );
}

function SectionView({ section }: { section: OutlineSection }) {
  const Heading = `h${section.level}` as const;
  return (
    <>
      <Heading id={section.id}>
        <RichText text={section.heading} />
      </Heading>
      {section.blocks && <Blocks blocks={section.blocks} />}
      {section.subsections.map((s) => (
        <SectionView key={s.id} section={s} />
      ))}
    </>
  );
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "prose":
      return (
        <>
          {block.paragraphs.map((p, i) => (
            <p key={i}>
              <RichText text={p} />
            </p>
          ))}
        </>
      );

    case "list": {
      const List = block.ordered ? "ol" : "ul";
      const list = (
        <List>
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText text={item} />
            </li>
          ))}
        </List>
      );
      return (
        <>
          {block.intro && (
            <p>
              <RichText text={block.intro} />
            </p>
          )}
          {block.columns ? <div className="div-col">{list}</div> : list}
        </>
      );
    }

    case "table":
      return (
        <>
          {block.intro && (
            <p>
              <RichText text={block.intro} />
            </p>
          )}
          <div className="table-wrap">
            <table className="wikitable">
              {block.caption && (
                <caption>
                  <RichText text={block.caption} />
                </caption>
              )}
              <thead>
                <tr>
                  {block.columns.map((c) => (
                    <th key={c} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) =>
                      c === 0 ? (
                        <th key={c} scope="row">
                          <RichText text={cell} />
                        </th>
                      ) : (
                        <td key={c}>
                          <RichText text={cell} />
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.note && (
            <p className="table-note">
              <RichText text={block.note} />
            </p>
          )}
        </>
      );

    case "thumb":
      return <Thumb image={block.image} side={block.side} width={block.width} />;

    case "multi":
      return <MultiImage images={block.images} caption={block.caption} width={block.width} />;

    case "gallery":
      return (
        <>
          {block.intro && (
            <p>
              <RichText text={block.intro} />
            </p>
          )}
          <Gallery images={block.images} />
        </>
      );

    case "video":
      return block.video ? <VideoThumb video={block.video} /> : null;

    case "hatnote":
      return (
        <div className="hatnote" role="note">
          <RichText text={block.text} />
        </div>
      );
  }
}

export function Infobox({ box, fallbackTitle }: { box: InfoboxData; fallbackTitle: string }) {
  return (
    <table className="infobox">
      <tbody>
        <tr>
          <th colSpan={2} className="infobox-above">
            <RichText text={box.title ?? fallbackTitle} />
          </th>
        </tr>
        {!box.image && box.imagePlaceholder && (
          <tr>
            <td colSpan={2} className="infobox-image">
              <div className="infobox-image-placeholder" aria-hidden="true" />
            </td>
          </tr>
        )}
        {box.image && (
          <>
            <tr>
              <td colSpan={2} className="infobox-image">
                <FileLink image={box.image} sizes="300px" priority />
              </td>
            </tr>
            {box.image.caption && (
              <tr>
                <td colSpan={2} className="infobox-caption">
                  <RichText text={box.image.caption} />
                </td>
              </tr>
            )}
          </>
        )}
        {box.rows.map((row, i) =>
          "header" in row ? (
            <tr key={i}>
              <th colSpan={2} className="infobox-header">
                {row.header}
              </th>
            </tr>
          ) : (
            <tr key={i}>
              <th scope="row" className="infobox-label">
                {row.label}
              </th>
              <td className="infobox-data">
                <RichText text={row.value} />
              </td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
}
