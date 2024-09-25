export function getDistanceTop(distanceTop) {
    switch (distanceTop) {
        case 'xs': return 'mt-2';
        case 's': return 'mt-4';
        case 'm': return 'mt-10';
        case 'xl': return 'mt-16';
        case 'xxl': return 'mt-24';
        default: return 'mt-0';
    }
}

export function getDistanceBottom(distanceBottom) {
    switch (distanceBottom) {
        case 'xs': return 'mb-2';
        case 's': return 'mb-4';
        case 'm': return 'mb-10';
        case 'xl': return 'mb-16';
        case 'xxl': return 'mb-24';
        default: return 'mb-0';
    }
}