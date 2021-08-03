import { useCallback, useState, useEffect } from 'react'

export default function useFilePicker() {
  const [input, setInput] = useState<HTMLInputElement>()

  const openFileDialog = useCallback(() => {
    return new Promise<String | ArrayBuffer>((resolve, reject) => {
      input.onchange = () => {
        const file = input.files[0]
        if (!file) {
          return;
        }

        const reader = new FileReader()

        reader.onload = function(e) {
          const contents = e.target.result
          resolve(contents)
        }

        reader.readAsText(file)
      }
      input?.click()
    })
  }, [input])

  useEffect(() => {
    const fileSelector = document.createElement('input')
    fileSelector.setAttribute('type', 'file')

    setInput(fileSelector)

    return () => {
      fileSelector.remove()
      setInput(null)
    }
  }, [setInput])

  return openFileDialog
}