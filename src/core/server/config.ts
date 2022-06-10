import { CameraInfo } from '../shared/interfaces';

export const CLOTHING_IDS = {
    MASKS: 1,
    HAIR: 2,
    TORSOS: 3,
    LEGS: 4,
    BAGS: 5,
    SHOES: 6,
    ACCESSORIES: 7,
    UNDERSHIRTS: 8,
    BODY_ARMOUR: 9,
    TOP: 11,
};

export const PROP_IDS = {
    HATS: 0,
    GLASSES: 1,
    EARS: 2,
    WATCHES: 6,
    BRACELETS: 7,
};

export const CLOTHING_CAMERA_INFO: { CLOTHING: { [key: string]: CameraInfo }; PROPS: { [key: string]: CameraInfo } } = {
    CLOTHING: {
        // 1
        [CLOTHING_IDS.MASKS]: {
            fov: 30,
            rotation: {
                x: 0,
                y: 0,
                z: -200,
            },
            zPos: 0.65,
        },
        // 2
        [CLOTHING_IDS.HAIR]: {
            fov: 20,
            rotation: {
                x: 0,
                y: 0,
                z: -200,
            },
            zPos: 0.75,
        },
        // 3
        [CLOTHING_IDS.TORSOS]: {
            fov: 45,
            rotation: {
                x: 0,
                y: 0,
                z: -165,
            },
            zPos: 0.3,
        },
        // 4
        [CLOTHING_IDS.LEGS]: {
            fov: 60,
            rotation: {
                x: 0,
                y: 0,
                z: -165,
            },
            zPos: -0.3,
        },
        // 5
        [CLOTHING_IDS.BAGS]: {
            fov: 40,
            rotation: {
                x: 0,
                y: 0,
                z: -345,
            },
            zPos: 0.3,
        },
        // 6
        [CLOTHING_IDS.SHOES]: {
            fov: 40,
            rotation: {
                x: 0,
                y: 0,
                z: -165,
            },
            zPos: -0.85,
        },
        // 7
        [CLOTHING_IDS.ACCESSORIES]: {
            fov: 45,
            rotation: {
                x: 0,
                y: 0,
                z: -165,
            },
            zPos: 0.3,
        },
        // 8
        [CLOTHING_IDS.UNDERSHIRTS]: {
            fov: 45,
            rotation: {
                x: 0,
                y: 0,
                z: -165,
            },
            zPos: 0.3,
        },
        // 9
        [CLOTHING_IDS.BODY_ARMOUR]: {
            fov: 45,
            rotation: {
                x: 0,
                y: 0,
                z: -165,
            },
            zPos: 0.3,
        },
        // 11
        [CLOTHING_IDS.TOP]: {
            fov: 45,
            rotation: {
                x: 0,
                y: 0,
                z: -165,
            },
            zPos: 0.3,
        },
    },
    PROPS: {
        // 0
        [PROP_IDS.HATS]: {
            fov: 30,
            rotation: {
                x: 0,
                y: 0,
                z: -200,
            },
            zPos: 0.65,
        },
        // 1
        [PROP_IDS.GLASSES]: {
            fov: 20,
            rotation: {
                x: 0,
                y: 0,
                z: -200,
            },
            zPos: 0.8,
        },
        // 2
        [PROP_IDS.EARS]: {
            fov: 20,
            rotation: {
                x: 0,
                y: 0,
                z: -82.5,
            },
            zPos: 0.675,
        },
        // 6
        [PROP_IDS.WATCHES]: {
            fov: 20,
            rotation: {
                x: 0,
                y: 0,
                z: -247.5,
            },
            zPos: 0,
        },
        // 7
        [PROP_IDS.BRACELETS]: {
            fov: 20,
            rotation: {
                x: 0,
                y: 0,
                z: -82.5,
            },
            zPos: -0.05,
        },
    },
};

const FEMALE = [
    { id: CLOTHING_IDS.MASKS, max: 197, isProp: false },
    { id: CLOTHING_IDS.HAIR, max: 80, isProp: false },
    { id: CLOTHING_IDS.TORSOS, max: 241, isProp: false },
    { id: CLOTHING_IDS.LEGS, max: 150, isProp: false },
    { id: CLOTHING_IDS.BAGS, max: 99, isProp: false },
    { id: CLOTHING_IDS.SHOES, max: 105, isProp: false },
    { id: CLOTHING_IDS.ACCESSORIES, max: 120, isProp: false },
    { id: CLOTHING_IDS.UNDERSHIRTS, max: 233, isProp: false },
    { id: CLOTHING_IDS.BODY_ARMOUR, max: 18, isProp: false },
    { id: CLOTHING_IDS.TOP, max: 414, isProp: false },
    { id: PROP_IDS.HATS, max: 162, isProp: true },
    { id: PROP_IDS.GLASSES, max: 41, isProp: true },
    { id: PROP_IDS.EARS, max: 21, isProp: true },
    { id: PROP_IDS.WATCHES, max: 29, isProp: true },
    { id: PROP_IDS.BRACELETS, max: 15, isProp: true },
];

const MALE = [
    { id: CLOTHING_IDS.MASKS, max: 197, isProp: false },
    { id: CLOTHING_IDS.HAIR, max: 76, isProp: false },
    { id: CLOTHING_IDS.TORSOS, max: 196, isProp: false },
    { id: CLOTHING_IDS.LEGS, max: 143, isProp: false },
    { id: CLOTHING_IDS.BAGS, max: 99, isProp: false },
    { id: CLOTHING_IDS.SHOES, max: 101, isProp: false },
    { id: CLOTHING_IDS.ACCESSORIES, max: 151, isProp: false },
    { id: CLOTHING_IDS.UNDERSHIRTS, max: 188, isProp: false },
    { id: CLOTHING_IDS.BODY_ARMOUR, max: 16, isProp: false },
    { id: CLOTHING_IDS.TOP, max: 392, isProp: false },
    { id: PROP_IDS.HATS, max: 163, isProp: true },
    { id: PROP_IDS.GLASSES, max: 39, isProp: true },
    { id: PROP_IDS.EARS, max: 40, isProp: true },
    { id: PROP_IDS.WATCHES, max: 40, isProp: true },
    { id: PROP_IDS.BRACELETS, max: 8, isProp: true },
];

export const CLOTHING_VALUES = {
    FEMALE,
    MALE,
};
