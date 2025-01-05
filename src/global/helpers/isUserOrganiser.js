function isUserOrganiser(user){
    return user?.usertype === "organiser"
}

export { isUserOrganiser }