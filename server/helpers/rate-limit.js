import rateLimit from "express-rate-limit";

export const generalLimiter = rateLimit({
    windowMs: 1000 * 60 * 5,
    limit: 100,
    message: { error: "Too many requests", message: "Too many requests from this IP. Please try again after 60 seconds." },
    standardHeaders: 'draft-7',
    legacyHeaders: false
})

export const submitLimiter = rateLimit({
    windowMs: 2000,
    limit: 2,
    message: { error: "Too many requests", message: "Too many requests. Please slow down." },
    standardHeaders: 'draft-7',
    legacyHeaders: false
})