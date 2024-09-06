export function getBackgroundClass(style) {
    if (style === 'Light Gray') {
        return 'style-light-gray';
    } else if (style === 'Light Green') {
        return 'style-light-green';
    } else if (style === 'Dark gray') {
        return 'style-dark-gray';
    } else if (style === 'Black') {
        return 'style-black';
    }
    return 'style-light-gray'; // Default class
}