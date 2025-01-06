export function generateUuid(length: number) {
    const firstCut = Math.floor(2 + length / 2);
    const secondCut = Math.ceil(5 + length / 2);
    return Math.random().toString(36).substring(2, firstCut) + Math.random().toString(36).substring(5, secondCut);
}
