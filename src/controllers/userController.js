import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";
import session from "express-session";

// 회원가입
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

// 깃허브 로그인
export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

// 깃허브 로그인 완료시
export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  // const json = await data.json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const userRequest = await (
      await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    console.log(userRequest);
  } else {
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  res.send("logout");
};
export const see = (req, res) => {
  res.send("see");
};
