export function backgroundColor(style) {
    if (style === 'Light Gray') {
        return 'style-light-gray';
    } else if (style === 'Light Green') {
        return 'style-light-green';
    } else if (style === 'White') {
        return 'style-white';
    } else if (style === 'Dark Green') {
        return 'style-dark-green';
    } else if (style === 'Dark Gray') {
        return 'style-dark-gray';
    } else if (style === 'Black') {
        return 'style-black';
    }
    return 'style-light-gray'; // Default class
}

export function textColor(style) {
    if (style === 'Dark Gray') {
        return 'var(--d-darkGray)';
    } else if (style === 'Light Green') {
        return 'var(--d-lightGreen)';
    } else if (style === 'White') {
        return 'var(--d-white)';
    } else if (style === 'Dark Green') {
        return 'var(--d-darkGreen)';
    } else if (style === 'Light Gray') {
        return 'var(--d-lightGray)';
    } else if (style === 'Black') {
        return 'var(--d-black)';
    }
    return 'var(--d-darkGray)'; // Default class
}