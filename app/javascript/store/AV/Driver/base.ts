import { Media } from "../Media";

/**
 * Base interface for implementing Native Android playback and Web Playback
 */
export interface Driver {
  clearCurrentMedia() : Promise<void>
  setCurrentMedia(media : Media) : Promise<void>
}