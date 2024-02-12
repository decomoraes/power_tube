export default function localStorageEffect(key: string) {
  return ({ setSelf, onSet }: { setSelf: any, onSet: any }) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null && savedValue !== "undefined") {
      setSelf(JSON.parse(savedValue))
    }
    onSet((newValue: any) => {
      localStorage.setItem(key, JSON.stringify(newValue))
    })
  }
}

// const localStorageEffect = (key) => ({ setSelf, onSet }) => {
//   const savedValue = localStorage.getItem(key)
//   if (savedValue != null) {
//     setSelf(JSON.parse(savedValue))
//   }
//   onSet((newValue) => {
//     localStorage.setItem(key, JSON.stringify(newValue))
//   })
// }

// export default localStorageEffect