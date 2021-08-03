import React from 'react'

const RobotoFont = require('../assets/fonts/Roboto-Regular.ttf')

export const RobotoFontUrl = RobotoFont.default || RobotoFont

const style = `
  @font-face {
    src: url(${RobotoFontUrl});
    font-family: Roboto-Regular;
    font-display: fallback;
  }

  body {
    font: 14px Roboto-Regular, Helvetica, Arial, sans-serif;
  }

  input, textarea {
    user-select: text;
  }

  textarea:focus, input:focus{
    outline: none;
  }

  img, a {
    user-select: none;
    -webkit-user-select: none;
    /* Safari 3.1+ */ -moz-user-select: none;
    /* Firefox 2+ */ -ms-user-select: none;
    /* IE 10+ */ user-select: none;
    /* Standard syntax */ user-drag: none;
    -webkit-user-drag: none;
  }

  a, a:hover, a:active {
    text-decoration: none;
  }

  svg *, .react-pdf__Page__textContent * {
    user-select: text;
  }
`

export function BaseStyle(props : any) {
  return <style dangerouslySetInnerHTML={{ __html: style }} />
} 