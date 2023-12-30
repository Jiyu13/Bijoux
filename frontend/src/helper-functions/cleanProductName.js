export function cleanProductName(string) {
    return string.split(" ").join("-").toLowerCase()
}