/* eslint-disable react/no-unescaped-entities */
import "./style.scss";

export const Rating = () => {
  return (
    <div className="rating-container">
      <button>Actually bad</button>
      <button>So bad it's good</button>
      <button>Meh, not worth it</button>
      <button>Worth a watch</button>
      <button>It's actually great</button>
    </div>
  );
};
