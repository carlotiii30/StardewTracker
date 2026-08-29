import type { Language } from '@shared/store/useLanguageStore';

type BundleRoomId = 'pantry' | 'fish_tank' | 'boiler_room' | 'bulletin_board' | 'crafts_room';
type BundleId =
    | 'spring_crops'
    | 'summer_crops'
    | 'fall_crops'
    | 'quality_crops'
    | 'animal_bundle'
    | 'artisan_bundle'
    | 'river_fish'
    | 'lake_fish'
    | 'ocean_fish'
    | 'night_fishing'
    | 'crab_pot'
    | 'specialty_fish'
    | 'blacksmith_bundle'
    | 'geologist_bundle'
    | 'adventurer_bundle'
    | 'chef_bundle'
    | 'tinte_bundle'
    | 'campo_bundle'
    | 'pienso_bundle'
    | 'encantador_bundle'
    | 'spring_foraging'
    | 'summer_foraging'
    | 'fall_foraging'
    | 'winter_foraging'
    | 'construction_bundle'
    | 'exotic_foraging';

const bundleRooms: Record<Language, Record<BundleRoomId, string>> = {
    es: {
        pantry: 'Despensa',
        fish_tank: 'Pecera',
        boiler_room: 'Caldera',
        bulletin_board: 'Tablón',
        crafts_room: 'Sala de manualidades',
    },
    en: {
        pantry: 'Pantry',
        fish_tank: 'Fish Tank',
        boiler_room: 'Boiler Room',
        bulletin_board: 'Bulletin Board',
        crafts_room: 'Crafts Room',
    },
};

const bundleNames: Record<Language, Record<BundleId, string>> = {
    es: {
        spring_crops: 'Lote Cultivos de Primavera',
        summer_crops: 'Lote Cultivos de Verano',
        fall_crops: 'Lote Cultivos de Otoño',
        quality_crops: 'Lote Cultivos de Calidad',
        animal_bundle: 'Lote Origen Animal',
        artisan_bundle: 'Lote Origen Artesanal',
        river_fish: 'Lote Peces Fluviales',
        lake_fish: 'Lote Peces de Lago',
        ocean_fish: 'Lote Peces Marinos',
        night_fishing: 'Lote Peces Nocturnos',
        crab_pot: 'Lote Trampa para Cangrejos',
        specialty_fish: 'Lote Peces Especiales',
        blacksmith_bundle: 'Lote Herrero',
        geologist_bundle: 'Lote Geólogo',
        adventurer_bundle: 'Lote Aventurero',
        chef_bundle: 'Lote Chef',
        tinte_bundle: 'Lote Tinte',
        campo_bundle: 'Lote Estudio de Campo',
        pienso_bundle: 'Lote Pienso',
        encantador_bundle: 'Lote Encantador',
        spring_foraging: 'Lote Recolección Primaveral',
        summer_foraging: 'Lote Recolección Veraniega',
        fall_foraging: 'Lote Recolección Otoñal',
        winter_foraging: 'Lote Recolección Invernal',
        construction_bundle: 'Lote Construcción',
        exotic_foraging: 'Lote Recolección Exótica',
    },
    en: {
        spring_crops: 'Spring Crops Bundle',
        summer_crops: 'Summer Crops Bundle',
        fall_crops: 'Fall Crops Bundle',
        quality_crops: 'Quality Crops Bundle',
        animal_bundle: 'Animal Bundle',
        artisan_bundle: 'Artisan Bundle',
        river_fish: 'River Fish Bundle',
        lake_fish: 'Lake Fish Bundle',
        ocean_fish: 'Ocean Fish Bundle',
        night_fishing: 'Night Fishing Bundle',
        crab_pot: 'Crab Pot Bundle',
        specialty_fish: 'Specialty Fish Bundle',
        blacksmith_bundle: 'Blacksmith\'s Bundle',
        geologist_bundle: 'Geologist\'s Bundle',
        adventurer_bundle: 'Adventurer\'s Bundle',
        chef_bundle: 'Chef\'s Bundle',
        tinte_bundle: 'Dye Bundle',
        campo_bundle: 'Field Research Bundle',
        pienso_bundle: 'Fodder Bundle',
        encantador_bundle: 'Enchanter\'s Bundle',
        spring_foraging: 'Spring Foraging Bundle',
        summer_foraging: 'Summer Foraging Bundle',
        fall_foraging: 'Fall Foraging Bundle',
        winter_foraging: 'Winter Foraging Bundle',
        construction_bundle: 'Construction Bundle',
        exotic_foraging: 'Exotic Foraging Bundle',
    },
};

export const getBundleRoomLabel = (roomId: BundleRoomId, language: Language) => bundleRooms[language][roomId];

export const getBundleName = (bundleId: BundleId, language: Language) => bundleNames[language][bundleId];