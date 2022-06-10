import * as alt from 'alt-client';
import * as native from 'natives';
import { AthenaBuffer } from '../shared/athenaBuffer';
import { CameraInfo } from '../shared/interfaces';

const greenScreenPosition = { x: -1159.2740478515625, y: -468.6954650878906, z: 55.2 };
const greenScreenRotation = { x: 0, y: 0, z: -165 };

let cam;
let camInfo: CameraInfo;

class GreenScreener {
    static init() {
        alt.onServer('takeScreenshot', GreenScreener.screenshot);
        alt.onServer('setup', GreenScreener.setup);
        alt.on('keyup', GreenScreener.keyup);
    }

    private static setup() {
        native.freezeEntityPosition(alt.Player.local.scriptID, false);
        native.displayRadar(false);
    }

    private static async keyup(key: number) {
        if (key !== 89) {
            return;
        }

        native.setEntityRotation(
            alt.Player.local.scriptID,
            greenScreenRotation.x,
            greenScreenRotation.y,
            greenScreenRotation.z,
            2,
            false
        );

        await alt.Utils.wait(100);

        native.setEntityCoordsNoOffset(
            alt.Player.local.scriptID,
            greenScreenPosition.x,
            greenScreenPosition.y,
            greenScreenPosition.z,
            false,
            false,
            false
        );

        await alt.Utils.wait(50);

        alt.emitServer('updateAsset');
    }

    private static async screenshot(cameraInfo: CameraInfo) {
        let testing = false;
        if (!cameraInfo) {
            testing = true;
            cameraInfo = {
                fov: 20,
                rotation: {
                    x: 0,
                    y: 0,
                    z: -247.5,
                },
                zPos: 0,
            };
        }

        if (!camInfo || camInfo.zPos !== cameraInfo.zPos) {
            camInfo = cameraInfo;

            if (cam) {
                native.destroyAllCams(true);
                native.destroyCam(cam, true);
                cam = undefined;
            }

            native.freezeEntityPosition(alt.Player.local.scriptID, false);
            native.setEntityCoordsNoOffset(
                alt.Player.local.scriptID,
                greenScreenPosition.x,
                greenScreenPosition.y,
                greenScreenPosition.z,
                false,
                false,
                false
            );

            native.setEntityRotation(
                alt.Player.local.scriptID,
                greenScreenRotation.x,
                greenScreenRotation.y,
                greenScreenRotation.z,
                2,
                false
            );

            native.freezeEntityPosition(alt.Player.local.scriptID, true);

            const fwd = native.getEntityForwardVector(alt.Player.local.scriptID);
            const fwdPos = {
                x: alt.Player.local.pos.x + fwd.x * 1.2,
                y: alt.Player.local.pos.y + fwd.y * 1.2,
                z: alt.Player.local.pos.z + camInfo.zPos,
            };

            cam = native.createCamWithParams(
                'DEFAULT_SCRIPTED_CAMERA',
                fwdPos.x,
                fwdPos.y,
                fwdPos.z,
                0,
                0,
                0,
                camInfo.fov,
                true,
                0
            );

            native.pointCamAtCoord(
                cam,
                alt.Player.local.pos.x,
                alt.Player.local.pos.y,
                alt.Player.local.pos.z + camInfo.zPos
            );
            native.setCamActive(cam, true);
            native.renderScriptCams(true, false, 0, true, false, 0);
        }

        await alt.Utils.wait(50);

        native.freezeEntityPosition(alt.Player.local.scriptID, false);

        native.setEntityCoordsNoOffset(
            alt.Player.local.scriptID,
            greenScreenPosition.x,
            greenScreenPosition.y,
            greenScreenPosition.z,
            false,
            false,
            false
        );

        native.setEntityRotation(
            alt.Player.local.scriptID,
            camInfo.rotation.x,
            camInfo.rotation.y,
            camInfo.rotation.z,
            2,
            false
        );

        native.freezeEntityPosition(alt.Player.local.scriptID, true);

        if (testing) {
            return;
        }

        const result = await alt.takeScreenshot();
        const data = AthenaBuffer.toBuffer(result);
        const totalLength = data.length;

        for (let i = 0; i < totalLength; i++) {
            alt.emitServer('handleScreenshot', data[i], i, totalLength);
        }
    }
}

GreenScreener.init();
