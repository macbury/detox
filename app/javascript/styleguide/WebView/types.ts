export interface IWebViewProps {
  src?: string
  html?: string
  style?: any

  onScroll?(y: number)
}