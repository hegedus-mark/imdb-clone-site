import { MovieCard } from "../MovieCard/MovieCard";
import "./style.scss";
import Slider from "react-slick";
import { Arrow } from "../../assets/arrow.jsx";

export function Carousel({ items, category }) {
  const settings = {
    draggable: false,
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="movie-carousel">
      <h1 className="category-name">{category.toUpperCase()}</h1>
      <Slider {...settings}>
        {items.map((movie) => (
          <div className="cards" key={movie.id}>
            <MovieCard detailedMovieData={movie} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="arrow-container next" onClick={onClick}>
      <Arrow className="arrow" />
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="arrow-container prev" onClick={onClick}>
      <Arrow className="arrow" />
    </div>
  );
};
