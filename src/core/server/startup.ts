import * as alt from 'alt-server';
import fs from 'fs';
import * as imagejs from 'image-js';
import { CLOTHING_CAMERA_INFO, CLOTHING_VALUES } from './config';
import { Utilities } from './utilities';

const pendingScreenshots: {
    [key: string]: {
        data: Array<string>;
        didComplete: boolean;
    };
} = {};

alt.log(`alt:V Server - Boilerplate Started`);

let dataSetName = 'FEMALE';

/**
 * The current index of what component is being worked on.
 * @type {number}
 * */
let componentsIndex = 0;

/**
 * The current internal array index of relative drawable clothing ids.
 * @type {number}
 * */
let componentIndex = 0;

/**
 * A data set of drawables and their maximum values.
 * @type {*} */
let dataSet: Array<{ id: number; max: number; isProp: boolean }> = CLOTHING_VALUES[dataSetName];

class GreenScreener {
    static init() {
        alt.on('playerConnect', GreenScreener.connect);
        alt.onClient('updateAsset', GreenScreener.update);
        alt.onClient('handleScreenshot', GreenScreener.screenshot);
    }

    private static connect(player: alt.Player) {
        alt.log(`[${player.id}] ${player.name} has connected to the server.`);
        player.setDateTime(1, 1, 2022, 14, 0, 0);
        player.setWeather(2);
        player.spawn(-1158.92, -470.97, 56.64, 0);
        Utilities.setPlayerModel(player, false);
        alt.emitClient(player, 'setup');
    }

    private static async update(player: alt.Player) {
        Utilities.setPlayerModel(player, dataSetName === 'FEMALE' ? false : true);
        Utilities.clearAllProps(player);

        await alt.Utils.wait(15);

        const currentComponent = dataSet[componentsIndex];

        try {
            if (currentComponent.isProp) {
                player.setProp(currentComponent.id, componentIndex, 0);
            } else {
                player.setClothes(currentComponent.id, componentIndex, 0, 0);
            }
        } catch (err) {}

        await alt.Utils.wait(15);

        // LEGS - Hide Feet for Leg Photos
        if (currentComponent.id === 4) {
            if (dataSetName === 'FEMALE') {
                player.setClothes(6, 12, 0, 0);
            } else {
                player.setClothes(6, 13, 0, 0);
            }
        }

        const cameraInfo = currentComponent.isProp
            ? CLOTHING_CAMERA_INFO.PROPS[currentComponent.id]
            : CLOTHING_CAMERA_INFO.CLOTHING[currentComponent.id];

        if (!cameraInfo) {
            console.log(`MISSING CAMERA INFO FOR ${currentComponent.id}`);
            process.exit(1);
        }

        await alt.Utils.wait(25);

        // PASS CAMERA INFORMATION HERE
        alt.emitClient(player, 'takeScreenshot', cameraInfo);
    }

    /**
     * Assembles the buffer, and then increments to the next clothing id, or component list, or data set.
     *
     * @private
     * @static
     * @param {alt.Player} player
     * @param {string} data
     * @param {number} index
     * @param {number} lengthOfData
     * @return {*}
     * @memberof GreenScreener
     */
    private static async screenshot(player: alt.Player, data: string, index: number, lengthOfData: number) {
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

        // DLC INFO
        const currentComponent = dataSet[componentsIndex];
        let dlcInfo: alt.IDlcCloth | alt.IDlcProp;

        if (currentComponent.isProp) {
            dlcInfo = player.getDlcProp(currentComponent.id);
        } else {
            dlcInfo = player.getDlcClothes(currentComponent.id);
        }

        // BEGIN --- CONSTRUCTION OF FILE NAME
        // componentIdentifier-dlcHash-isProp?-isNotShared?-drawableID
        const isShared =
            (!currentComponent.isProp && currentComponent.id === 1) ||
            (!currentComponent.isProp && currentComponent.id === 5);

        let fileName = `${process.cwd()}/screenshots/${currentComponent.id}-`;

        fileName += `${dlcInfo.dlc}-`;

        if (currentComponent.isProp) {
            fileName += `prop-`;
        }

        if (!isShared) {
            fileName += dataSetName.toLowerCase() + '-';
        }

        fileName += `${dlcInfo.drawable}.png`;

        // END --- CONSTRUCTION OF FILE NAME
        // WRITE THE FILE
        const endData = pendingScreenshots[player.id].data.join('').replace(/^data:image\/\w+;base64,/, '');
        delete pendingScreenshots[player.id];

        // Begin Processing Data for Screenshot
        let buf = Buffer.from(endData, 'base64');
        let image = await imagejs.Image.load(buf);
        image = image.crop({ x: image.width / 4.5, width: image.height });
        const imageBuffer = await image.toBuffer();
        fs.writeFileSync(fileName, imageBuffer);

        componentIndex += 1;

        if (componentIndex > currentComponent.max) {
            componentsIndex += 1;
            componentIndex = 0;

            if (componentsIndex >= dataSet.length) {
                dataSetName = 'MALE';
                dataSet = CLOTHING_VALUES[dataSetName];
                componentsIndex = 0;
            }
        }

        GreenScreener.update(player);
    }
}

GreenScreener.init();
