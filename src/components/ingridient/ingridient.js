import React from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingridientStyles from "./ingridient.module.css";
import { ingrPropTypes } from "../../utils/prop-types";

function Ingridient(props) {
  {
    /*const count = React.useMemo(
    () =>
      burgerData.map((ingr) => ingr._id).filter((id) => id === props.data._id)
        .length,
    [props.data._id]
  );*/
  }
  const count = 1;

  return (
    <div className={`mb-8 ml-4 mr-2 ${ingridientStyles.ingridient}`}>
      <img className="ml-4 mr-4" src={props.data.image} alt={props.data.name} />
      {Boolean(count) && (
        <Counter count={count} size="default" extraClass="m-1" />
      )}
      <div className={`${ingridientStyles.price} mt-2 mb-2`}>
        <p className="pr-2 text text_type_digits-default">{props.data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{props.data.name}</p>
    </div>
  );
}

Ingridient.propTypes = {
  data: ingrPropTypes.isRequired,
};

export default Ingridient;
