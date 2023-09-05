export const isActive = (members: string[], email: string): string => {
    return members.indexOf(email) !== -1 ? "Active" : "Offline";
}