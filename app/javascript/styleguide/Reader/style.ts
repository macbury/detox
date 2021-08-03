import styled, { createGlobalStyle } from 'styled-components'
import { BookerlyFontUrl } from './Fonts'

export const GlobalReaderStyle = createGlobalStyle`
  @font-face {
    src: url(${BookerlyFontUrl});
    font-family: ArticleFont;
    font-display: fallback;
  }

  :root {
    --entry-font-size: 1.2rem;
    --code-font-size: 1.0rem;
    --entry-line-height: 1.6875rem;

    --entry-max-width: 740px;
  }
`

export const Container = styled.div`
  font-family: ArticleFont, Arial, Helvetica, sans-serif;
  padding: 0px;
  margin: 0px;
  color: ${({ theme }) => theme.colors.articleTextColor};
  background: ${({ theme }) => theme.colors.articleBackground};
  flex: 1;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }

  a:hover {
    opacity: 0.9;
    text-decoration: underline;
  }

  a:active {
    opacity: 0.6;
    text-decoration: underline;
  }
`

export const Title = styled.h1`
  margin-bottom: 0px;
  margin-top: 0px;
`

export const ArticleContent = styled.article`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 15px;
  margin-top: 10px;
  font-family: ArticleFont;
  font-size: var(--entry-font-size);
  line-height: var(--entry-line-height);
  overflow-wrap: break-word;
  word-break: break-word;
  text-align: justify;

  img {
    max-width: 100%;
  }

  .image-preview {
    margin-bottom: 10px;
  }

  figure {
    color: ${({ theme }) => theme.colors.label};
    text-align: center;
  }

  figure img {
    margin: 0 auto;
    display: block;
    width: 100%;
  }

  hr {
    border: 0px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  }

  p {
    margin-top: 0px;
    margin-bottom: 1.5rem;
    line-height: inherit;
    font-size: inherit;
    color: inherit;
  }

  table {
    text-align: left;
    max-width: var(--entry-max-width);
    clear: both;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  td {
    text-align: left;
    font-size: inherit;
    line-height: inherit;
    margin-top: 0px;
    margin-bottom: 0px;
    max-width: var(--entry-max-width);
  }

  & > img:first-child {
    width: 100%;
  }

  b, strong {
    font-weight: bold;
  }

  audio {
    width: 100%;
    display: block;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  ul {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  li {
    text-align: left;
  }

  ol {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  q, blockquote {
    text-align: left;
    font-style: italic;
    display: block;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    margin-left: 1.5rem;

    border-left: 2px solid var(--border-color);
    padding-left: 20px;
  }

  q::before,
  blockquote::before {
    content: "";
  }

  figure {
    margin-left: 0px;
    margin-right: 0px;
  }

  h1 {
    text-align: left;
    font-size: 1.6521739130434783rem;
    font-weight: 700;
    text-rendering: optimizeLegibility;
    line-height: 1.9rem;
    text-transform: none;
    clear: both;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    letter-spacing: -0.04em;
  }

  h2 {
    text-align: left;
    font-size: 1.434782608695652rem;
    font-weight: 700;
    text-rendering: optimizeLegibility;
    line-height: 1.65rem;
    text-transform: none;
    clear: both;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    letter-spacing: -0.04em;
  }

  h3 {
    text-align: left;
    font-size: 1.347826086956522rem;
    font-weight: 700;
    text-rendering: optimizeLegibility;
    line-height: 1.55rem;
    text-transform: none;
    clear: both;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    letter-spacing: -0.04em;
  }

  h4 {
    text-align: left;
    font-size: 1.3043478260869565rem;
    font-weight: 700;
    text-rendering: optimizeLegibility;
    line-height: 1.5rem;
    text-transform: none;
    clear: both;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    letter-spacing: -0.04em;
  }

  pre {
    text-align: left;
    max-width: 100%;
    overflow-x: auto;
  }

  code {
    text-align: left;
    font-size: var(--code-font-size);
  }

  video {
    max-width: 100%;
    background: #000001;
  }
`

export const InnerContainer = styled.main`
  padding: 10px 25px;
  padding-top: 80px;
  padding-bottom: 80px;
  max-width: var(--entry-max-width);
  margin: 0 auto;
`