export const extractHostName = (url) => url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]

export const extractProtocol = (url) => url.split(':')[0]
