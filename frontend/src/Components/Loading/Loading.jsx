import "./style.scss";

export const Loading = () => {
  return (
    <div className="loading">
      {[...Array(5)].map((_, i) => (
        <img
          key={i}
          style={{ animationDelay: `${i * 0.2}s` }}
          className="teeth-loading"
          src="/images/teeth.png"
        ></img>
      ))}
      <h1>Brushing Up Some Data...</h1>
    </div>
  );
};
