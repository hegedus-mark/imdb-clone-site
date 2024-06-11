export const errorMiddleware = (err, res) => {
  return (
    console.log(err),
    res.status(506).json({ message: "Something went wrong", error: err })
  );
};
