// The button columns are text columns holding JSON arrays that line up by index.
// Also accepts an already-parsed array or a plain string.
function parseList(value) {
    if (Array.isArray(value)) return value.map((v) => String(v ?? ''));
    if (typeof value !== 'string' || value.trim() === '') return [];
    try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) return parsed.map((v) => String(v ?? ''));
    } catch {
        // not JSON: a single plain value
    }
    return [value];
}

// Supabase Storage serves a file as an attachment when ?download is set, so the
// button downloads instead of opening (the download attribute is ignored cross-origin).
function downloadUrl(url) {
    if (!url.includes('/storage/v1/object/public/') || /[?&]download=/.test(url)) return url;
    return url + (url.includes('?') ? '&' : '?') + 'download=';
}

const isExternal = (href) => /^(https?:)?\/\//i.test(href);

// Static buttons used where the section is not managed from the dashboard (product pages)
const DEFAULT_BUTTONS = [
    { label: 'Brochure', media: '/documents/Luxume%20Brochure.pdf', link: '' },
    { label: "Do's & Don'ts", media: '', link: '/dos-and-donts' },
    { label: 'Guarantee - Terms & Conditions', media: '', link: '/guarantee' },
];

const buttonClass =
    'inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-white font-lato font-semibold transition-all duration-300 hover:opacity-90';

const DownloadIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

/**
 * Downloads & Resources banner.
 * With `fromDashboard`, all content comes from home_page (download_title,
 * download_description, button_label / button_media / button_link): there are
 * no static fallbacks, empty fields are hidden, and the section is skipped when
 * it has no title, description or button. Without it, the static defaults are
 * shown (used on product pages).
 * A button downloads its file (media) when set, otherwise opens its link.
 */
export default function DownloadsAndResources({
    brandName = 'Luxume',
    fromDashboard = false,
    title = '',
    description = '',
    buttonLabels,
    buttonMedia,
    buttonLinks,
}) {
    let heading = title;
    let text = description;
    let buttons;

    if (fromDashboard) {
        const labels = parseList(buttonLabels);
        const media = parseList(buttonMedia);
        const links = parseList(buttonLinks);
        const count = Math.max(labels.length, media.length, links.length);
        buttons = Array.from({ length: count }, (_, i) => ({
            label: (labels[i] ?? '').trim(),
            media: (media[i] ?? '').trim(),
            link: (links[i] ?? '').trim(),
        }))
            // A button needs text to show and somewhere to go
            .filter((b) => b.label && (b.media || b.link));
    } else {
        heading = 'Downloads & Resources';
        text = `Access essential documents to help you make informed decisions and ensure the best performance of ${brandName} roofing products.`;
        buttons = DEFAULT_BUTTONS;
    }

    if (!heading && !text && buttons.length === 0) return null;

    return (
        <section className="py-16 px-4 md:px-8">
            <div
                className="max-w-6xl mx-auto text-center py-16 px-6 md:px-12"
                style={{
                    backgroundColor: '#1a1a2e',
                    borderRadius: '30px'
                }}
            >
                {heading && (
                    <h2 className="font-aloevera text-3xl md:text-4xl font-bold text-white mb-4">
                        {heading}
                    </h2>
                )}
                {text && (
                    <p
                        className={`font-lato text-gray-400 max-w-2xl mx-auto text-sm md:text-base whitespace-pre-line ${
                            buttons.length > 0 ? 'mb-10' : ''
                        }`}
                    >
                        {text}
                    </p>
                )}
                {buttons.length > 0 && (
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center">
                        {buttons.map((button, index) =>
                            button.media ? (
                                <a
                                    key={index}
                                    href={downloadUrl(button.media)}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={buttonClass}
                                    style={{ backgroundColor: '#C83C64' }}
                                >
                                    <DownloadIcon />
                                    {button.label}
                                </a>
                            ) : (
                                <a
                                    key={index}
                                    href={button.link}
                                    {...(isExternal(button.link) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                    className={buttonClass}
                                    style={{ backgroundColor: '#C83C64' }}
                                >
                                    {button.label}
                                </a>
                            )
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
