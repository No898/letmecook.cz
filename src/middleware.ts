import { NextRequest, NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
// Upravená cesta importu (bez ./src)
import { fallbackLng, languages, cookieName } from './i18n/settings'

acceptLanguage.languages([...languages])

export const config = {
    // Matcher: zachytí vše kromě API, _next/static, _next/image, a souborů s tečkou
    matcher: '/((?!api|_next/static|_next/image|.*\\..*).*)',
}

export function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    console.log(`Middleware hit for path: ${pathname}`);

    // Explicitní kontrola pro specifické soubory
    if (
        pathname.startsWith('/api/') ||
        pathname.startsWith('/_next/') ||
        pathname.includes('/favicon.') ||
        pathname === '/robots.txt' ||
        pathname === '/sitemap.xml'
    ) {
        // console.log(`Middleware: Skipping excluded path: ${pathname}`);
        return NextResponse.next();
    }

    // Detekce jazyka (vrácena)
    let lng: string | undefined | null = req.cookies.get(cookieName)?.value
    if (!lng || languages.indexOf(lng) === -1) {
        lng = acceptLanguage.get(req.headers.get('Accept-Language'))
    }
    if (!lng || languages.indexOf(lng) === -1) {
        lng = fallbackLng
    }
  
    // Přesměrování pokud locale chybí v URL (vráceno)
    const localeInPath = languages.some((loc) => pathname.startsWith(`/${loc}`))

    if (!localeInPath) {
        const targetUrl = new URL(`/${lng}${pathname}${req.nextUrl.search}`, req.url)
        return NextResponse.redirect(targetUrl)
    }

    // Nastavení cookie pro budoucí požadavky (vráceno)
    if (req.headers.has('referer')) {
        const refererUrl = new URL(req.headers.get('referer')!)
        const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
        const response = NextResponse.next()
        if (lngInReferer && lngInReferer !== req.cookies.get(cookieName)?.value) {
            response.cookies.set(cookieName, lngInReferer)
        }
        return response
    }

    return NextResponse.next()
} 