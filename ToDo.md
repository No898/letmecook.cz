# Před vygenerovaný todo list pomocí codex cli, na věci, které bych se měl do budoucna podívat

# ToDo

Akční seznam vylepšení z auditu aplikace (Next.js 15, App Router, i18n, SEO, a11y, výkon, DX). Úkoly jsou seskupené a stručné. Po úpravách prosím spusťte: `npm run lint` a `npm test`.

## Next.js & Architektura

- [ ] Opravit typování `params` (nepoužívat `Promise`):
  - Soubory: `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`, `src/app/[locale]/recept/[id]/page.tsx`.
  - Použít signaturu `({ params }: { params: { ... } })` a odstranit `await params`.
- [ ] Sdílené Zod schéma: v detailu receptu použít `RecipeSchema` ze `src/types/recipe.zod.ts` a odstranit duplikované schéma v `src/app/[locale]/recept/[id]/page.tsx`.
- [ ] Middleware logy: odstranit globální `console.log` každého requestu v `src/middleware.ts` nebo jej chránit přes `NODE_ENV`/feature flag.

## i18n

- [ ] Lokalizovat texty v `HomePageHeader` (nápověda „Hover/Click…“, `title`/`aria-label` u přepínače jazyků) – přidat klíče do `public/locales/*/common.json` a číst přes `t`.
- [ ] Lokalizovat veškeré texty v `CookieConsentBanner` a přesunout do `common.json` všech lokálů.
- [ ] Zajistit, aby všechna `aria-label`/`title` pocházela z i18n, ne z pevných stringů.

## SEO

- [ ] Lokalizovaná metadata v layoutu: implementovat `generateMetadata` v `src/app/[locale]/layout.tsx` s `getTranslations(locale, 'common')`; odstranit statické `title`/`description`.
- [ ] Přidat `openGraph` a `twitter` metadata (title, description, images) pro lepší náhledy.
- [ ] Přidat JSON‑LD `Recipe` do stránky detailu receptu (serverová část) z validovaných dat: `name`, `image`, `description`, `author`, `datePublished`, `prepTime`, `cookTime`, `totalTime`, `recipeCuisine`, `recipeCategory`, `keywords`, `recipeIngredient`, `recipeInstructions`.
- [ ] Refaktor `src/app/sitemap.ts`: místo regexu importovat moduly receptů a číst `recipe.datePublished`; při chybě fallback na `fs.stat.mtime`.

## Přístupnost (a11y)

- [ ] `HomePageClient`: nastavit `alt={recipe.title}` u náhledů receptů (nenastavovat prázdný alt).
- [ ] `HomePageHeader`: přidat viditelné focus styly (`focus:ring`, apod.) pro interaktivní prvky.

## Výkon

- [ ] Zvážit `placeholder="blur"` + `blurDataURL` pro klíčové obrázky (hlavička/domov a `RecipeHeader`) kvůli LCP.
- [ ] GA skripty: odstranit/guardovat `console.log` v produkci (`NODE_ENV !== 'production'`).

## Data vrstva

- [ ] Standardizovat `originCountryCode` na ISO 3166-1 alpha‑2 (lowercase) a doplnit poznámku do `src/types/recipe.ts`.
- [ ] Opravit mapování `countryFlags` v `HomePageClient` (nesoulad `gb` vs. název souboru v `public/images`), případně odebrat nepoužité.

## DX & Údržba

- [ ] Odstranit nepoužité závislosti v `package.json` (např. `swiper`, `js-cookie`, `@openai/codex`, pokud nejsou potřeba).
- [ ] ESLint: zvážit `no-console` (s výjimkami pro server dev) a rozšířit `@typescript-eslint` pravidla (např. `no-floating-promises`).
- [ ] Pokud začnete používat vzdálené obrázky, přidat `images.remotePatterns` do `next.config.ts`.

## Testy

- [ ] Přidat test, že `datePublished` není v budoucnosti (pokud to pravidlo dává smysl pro veřejné recepty).
- [ ] Smoke test pro generátor sitemap (alespoň ověřit, že vrátí položky pro dostupné recepty a lokály).
- [ ] Testy na nové i18n klíče (header/consent) – konzistence klíčů a neprázdné hodnoty napříč lokály.

## UI drobnosti

- [ ] `HomePageHeader`: při přepnutí jazyka sestavit cestu z URL segmentů místo `string.replace` prefixu.
- [ ] `HomePageClient`: nahradit přímé přidávání vlastností na DOM element (`__flagListeners`) za `WeakMap<Element, {show: fn, hide: fn}>`.

