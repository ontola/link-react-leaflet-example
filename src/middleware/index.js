import { logging } from "./logging"
import { mapsMiddleware } from './maps'

export const createMiddleware = () => [
    logging,
    mapsMiddleware,
];
