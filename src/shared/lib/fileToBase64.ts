export const fileToBase64 = async (file: Blob): Promise<string> => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result?.toString() || '')
    }
  })
}
