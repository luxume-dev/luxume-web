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
// Bucket files now arrive as site paths (/brands/x.pdf) proxied to storage, which keep the query.
function downloadUrl(url) {
    const isStorage = url.includes('/storage/v1/object/public/') || /^\/(?!\/)/.test(url);
    if (!isStorage || /[?&]download=/.test(url)) return url;
    return url + (url.includes('?') ? '&' : '?') + 'download=';
}

const isExternal = (href) => /^(https?:)?\/\//i.test(href);


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
 * it has no title, description or button. Without it (product pages), the
 * title and description come from the brand (download_title /
 * download_description, hidden when empty); the brand's brochure
 * (`brochureUrl` + `brochureLabel`) comes first when both are set, then its
 * link buttons (brands.download_buttons: [{ label, link }]).
 * A button downloads its file (media) when set, otherwise opens its link.
 */
export default function DownloadsAndResources({
    brochureUrl = '',
    brochureLabel = '',
    linkButtons,
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
        const brochure = brochureUrl?.trim();
        const brochureText = brochureLabel?.trim();
        const links = (Array.isArray(linkButtons) ? linkButtons : [])
            .map((b) => ({ label: String(b?.label ?? '').trim(), media: '', link: String(b?.link ?? '').trim() }))
            .filter((b) => b.label && b.link);
        buttons = [
            ...(brochure && brochureText ? [{ label: brochureText, media: brochure, link: '' }] : []),
            ...links,
        ];
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
