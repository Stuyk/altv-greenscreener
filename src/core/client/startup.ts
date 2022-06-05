import * as alt from 'alt-client';
import * as native from 'natives';
import { AthenaBuffer } from '../shared/athenaBuffer';

alt.onServer('log:Console', handleLogConsole);

native.requestAnimDict('nm@hands');
native.requestAnimDict('mp_character_creation@lineup@male_a');

function handleLogConsole(msg: string) {
    alt.log(msg);
}

native.freezeEntityPosition(alt.Player.local.scriptID, false);
native.displayRadar(false);

let pos;

alt.on('keyup', async (key: number) => {
    if (key !== 89) {
        return;
    }

    console.log(native.getEntityHeading(alt.Player.local.scriptID));
    console.log(JSON.stringify(native.getEntityRotation(alt.Player.local.scriptID, 2)));

    pos = alt.Player.local.pos;
    const fwd = native.getEntityForwardVector(alt.Player.local.scriptID);
    const fwdPos = {
        x: alt.Player.local.pos.x + fwd.x * 1.2,
        y: alt.Player.local.pos.y + fwd.y * 1.2,
        z: alt.Player.local.pos.z + 0.15,
    };

    const cam = native.createCamWithParams(
        'DEFAULT_SCRIPTED_CAMERA',
        fwdPos.x,
        fwdPos.y,
        fwdPos.z,
        0,
        0,
        0,
        40,
        true,
        0
    );

    native.pointCamAtCoord(cam, alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z + 0.15);
    native.setCamActive(cam, true);
    native.renderScriptCams(true, false, 0, true, false, 0);

    // native.taskPlayAnim(alt.Player.local.scriptID, 'nm@hands', 'hands_up', 8.0, 8.0, -1, 49, 0, false, false, false);

    native.setEntityCoordsNoOffset(alt.Player.local.scriptID, pos.x, pos.y, pos.z + 0.01, false, false, false);
    native.freezeEntityPosition(alt.Player.local.scriptID, true);
    native.setEntityRotation(
        alt.Player.local.scriptID,
        0.015785740688443184,
        -0.003576904069632292,
        -162.2259063720703,
        2,
        false
    );

    alt.emitServer('updateAsset');
});

alt.onServer('takeScreenshot', async () => {
    native.setEntityCoordsNoOffset(alt.Player.local.scriptID, pos.x, pos.y, pos.z + 0.05, false, false, false);
    native.freezeEntityPosition(alt.Player.local.scriptID, true);
    native.setEntityRotation(
        alt.Player.local.scriptID,
        0.015785740688443184,
        -0.003576904069632292,
        -162.2259063720703,
        2,
        false
    );

    const result = await alt.takeScreenshot();
    const data = AthenaBuffer.toBuffer(result);
    const totalLength = data.length;

    for (let i = 0; i < totalLength; i++) {
        alt.emitServer('handleScreenshot', data[i], i, totalLength);
    }
});
