export const trending = (req, res) => {
  res.send("trending");
};
export const see = (req, res) => {
  console.log(req.params);
  return res.send(`watch video ${req.params.id}`);
};
export const edit = (req, res) => {
  console.log(req.params);
  res.send(`eidt video ${req.params.id}`);
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
