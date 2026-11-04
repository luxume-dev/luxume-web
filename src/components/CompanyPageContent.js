import { parseRichHtml } from '@/lib/parseHtml';

/**
 * Body of a company page (Privacy Policy, Terms & Conditions) edited in the
 * dashboard's rich-text editor. content is HTML (rendered through the safe
 * parseRichHtml subset); older rows may still hold blog-style blocks.
 */

const hasText = (s) => typeof s === 'string' && s.trim() !== '';

// List items, or (older data) the block's content split into lines
function listItems(block) {
  const items = Array.isArray(block.items) ? block.items.filter((i) => hasText(i?.text)) : [];
  if (items.length || !hasText(block.content)) return items;
  return block.content
    .split('\n')
    .filter(hasText)
    .map((text, idx) => ({ id: `${block.id}-${idx}`, text: text.trim() }));
}

function Block({ block }) {
  switch (block?.type) {
    case 'heading':
      return hasText(block.content) ? (
        <h2 className="aloevera-medium text-2xl text-[#0F172B] mt-8 mb-4">{block.content}</h2>
      ) : null;

    case 'paragraph':
      return hasText(block.content) ? <p className="mb-4 whitespace-pre-line">{block.content}</p> : null;

    case 'bullets':
    case 'numbered_list': {
      const items = listItems(block);
      if (!items.length) return null;
      const List = block.type === 'bullets' ? 'ul' : 'ol';
      return (
        <List className={`${block.type === 'bullets' ? 'list-disc' : 'list-decimal'} pl-6 mb-4 space-y-2`}>
          {items.map((item, idx) => (
            <li key={item.id ?? idx}>{item.text}</li>
          ))}
        </List>
      );
    }

    default:
      return null;
  }
}

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : null;

export default function CompanyPageContent({ title, description, content, updatedAt }) {
  const isHtml = typeof content === 'string';
  const blocks = Array.isArray(content) ? content : [];
  const lastUpdated = formatDate(updatedAt);

  return (
    <main className="min-h-screen bg-white">
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="aloevera-bold text-4xl sm:text-5xl text-[#0F172B] mb-8">{title}</h1>
        <div className="prose prose-lg text-gray-600 font-lato max-w-none">
          {lastUpdated && <p className="mb-4">Last Updated: {lastUpdated}</p>}
          {hasText(description) && <p className="mb-6 whitespace-pre-line">{description}</p>}
          {isHtml
            ? parseRichHtml(content)
            : blocks.map((block, idx) => <Block key={block?.id ?? idx} block={block} />)}
        </div>
      </div>
    </main>
  );
}
