import * as alt from 'alt-server';
import { PROP_IDS } from './config';

export class Utilities {
    /**
     * Clear all player props.
     *
     * @static
     * @param {alt.Player} player
     * @memberof Utilities
     */
    static clearAllProps(player: alt.Player) {
        for (const propID of Object.values(PROP_IDS)) {
            player.clearProp(propID);
        }

        player.clearBloodDamage();
    }

    /**
     * Sets the player model to a specific blend of invisible components.
     *
     * @param {alt.Player} player
     * @param {boolean} male
     * @return {*}
     * @memberof Utilities
     */
    static setPlayerModel(player: alt.Player, male: boolean) {
        player.setDateTime(1, 1, 2022, 14, 0, 0);
        player.setWeather(2);

        if (male) {
            player.model = 'mp_m_freemode_01';
            player.setHeadBlendData(0, 0, 0, 31, 31, 31, 1, 1, 1);
            player.setClothes(2, 0, 0, 0); // Hair
            player.setClothes(6, 5, 0, 0); // Shoes
            player.setClothes(3, 3, 0, 0); // Torso
            player.setClothes(8, 15, 0, 0); // Undershirt
            player.setClothes(4, 11, 0, 0); // Legs
            player.setClothes(11, 15, 0, 0); // Top
            player.setHairColor(45);
            player.setHairHighlightColor(15);
            return;
        }

        player.model = 'mp_f_freemode_01';
        player.setHeadBlendData(45, 45, 45, 31, 31, 31, 1, 1, 1);
        player.setClothes(2, 0, 0, 0); // Hair
        player.setClothes(6, 5, 0, 0); // Shoes
        player.setClothes(3, 8, 0, 0); // Torso
        player.setClothes(8, 10, 0, 0); // Undershirt
        player.setClothes(4, 13, 0, 0); // Legs
        player.setClothes(11, 82, 0, 0); // Top
        player.setHairColor(45);
        player.setHairHighlightColor(15);
    }
}
