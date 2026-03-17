import { useEffect } from 'react'

/**
 * SEOMeta — Injecte dynamiquement <title> et <meta description> dans le <head>
 * Usage: <SEOMeta title="..." description="..." />
 */
export default function SEOMeta({ title, description, canonical }) {
    useEffect(() => {
        // Title
        document.title = title
            ? `${title} | CasinoQuébécois.net`
            : 'CasinoQuébécois.net — Meilleurs Casinos en Ligne au Québec 2026'

        // Description
        let metaDesc = document.querySelector('meta[name="description"]')
        if (!metaDesc) {
            metaDesc = document.createElement('meta')
            metaDesc.setAttribute('name', 'description')
            document.head.appendChild(metaDesc)
        }
        if (description) metaDesc.setAttribute('content', description)

        // OG Title
        let ogTitle = document.querySelector('meta[property="og:title"]')
        if (!ogTitle) {
            ogTitle = document.createElement('meta')
            ogTitle.setAttribute('property', 'og:title')
            document.head.appendChild(ogTitle)
        }
        ogTitle.setAttribute('content', document.title)

        // OG Description
        let ogDesc = document.querySelector('meta[property="og:description"]')
        if (!ogDesc) {
            ogDesc = document.createElement('meta')
            ogDesc.setAttribute('property', 'og:description')
            document.head.appendChild(ogDesc)
        }
        if (description) ogDesc.setAttribute('content', description)

        // Canonical
        if (canonical) {
            let link = document.querySelector('link[rel="canonical"]')
            if (!link) {
                link = document.createElement('link')
                link.setAttribute('rel', 'canonical')
                document.head.appendChild(link)
            }
            link.setAttribute('href', `https://casinoquebecois.net${canonical}`)
        }
    }, [title, description, canonical])

    return null
}
