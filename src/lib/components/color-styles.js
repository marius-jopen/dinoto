export function backgroundColor(style) {
    if (style === 'Light Gray') {
        return 'style-light-gray';
    } else if (style === 'Light Green') {
        return 'style-light-green';
    } else if (style === 'Green') {
        return 'style-dark-green';
    } else if (style === 'Dark gray') {
        return 'style-dark-gray';
    } else if (style === 'Black') {
        return 'style-black';
    }
    return 'style-light-gray'; // Default class
}

export function textColor(style) {
    if (style === 'Gray') {
        return 'var(--d-darkGray)';
    } else if (style === 'Light Green') {
        return 'var(--d-lightGreen)';
    } else if (style === 'Green') {
        return 'var(--d-darkGreen)';
    } else if (style === 'Light gray') {
        return 'var(--d-lightGray)';
    } else if (style === 'Black') {
        return 'var(--d-black)';
    }
    return 'var(--d-darkGray)'; // Default class
}