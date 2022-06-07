import * as alt from 'alt-server';
import fs from 'fs';
import path from 'path';

const pendingScreenshots: {
    [key: string]: {
        data: Array<string>;
        didComplete: boolean;
    };
} = {};

alt.log(`alt:V Server - Boilerplate Started`);
alt.on('playerConnect', handlePlayerConnect);

const maxIndex = 25;
let someIndex = 0;

function handlePlayerConnect(player: alt.Player) {
    alt.log(`[${player.id}] ${player.name} has connected to the server.`);

    player.setDateTime(1, 1, 2022, 14, 0, 0);
    player.setWeather(2);

    // Hide Body -- FEMALE
    player.model = 'mp_f_freemode_01';
    player.setHeadBlendData(45, 45, 45, 31, 31, 31, 1, 1, 1);
    player.setClothes(6, 5, 0, 0); // Shoes
    player.setClothes(3, 8, 0, 0); // Torso
    player.setClothes(8, 10, 0, 0); // Undershirt
    player.setClothes(4, 13, 0, 0); // Legs
    // player.setClothes(11, 82, 0, 0); // Top

    // Hide Body -- MALE
    // player.model = 'mp_m_freemode_01';
    // player.setHeadBlendData(0, 0, 0, 31, 31, 31, 1, 1, 1);
    // player.setClothes(6, 5, 0, 0); // Shoes
    // player.setClothes(3, 3, 0, 0); // Torso
    // player.setClothes(8, 15, 0, 0); // Undershirt
    // player.setClothes(4, 11, 0, 0); // Legs
    // player.setClothes(11, 15, 0, 0); // Top

    player.spawn(-1158.92, -470.97, 56.64, 0);

    alt.emitClient(player, 'log:Console', 'alt:V Server - Boilerplate Started');
}

async function sleep(ms: number) {
    return new Promise((resolve: Function) => {
        alt.setTimeout(() => {
            resolve();
        }, ms);
    });
}

async function updateAsset(player: alt.Player) {
    await sleep(1);

    try {
        player.setClothes(11, someIndex, 0, 0);
        // player.setProp(7, someIndex, 0);
    } catch (err) {}

    await sleep(50);

    if (someIndex > maxIndex) {
        return;
    }

    alt.emitClient(player, 'takeScreenshot');
}

function handleScreenshot(player: alt.Player, data: string, index: number, lengthOfData: number) {
    if (!pendingScreenshots[player.id]) {
        pendingScreenshots[player.id] = {
            data: new Array(lengthOfData),
            didComplete: false,
        };
    }

    pendingScreenshots[player.id].data[index] = data;

    if (index !== lengthOfData - 1) {
        return;
    }

    pendingScreenshots[player.id].didComplete = true;

    const path = `${process.cwd()}/screenshots/${someIndex}.png`;
    const endData = pendingScreenshots[player.id].data.join('').replace(/^data:image\/\w+;base64,/, '');
    const buf = Buffer.from(endData, 'base64');
    fs.writeFileSync(path, buf);

    delete pendingScreenshots[player.id];

    someIndex += 1;
    updateAsset(player);
}

alt.onClient('updateAsset', updateAsset);
alt.onClient('handleScreenshot', handleScreenshot);
