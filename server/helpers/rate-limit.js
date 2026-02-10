import rateLimit from "express-rate-limit";

export const generalLimiter = rateLimit({
    windowMs: 1000 * 60,
    limit: 100,
    message: { error: "Rate limit exceeded", message: "Stop spamming. Wait 60 seconds to use the website again" },
    standardHeaders: 'draft-7',
    legacyHeaders: false
})

export const submitLimiter = rateLimit({
    windowMs: 2000,
    limit: 2,
    message: { error: "Rate limit exceeded", message: "Stop spamming" },
    standardHeaders: 'draft-7',
    legacyHeaders: false
})