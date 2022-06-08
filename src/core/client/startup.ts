import * as alt from 'alt-client';
import * as native from 'natives';
import { AthenaBuffer } from '../shared/athenaBuffer';

alt.onServer('log:Console', handleLogConsole);

native.requestAnimDict('nm@hands');
native.requestAnimDict('mp_character_creation@lineup@male_a');

function handleLogConsole(msg: string) {
    alt.log(msg);
}

native.freezeEntityPosition(alt.Player.local, false);
native.displayRadar(false);

let pos;

alt.on('keyup', async (key: number) => {
    if (key !== 89) {
        return;
    }

    // Leave this alone
    native.setEntityRotation(alt.Player.local, 0, 0, -165, 2, false);

    await alt.Utils.wait(100);

    console.log(native.getEntityHeading(alt.Player.local));
    console.log(JSON.stringify(native.getEntityRotation(alt.Player.local, 2)));

    native.setEntityCoordsNoOffset(
        alt.Player.local,
        alt.Player.local.pos.x,
        alt.Player.local.pos.y,
        alt.Player.local.pos.z + 2,
        false,
        false,
        false
    );

    await alt.Utils.wait(100);

    pos = alt.Player.local.pos;

    const fwd = native.getEntityForwardVector(alt.Player.local);
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
        20,
        true,
        0
    );

    native.pointCamAtCoord(cam, alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z + 0.15);
    native.setCamActive(cam, true);
    native.renderScriptCams(true, false, 0, true, false, 0);

    native.setEntityCoordsNoOffset(alt.Player.local, pos.x, pos.y, pos.z, false, false, false);
    // native.setEntityRotation(alt.Player.local, 0, 0, 20.996076583862305, 2, false);
    native.setEntityRotation(alt.Player.local, 0, 0, -165, 2, false);
    native.freezeEntityPosition(alt.Player.local, true);

    await alt.Utils.wait(200);

    alt.emitServer('updateAsset');
});

alt.onServer('takeScreenshot', async () => {
    native.setEntityCoordsNoOffset(alt.Player.local, pos.x, pos.y, pos.z, false, false, false);
    native.freezeEntityPosition(alt.Player.local, true);
    // native.taskPlayAnim(alt.Player.local, 'nm@hands', 'hands_up', 8.0, 8.0, -1, 18, 1, false, false, true);
    native.setEntityRotation(
        alt.Player.local,
        0,
        0,
        -165,
        2,
        false
        /* It's setting the player's rotation. */
    );

    // const duration = native.getAnimDuration('nm@hands', 'hands_up');
    // await sleep(duration * 10000);

    const result = await alt.takeScreenshot();
    const data = AthenaBuffer.toBuffer(result);
    const totalLength = data.length;

    for (let i = 0; i < totalLength; i++) {
        alt.emitServer('handleScreenshot', data[i], i, totalLength);
    }
});
