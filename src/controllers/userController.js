import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";
import session from "express-session";
import { response } from "express";
import { reset } from "nodemon";

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

////////////
// 일반로그인
////////////
export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "로그인" });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "로그인";
  const user = await User.findOne({ username, socialOnly: false });
  // 유저가 존재하지 않을 때
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "입력한 username을 가진 User가 존재하지 않습니다.",
    });
  }
  // 비밀번호 암호화
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

//////////////////
// 깃허브 로그인
//////////////////
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

//////////////////////
// 깃허브 로그인 완료시
//////////////////////
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
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    // console.log(userData);
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      // 깃허브로 로그인했다는 알람 만들것
      return res.redirect("/login");
    }
    // 데이터베이스에 같은 이메일이 있는지 찾기
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      // 데이터베이스에 없으면 새 유저 생성
      const user = await User.create({
        avatarUrl: userData.avatar_url,
        name: userData.name,
        username: userData.login,
        email: emailObj.email,
        password: "",
        // socialOnly로 비밀번호 없이 소셜 로그인으로만 가능
        socialOnly: true,
        location: userData.location,
      });
    } else {
      // 데이터베이스에 있으면 로그인실행
      req.session.loggedIn = true;
      req.session.user = user;
      return res.redirect("/");
    }
  } else {
    return res.redirect("/login");
  }
};

////////////////
// 로그아웃
////////////////
export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

//////////////
// 프로필수정
//////////////
export const getEdit = (req, res) => {
  return res.render("edit-profile", {
    pageTitle: "Edit Profile",
  });
};

export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { name, email, username, location },
  } = req;
  // const { name, email, username, location } = req.body;
  const updateUser = await User.findByIdAndUpdate(
    _id,
    {
      name,
      email,
      username,
      location,
    },
    { new: true }
  );
  /* 아래 방법도 있다.
  req.session.user = {
    // session안의 내용을 밖으로 꺼내줌
    ...req.session.user,
    name,
    email,
    username,
    location,
  };
  */
  req.session.user = updateUser;
  return res.redirect("/users/edit");
};

export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    return res.redirect("/");
  }
  return res.render("users/change-password", { pageTitle: "Change Password" });
};

export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id, password },
    },
    body: { oldPassword, newPassword, newPasswordConfi },
  } = req;
  // 아래도 가능, user를 찾아서 가장최근의 비밀번호를 사용
  // const user = await User.findById(_id)
  // 밑에 password를 user.password로 바꿀것
  const ok = await bcrypt.compare(oldPassword, password);
  // 기존 비밀번호와 대조
  if (!ok) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "기존 비밀번호가 일치하지 않습니다.",
    });
  }
  // 새로운 비밀번호 확인
  if (newPassword !== newPasswordConfi) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "새로운 비밀번호가 일치하지 않습니다.",
    });
  }
  // 비밀번호 변경
  const user = await User.findById(_id);
  user.password = newPassword;
  console.log("new password", user.password);
  await user.save();
  req.session.user.password = user.password;
  return res.redirect("/users/logout");
};

export const see = (req, res) => {
  res.send("see");
};
