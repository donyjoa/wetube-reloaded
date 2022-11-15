import User from "../models/User";
import bcrypt from "bcrypt";
import session from "express-session";

// join start
//
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "회원가입" });
};
export const postJoin = async (req, res) => {
  {
    const { name, username, email, password, password2, location } = req.body;
    const pageTitle = "회원가입";
    if (password !== password2) {
      return res.render("join", {
        pageTitle,
        errorMessage: "Password confirmation does not match.",
      });
    }
    const userExists = await User.exists({ $or: [{ username }, { email }] });
    // 유저이름, 이메일 중복확인
    if (userExists) {
      return res.status(400).render("join", {
        pageTitle,
        errorMessage: "This username/email is already taken",
      });
    }
    try {
      await User.create({
        name,
        username,
        email,
        password,
        location,
      });
      return res.redirect("/login");
    } catch (error) {
      console.log(error);
      return res.status(400).render("join", {
        pageTitle: "join",
        errorMessage: error._message,
      });
    }
  }
};
//
// join end

export const edit = (req, res) => {
  res.send("edit user");
};
export const remove = (req, res) => {
  res.send("remove user");
};

// login start
//
export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "로그인" });
};
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "로그인";
  const user = await User.findOne({ username });
  // 유저가 존재하지 않음
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "입력한 username을 가진 User가 존재하지 않습니다.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "password가 틀렸습니다.",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  res.redirect("/");
};
//
// login end

export const logout = (req, res) => {
  res.send("logout");
};
export const see = (req, res) => {
  res.send("see");
};
