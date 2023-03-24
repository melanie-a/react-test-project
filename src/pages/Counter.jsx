import React, { useContext } from "react";
import { Context } from "../context";

function Counter({ counter, histoCounter }) {
  const { context } = useContext(Context);

  return (
    <div className="container-solo">
      <div className={"card-solo card-counter card bg-" + context.theme}>
        <div className="card-body">
          <h5 className="card-title">Envoyer ou rappeler des vaisseaux</h5>
          <p className="card-text">
            Vous avez envoyé un nombre {counter % 2 ? "impair" : "pair"} de
            vaisseaux.
          </p>

          <div>
            <button
              className="btn btn-outline-danger plusmoins"
              onClick={() => histoCounter(counter - 1)}
            >
              -
            </button>
            {counter}
            <button
              className="btn btn-outline-success plusmoins"
              onClick={() => histoCounter(counter + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Counter;
