import ingridientDetailsStyles from "./ingridient-details.module.css";
import { ingrPropTypes } from "../../utils/prop-types";
import { useSelector, useDispatch } from "react-redux";

function IngridientDetails() {
  const details = useSelector((state) => state.burger.details);
  const nutritionValues = [
    {
      name: "Калории, ккал",
      value: details.calories,
    },
    {
      name: "Белки, г",
      value: details.proteins,
    },
    {
      name: "Жиры, г",
      value: details.fat,
    },
    {
      name: "Углеводы, г",
      value: details.carbohydrates,
    },
  ];

  return (
    <>
      <h2
        className={`${ingridientDetailsStyles.title} text text_type_main-large ml-10`}
      >
        Детали ингридиента
      </h2>
      <img src={details.image_large} alt={details.name} />
      <span className="text text_type_main-medium mt-4">{details.name}</span>
      <ul className={`mt-8 ${ingridientDetailsStyles.values}`}>
        {nutritionValues.map((value, i) => (
          <li key={i} className={`mr-5 ${ingridientDetailsStyles.value}`}>
            <span className="text text_type_main-default text_color_inactive pb-2">
              {value.name}
            </span>
            <span className="text text_type_digits-default text_color_inactive">
              {value.value}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default IngridientDetails;
