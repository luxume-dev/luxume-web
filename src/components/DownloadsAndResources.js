export default function DownloadsAndResources() {
    return (
        <section className="py-16 px-4 md:px-8">
            <div
                className="max-w-6xl mx-auto text-center py-16 px-6 md:px-12"
                style={{
                    backgroundColor: '#1a1a2e',
                    borderRadius: '30px'
                }}
            >
                <h2 className="font-aloevera text-3xl md:text-4xl font-bold text-white mb-4">
                    Downloads & Resources
                </h2>
                <p className="font-lato text-gray-400 max-w-2xl mx-auto text-sm md:text-base mb-10">
                    Access essential documents to help you make informed decisions and ensure the best performance of Luxume roofing products.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="#"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-white font-lato font-semibold transition-all duration-300 hover:opacity-90"
                        style={{ backgroundColor: '#C83C64' }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Product Catalogue
                    </a>
                    <a
                        href="/dos-and-donts"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-white font-lato font-semibold transition-all duration-300 hover:opacity-90"
                        style={{ backgroundColor: '#C83C64' }}
                    >
                        Do&apos;s &amp; Don&apos;ts
                    </a>
                    <a
                        href="/guarantee"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-white font-lato font-semibold transition-all duration-300 hover:opacity-90"
                        style={{ backgroundColor: '#C83C64' }}
                    >
                        Guarantee - Terms &amp; Conditions
                    </a>
                </div>
            </div>
        </section>
    );
}
