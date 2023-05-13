import styles from "./ingridient-details.module.css";
import { useEffect, useMemo } from "react";
import { ingrPropTypes } from "../../utils/prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Preloader } from "../preloader/preloader";

function IngridientDetails() {
  const { id } = useParams();
  const { items } = useSelector((state) => state.burger);

  const ingr = useMemo(
    () => items.find((item) => item._id === id),
    [items, id]
  );

  console.log(id, ingr);
  const nutritionValues = [
    {
      name: "Калории, ккал",
      value: "calories",
    },
    {
      name: "Белки, г",
      value: "proteins",
    },
    {
      name: "Жиры, г",
      value: "fat",
    },
    {
      name: "Углеводы, г",
      value: "carbohydrates",
    },
  ];

  return (
    <>
      {" "}
      {ingr ? (
        <>
          <h2 className={`${styles.title} text text_type_main-large ml-10`}>
            Детали ингридиента
          </h2>
          <img src={ingr.image_large} alt={ingr.name} />
          <span className="text text_type_main-medium mt-4">{ingr.name}</span>
          <ul className={`mt-8 ${styles.values}`}>
            {nutritionValues.map((value, i) => (
              <li key={i} className={`mr-5 ${styles.value}`}>
                <span className="text text_type_main-default text_color_inactive pb-2">
                  {value.name}
                </span>
                <span className="text text_type_digits-default text_color_inactive">
                  {ingr[value.value]}
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Preloader />
      )}
    </>
  );
}

export default IngridientDetails;