export const getInitials = (name) => {
    return name.split(' ').length > 1
        ? name.split(' ').slice(0, 2).map(word => word[0]).join('').toUpperCase()
        : name.slice(0, 2).toUpperCase()
}
