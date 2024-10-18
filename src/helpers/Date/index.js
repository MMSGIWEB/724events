export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};

// ancien : export const getMonth = (date) => MONTHS[date.getMonth()];
// Ajout +1 pour passer au mois suivant le [0] car tableau commence à [0]
// => on commencera par le "1" -- janvier sera 'trouvé'
export const getMonth = (date) => MONTHS[date.getMonth() + 1];
