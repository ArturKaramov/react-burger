import ingridientDetailsStyles from "./ingridient-details.module.css";
import { ingrPropTypes } from "../../utils/prop-types";

function IngridientDetails(props) {
  const nutritionValues = [
    {
      name: 'Калории, ккал',
      value: props.data.calories
    },
    {
      name: 'Белки, г',
      value: props.data.proteins
    },
    {
      name: 'Жиры, г',
      value: props.data.fat
    },
    {
      name: 'Углеводы, г',
      value: props.data.carbohydrates
    }
  ];

  return (
    <>
      <h2 className={`${ingridientDetailsStyles.title} text text_type_main-large ml-10`}>Детали ингридиента</h2>
      <img src={props.data.image_large} alt={props.data.name}/>
      <span className="text text_type_main-medium mt-4">{props.data.name}</span>
      <ul className={`mt-8 ${ingridientDetailsStyles.values}`}>
        {nutritionValues.map((value, i) => 
        <li key={i} className={`mr-5 ${ingridientDetailsStyles.value}`}>
          <span className="text text_type_main-default text_color_inactive pb-2">{value.name}</span>
          <span className="text text_type_digits-default text_color_inactive">{value.value}</span>
        </li>
        )}
      </ul>
    </>
   )
};

IngridientDetails.propTypes = {
  data: ingrPropTypes.isRequired
}

export default IngridientDetails;