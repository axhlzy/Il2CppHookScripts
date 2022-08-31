const B_Text = (): void => {

}

export { B_Text }
declare global {
    var B_Text: () => void
}

globalThis.B_Text = B_Text