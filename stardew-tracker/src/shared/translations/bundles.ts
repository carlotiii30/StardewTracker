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

const bundleRewards: Record<Language, Record<BundleId, string>> = {
    es: {
        spring_crops: 'Acelerador básico (20)',
        summer_crops: 'Aspersor de calidad (1)',
        fall_crops: 'Colmena (1)',
        quality_crops: 'Envasadora (1)',
        animal_bundle: 'Prensa de queso (1)',
        artisan_bundle: 'Barril (1)',
        river_fish: 'Cebo de lujo (30)',
        lake_fish: 'Girador disfrazado (1)',
        ocean_fish: 'Tótem de viaje: Playa (5)',
        night_fishing: 'Anillo brillante (1)',
        crab_pot: 'Trampa para cangrejos (3)',
        specialty_fish: 'Plato de alta mar (5)',
        blacksmith_bundle: 'Horno (1)',
        geologist_bundle: 'Omnigeoda (5)',
        adventurer_bundle: 'Pequeño anillo magnético (1)',
        chef_bundle: 'Pastel rosa (3)',
        tinte_bundle: 'Semilladora (1)',
        campo_bundle: 'Máquina recicladora (1)',
        pienso_bundle: 'Radiador (1)',
        encantador_bundle: 'Lingote de oro (5)',
        spring_foraging: 'Semillas primaverales (30)',
        summer_foraging: 'Semillas veraniegas (30)',
        fall_foraging: 'Semillas otoñales (30)',
        winter_foraging: 'Semillas invernales (30)',
        construction_bundle: 'Horno de carbón (1)',
        exotic_foraging: 'Botín otoñal (5)',
    },
    en: {
        spring_crops: 'Basic Sprinkler (20)',
        summer_crops: 'Quality Sprinkler (1)',
        fall_crops: 'Bee House (1)',
        quality_crops: 'Preserves Jar (1)',
        animal_bundle: 'Cheese Press (1)',
        artisan_bundle: 'Barrel (1)',
        river_fish: 'Deluxe Bait (30)',
        lake_fish: 'Dressed Spinner (1)',
        ocean_fish: 'Beach Totem (5)',
        night_fishing: 'Bright Ring (1)',
        crab_pot: 'Crab Pot (3)',
        specialty_fish: 'Dish O’ The Sea (5)',
        blacksmith_bundle: 'Furnace (1)',
        geologist_bundle: 'Omni Geode (5)',
        adventurer_bundle: 'Small Magnet Ring (1)',
        chef_bundle: 'Pink Cake (3)',
        tinte_bundle: 'Seed Maker (1)',
        campo_bundle: 'Recycling Machine (1)',
        pienso_bundle: 'Heater (1)',
        encantador_bundle: 'Gold Bar (5)',
        spring_foraging: 'Spring Seeds (30)',
        summer_foraging: 'Summer Seeds (30)',
        fall_foraging: 'Fall Seeds (30)',
        winter_foraging: 'Winter Seeds (30)',
        construction_bundle: 'Charcoal Kiln (1)',
        exotic_foraging: 'Autumn’s Treasure (5)',
    },
};

export const getBundleRoomLabel = (roomId: BundleRoomId, language: Language) => bundleRooms[language][roomId];

export const getBundleName = (bundleId: BundleId, language: Language) => bundleNames[language][bundleId];

export const getBundleReward = (bundleId: BundleId, language: Language) => bundleRewards[language][bundleId];