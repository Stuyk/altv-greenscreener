import { IVector3 } from 'alt-shared';

export interface CameraInfo {
    /**
     * The rotation in which the player should face.
     * This should be a rotation from the client-side.
     *
     * @type {IVector3}
     * @memberof CameraInfo
     */
    rotation: IVector3;

    /**
     * The distance to add or subtract to the zPos for the correct image position.
     *
     * @type {number}
     * @memberof CameraInfo
     */
    zPos: number;

    /**
     * How far to zoom in for the perfect picture. :)
     *
     * @type {number}
     * @memberof CameraInfo
     */
    fov: number;
}
