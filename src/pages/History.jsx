import React, { useContext } from "react";
import { Context } from "../context";

function History({ history }) {
  const { context } = useContext(Context);
  return (
    <div className="container-solo">
      <div className={"card-solo card bg-" + context.theme}>
        <div className="card-body">
          <h5 className="card-title">Tableau de bord</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            (à chaque clic sur + ou -)
          </h6>
          <div className="card-text">
            {history.map((histo, index) => (
              <p className="col" key={index}>
                Mission {index}: {histo} vaisseau(x) ont été énvoyés
              </p>
            ))}
          </div>
          <div href="#" className="card-link">
            Clear
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
