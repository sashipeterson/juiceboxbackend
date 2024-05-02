// postsRouter.delete('/:postId', requireUser, async (req, res, next) => {
//   const { postId } = req.params;

//   try {
//     // Implement post deletion logic here
//     res.send({ message: 'Post deleted successfully' });
//   } catch (error) {
//     next(error);
//   }
// });

function requireUser(req, res, next) {

  // console.log(req);

  if (!req.user) {
    return res.status(401).json({ error: "unauthorized" });
  }
  next();
}

module.exports = {
  requireUser
}