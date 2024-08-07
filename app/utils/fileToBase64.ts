export default (file: File): Promise<string> => {
  return new Promise((res, rej) => {
    const reader = new FileReader()
    reader.onload = e => res(e.target!.result! as string)
    reader.onerror = e => rej(e)
    reader.readAsDataURL(file)
  })
}
