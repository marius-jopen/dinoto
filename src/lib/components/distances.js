export function getDistanceTop(distanceTop) {
    switch (distanceTop) {
        case 'xs': return 'pt-2';
        case 's': return 'pt-4';
        case 'm': return 'pt-10';
        case 'xl': return 'pt-16';
        case 'xxl': return 'pt-24';
        default: return 'pt-0';
    }
}

export function getDistanceBottom(distanceBottom) {
    switch (distanceBottom) {
        case 'xs': return 'pb-2';
        case 's': return 'pb-4';
        case 'm': return 'pb-10';
        case 'xl': return 'pb-16';
        case 'xxl': return 'pb-24';
        default: return 'pb-0';
    }
}