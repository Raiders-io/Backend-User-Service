import vine from '@vinejs/vine'

export const email = () => vine.string().email().maxLength(254)
export const bio = () => vine.string().trim().maxLength(500)
export const username = () => vine.string().alphaNumeric().toLowerCase().trim().maxLength(20)
export const name = () => vine.string().trim().maxLength(30)
export const avatar = () => vine.file({ size: '2mb', extnames: ['jpg', 'jpeg', 'png', 'webp'] })
