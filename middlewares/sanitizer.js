import sanitizehtml from 'sanitize-html'

export default function sanitizer(req, res, next) {
    const data = req.body

    for (const key in data) {
        if (typeof data[key] === 'string') {
            data[key] = sanitizehtml(data[key], {
                allowedTags: ['b', 'i', 'em', 'strong', 'br', 'u', 'span', 'li', 'ul'],
                allowedAttributes: { 'span': ['style'] },
                allowedStyles: {
                    '*': {
                        'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(/, /^[a-z]+$/i],
                        'text-align': [/^left$/, /^right$/, /^center$/]
                    }
                }
            })
        }
    }
    next()
}