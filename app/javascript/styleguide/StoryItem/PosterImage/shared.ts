import { useDebugValue, useMemo } from "react";
import { Poster } from "@detox/store/models/Poster";

export type TDimension = {
  width: number
  height: number
}

export interface IPosterProps {
  /**
   * Max of image
   */
  width: number;
  poster?: Poster;
  disableCompact?: boolean
}

export type TSizeStruct = {
  width: number
  height: number
  scale: number
  compact: boolean
}

export function useSize(dimension : TDimension, containerWidth : number, disableCompact: boolean) {
  const haveDimension = !!dimension

  const size : TSizeStruct = useMemo(() => {
    if (haveDimension) {
      const scale = containerWidth / dimension.width
      const compact = dimension.width < containerWidth && !disableCompact

      if (compact) {
        return {
          scale: 1,
          width: dimension.width,
          height: dimension.height,
          compact
        }
      } else {
        return {
          scale,
          width: containerWidth,
          height: Math.round(dimension.height * scale),
          compact
        }
      }
    } else {
      return {
        scale: 1,
        width: containerWidth,
        height: 0,
        compact: false
      }
    }
  }, [haveDimension, dimension?.width, dimension?.height, containerWidth])
  
  useDebugValue(size)

  return size
}