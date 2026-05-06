import itemImageMap from '@shared/data/static/item-image-map.json';

const imageMap = itemImageMap as Record<string, string>;

export const normalizeItemName = (text: string): string => {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replaceAll(' ', '_')
        .replaceAll(',', '');
};

export const getItemImagePath = (itemName: string, explicitImage?: string): string => {
    if (explicitImage) {
        return explicitImage;
    }

    const key = normalizeItemName(itemName);
    return imageMap[key] ?? `/items/otros/${key}.png`;
};
