import styles from "./ingredient-details.module.css";
import { useMemo } from "react";
import { useSelector } from "../../services/hooks";
import { useParams, useLocation } from "react-router-dom";
import { Preloader } from "../preloader/preloader";

function IngredientDetails() {
  const { id } = useParams();
  const { items } = useSelector((state) => state.burger);
  const location = useLocation();

  const ingr = useMemo(
    () => items.find((item) => item._id === id),
    [items, id]
  );
  const nutritionValues: ReadonlyArray<{ [key: string]: string }> = [
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
      {ingr ? (
        <>
          <h2
            className={`${
              location.state && styles.titleModal
            } text text_type_main-large`}
          >
            Детали ингридиента
          </h2>
          <img src={ingr.image_large} alt={ingr.name} />
          <span className="text text_type_main-medium mt-4">{ingr.name}</span>
          <ul className={`mt-8 ${styles.values}`}>
            {nutritionValues.map((item, i) => (
              <li key={i} className={`mr-5 ${styles.item}`}>
                <span className="text text_type_main-default text_color_inactive pb-2">
                  {item.name}
                </span>
                <span className="text text_type_digits-default text_color_inactive">
                  {ingr[item.value]}
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

export default IngredientDetails;
