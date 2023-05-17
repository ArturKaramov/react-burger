import React from "react";
import Ingridient from "../ingridient/ingridient";
import styles from "./ingridient-panel.module.css";
import { ingrTypePropTypes } from "../../utils/prop-types";
import Modal from "../modal/modal";
import IngridientDetails from "../ingridient-details/ingridient-details";
import PropTypes from "prop-types";
import { ingrPropTypes } from "../../utils/prop-types";
import { useDispatch, useSelector } from "react-redux";
import { SHOW_DETAILS, CLEAR_DETAILS } from "../../services/actions/burger";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { baseUrl, ingredientUrl } from "../../utils/data";

const IngridientPanel = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  const location = useLocation();
  const onClickIngr = (id) => {
    navigate(ingredientUrl + "/" + id, {
      replace: true,
      state: { background: location.pathname },
    });
  };
  return (
    <>
      <h2
        key={props.type.value}
        ref={ref}
        className="text text_type_main-medium pb-6 pt-2"
      >
        {props.type.name}
      </h2>
      <ul className={`${styles.ingridientList} pb-10`}>
        {props.data.map((ingr) => (
          <li key={ingr._id} onClick={() => onClickIngr(ingr._id)}>
            <Ingridient data={ingr} />
          </li>
        ))}
      </ul>
    </>
  );
});

IngridientPanel.propTypes = {
  type: ingrTypePropTypes.isRequired,
  data: PropTypes.arrayOf(ingrPropTypes).isRequired,
};

export default IngridientPanel;
