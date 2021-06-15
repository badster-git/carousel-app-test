import { Carousel } from "3d-react-carousal";
import { useReducer } from "react";

import { SLIDES_DATA } from "./data/SLIDES_DATA";
import { Slide } from "./components/Slide";
import "./App.css";

const initialState = {
  slideIndex: 0,
};

const slidesReducer = (state, event) => {
  let slides = SLIDES_DATA;
  if (event.type === "NEXT") {
    return {
      ...state,
      slideIndex: (state.slideIndex + 1) % slides.length,
    };
  }
  if (event.type === "PREV") {
    return {
      ...state,
      slideIndex:
        state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1,
    };
  }
};

function App() {
  const [state, dispatch] = useReducer(slidesReducer, initialState);
  let slides = SLIDES_DATA;
  let slidesFirst = [
    <img src="https://picsum.photos/800/300/?random" alt="1" />,
    <img src="https://picsum.photos/800/301/?random" alt="2" />,
    <img src="https://picsum.photos/800/302/?random" alt="3" />,
    <img src="https://picsum.photos/800/303/?random" alt="4" />,
    <img src="https://picsum.photos/800/304/?random" alt="5" />,
  ];

  return (
    <div className="App">
      <Carousel
        slides={slidesFirst}
        autoplay={true}
        interval={10000}
        arrows={false}
        arrowBorders={false}
      />
      <br />
      <div className="slides">
        <button onClick={() => dispatch({ type: "PREV" })}>‹</button>

        {[...slides, ...slides, ...slides].map((slide, i) => {
          let offset = slides.length + (state.slideIndex - i);
          return <Slide slide={slide} offset={offset} key={i} />;
        })}
        <button onClick={() => dispatch({ type: "NEXT" })}>›</button>
      </div>
    </div>
  );
}

export default App;
