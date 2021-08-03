import { TUrlProps } from "@detox/shared";
export interface ILinkProps {
  to: TUrlProps
  title?: string
  prefetch?: boolean
  children: any
  onPress?()
}
