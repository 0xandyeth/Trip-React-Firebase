const helpers = {
  getFullName: function (authUser) {
    return authUser.firstName + " " + authUser.lastName
  },
  getInitials: function (authUser) {
    return authUser.firstName[0] + authUser.lastName[0]
  }
}

export default helpers;
