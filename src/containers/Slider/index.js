import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    // ancien code : new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
    // chgt à + grand que; v renvoyée echangées selon résultat
    // du + ancien au plus récent
    new Date(evtA.date) > new Date(evtB.date) ? 1 : -1
  );
  // ajout de const avec la longueur du tb (inspiré de la méthode ligne 10)
  // une fois arrivé au last slide et repasse à la première sans avoir de slide vide/blanc
  const dataLength = data?.focus.length
  const nextCard = () => {
    setTimeout(
      // ancien () => setIndex(index < byDateDesc.length ? index + 1 : 0),
      // Ajout de -1 après "length" => limite la longueur du useState (0,1,2)
      () => setIndex(index < dataLength - 1 ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // ancien : <>
        <div
          key={event.title}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
            }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))} {/* fermeture du 1er map en y excluant le second map + supp des <>, </> car nous avons déjà une balise parent '<div key...>' */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {/* ajout de l'opérateur '?' pour itérer sur les éléments de la const */}
          {byDateDesc?.map((_, radioIdx) => (
            <input
              // ajout de '_' pour correspondre au 1er param
              // ancien : key={`${event.id}`} -- les bullets n'ont pas de 'id' donc on fait selon le titre
              // => la pp 'title' appliquée ici pour correspondre à celle dans la key (L.35) de l'img affichée
              key={`${_.title}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              // checked={idx === radioIdx} correction idx => index q correspond celui de useState(0)
              // => indique sur quelle img on se trouver
              readOnly
            // "console error : Warning: You provided a `checked` prop to a form field without an `onChange` handler."
            // Cela affichera un champ en lecture seule. Si le champ doit être modifiable, utiliser defaultChecked. Sinon, utiliser onChange ou readOnly.
            />
          ))}
        </div>
      </div>
      {/* ancien : </> */}
      {/* ancien : ))} */}
    </div>
  );
};

export default Slider;
