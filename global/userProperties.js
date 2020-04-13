//TODO Firebase Auth, Set Values
var userProperties = {
  userID: "",
  accessToken: "",
  name: "",
};

const setUser = (user) => {
  userProperties = user;
  console.log(userProperties);
};

export { userProperties, setUser };
