import User from "../models/User";

// 계정생성
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  {
    const { name, username, email, password, password2, location } = req.body;
    const pageTitle = "Join";
    if (password !== password2) {
      return res.render("join", {
        pageTitle,
        errorMessage: "Password confirmation does not match.",
      });
    }
    const userExists = await User.exists({ $or: [{ username }, { email }] });
    if (userExists) {
      return res.render("join", {
        pageTitle,
        errorMessage: "This username/email is already taken",
      });
    }
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect("/login");
  }
};

export const edit = (req, res) => {
  res.send("edit user");
};
export const remove = (req, res) => {
  res.send("remove user");
};
export const login = (req, res) => {
  res.send("login");
};
export const logout = (req, res) => {
  res.send("logout");
};
export const see = (req, res) => {
  res.send("see");
};
