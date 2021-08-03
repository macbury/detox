import React  from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { TUrlProps } from '@detox/shared'
import Link from './Link'

export interface ICinemaModeButtonProps {
  accent: string
  to: TUrlProps
}

export default function CinemaModeButton({ to, accent } : ICinemaModeButtonProps) {
  return (
    <Link
      accent={accent}
      IconKind={MaterialCommunityIcons}
      icon="image-size-select-small"
      to={to} />
  )
}