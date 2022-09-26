const fakeUser = {
  username: "Ho",
  loggedIn: false,
};

export const trending = (req, res) => {
  res.render("home", { pageTitle: "Home", fakeUser });
};
export const see = (req, res) => {
  res.render("watch");
};
export const edit = (req, res) => {
  res.render("edit");
};
export const search = (req, res) => {
  res.send("search");
};
export const upload = (req, res) => {
  res.send("upload");
};
export const deleteVideo = (req, res) => {
  console.log(req.params);
  res.send(`delteVideo ${req.params.id}`);
};
