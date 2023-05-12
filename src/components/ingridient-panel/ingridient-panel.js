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
import { Link, useNavigate } from "react-router-dom";

const IngridientPanel = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const details = useSelector((state) => state.burger.details.length);
  const onClick = () => {
    dispatch({ type: CLEAR_DETAILS });
    navigate("/react-burger");
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
          <li
            key={ingr._id}
            onClick={() => dispatch({ type: SHOW_DETAILS, item: ingr._id })}
          >
            <Link
              to={`/react-burger/ingredients/${ingr._id}`}
              className={styles.link}
            >
              <Ingridient data={ingr} />
            </Link>
          </li>
        ))}
      </ul>
      {details && (
        <Modal closeModal={onClick}>
          <IngridientDetails />
        </Modal>
      )}
    </>
  );
});

IngridientPanel.propTypes = {
  type: ingrTypePropTypes.isRequired,
  data: PropTypes.arrayOf(ingrPropTypes).isRequired,
};

export default IngridientPanel;
