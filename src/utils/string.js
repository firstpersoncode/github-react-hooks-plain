export const extractHostName = (url) => url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]

export const extractProtocol = (url) => url.split(':')[0]

export const formatDate = (
    monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    date
) => date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear()
