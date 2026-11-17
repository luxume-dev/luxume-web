'use client';

import { useGeneralSettings } from '@/hooks/useGeneralSettings';

/** First phone number in a field that may hold several ("+91 98..., +91 97..."), kept dialable for tel:. */
function toTel(value) {
  const first = String(value || '').split(/[,/;|]/)[0];
  const hasPlus = first.trim().startsWith('+');
  const digits = first.replace(/\D/g, '');
  return digits ? `${hasPlus ? '+' : ''}${digits}` : '';
}

const btnClass =
  'relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-md transition-transform duration-300 hover:scale-105';

/**
 * Floating contact buttons: Call (above) + WhatsApp (below).
 * WhatsApp number/message come from General Settings → Footer → WhatsApp Button.
 * Call number comes from General Settings → Footer → Call Button. Each button is hidden when its number is empty.
 */
export default function WhatsAppButton() {
  const { footer } = useGeneralSettings();

  const waPhone = String(footer.whatsapp_button?.phone || '').replace(/\D/g, '');
  const message = String(footer.whatsapp_button?.message || '').trim();
  const waHref = waPhone ? `https://wa.me/${waPhone}${message ? `?text=${encodeURIComponent(message)}` : ''}` : '';

  const tel = toTel(footer.call_button?.phone);

  if (!waHref && !tel) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-3">
      {tel && (
        <a
          href={`tel:${tel}`}
          aria-label="Call us"
          className={btnClass}
          style={{ backgroundColor: '#0A66C2' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="white" aria-hidden="true">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
          </svg>
        </a>
      )}

      {waHref && (
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className={btnClass}
          style={{ backgroundColor: '#25D366' }}
        >
          {/* Soft pulse ring — hidden on mobile, sits behind the icon */}
          <span
            aria-hidden="true"
            className="hidden sm:block absolute inset-0 rounded-full fab-soft-pulse pointer-events-none"
            style={{ backgroundColor: '#25D366' }}
          />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="relative w-6 h-6" fill="white" aria-hidden="true">
            <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.466 2.027 7.762L0 32l8.479-2.003A15.938 15.938 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.266 13.266 0 01-6.753-1.843l-.484-.287-5.033 1.189 1.22-4.9-.315-.503A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333z" />
            <path d="M23.07 19.457c-.357-.179-2.11-1.04-2.437-1.16-.328-.117-.566-.179-.805.179-.24.357-.924 1.16-1.133 1.4-.209.237-.417.268-.774.089-.357-.179-1.507-.555-2.87-1.77-1.06-.946-1.776-2.114-1.984-2.471-.208-.357-.022-.55.157-.728.16-.16.357-.417.536-.626.179-.208.238-.357.357-.595.12-.238.06-.447-.03-.626-.09-.179-.805-1.94-1.103-2.657-.29-.697-.585-.602-.805-.614l-.685-.011c-.238 0-.625.089-.952.447-.328.357-1.25 1.22-1.25 2.977s1.28 3.453 1.458 3.69c.179.238 2.52 3.848 6.11 5.395.854.37 1.52.59 2.04.755.857.273 1.638.235 2.254.143.688-.102 2.11-.862 2.41-1.695.298-.832.298-1.546.208-1.695-.089-.15-.328-.238-.685-.417z" />
          </svg>
        </a>
      )}
    </div>
  );
}
