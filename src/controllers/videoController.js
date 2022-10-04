export const trending = (req, res) => {
  const videos = [
    {
      title: "HI",
      rating: 5,
      comments: 2,
      createdAt: "2 min ago",
      views: 50,
      id: 1,
    },
    {
      title: "wow",
      rating: 5,
      comments: 2,
      createdAt: "2 min ago",
      views: 50,
      id: 1,
    },
    {
      title: "good",
      rating: 5,
      comments: 2,
      createdAt: "2 min ago",
      views: 50,
      id: 1,
    },
  ];
  res.render("home", { pageTitle: "Home", videos });
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
