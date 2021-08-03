export type TUrlProps = {
  routeName: string
  web?: { path: string, as?: string, shallow?: boolean }
  native?: {
    screen?: string | undefined;
    navigationBehavior?: "push" | "navigate" | undefined;
    isNativeStack?: boolean | undefined;
  }
  params?: any
}