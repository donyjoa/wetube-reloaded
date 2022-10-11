let videos = [
  {
    title: "HI",
    rating: 5,
    comments: 2,
    createdAt: "2 min ago",
    views: 1,
    id: 1,
  },
  {
    title: "wow",
    rating: 5,
    comments: 2,
    createdAt: "2 min ago",
    views: 50,
    id: 2,
  },
  {
    title: "good",
    rating: 5,
    comments: 2,
    createdAt: "2 min ago",
    views: 50,
    id: 3,
  },
];

export const trending = (req, res) => {
  res.render("home", { pageTitle: "Home", videos });
};
export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  res.render("watch", { pageTitle: `Watch ${video.title}`, video });
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
