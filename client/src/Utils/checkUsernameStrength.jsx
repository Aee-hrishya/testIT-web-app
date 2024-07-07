import { valueFromAST } from "graphql";

const checkUsernameStrength = (username) => {
  if (username.includes("Username is not in proper format"))
    return "Username is not in proper format";
};

export default checkUsernameStrength;
