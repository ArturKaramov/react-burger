import React from "react";
import Ingridient from "../ingridient/ingridient";
import ingridientPanelStyle from "./ingridient-panel.module.css";
import { ingrTypePropTypes } from "../../utils/prop-types";
import Modal from "../modal/modal";
import IngridientDetails from "../ingridient-details/ingridient-details";
import PropTypes from "prop-types";
import { ingrPropTypes } from "../../utils/prop-types";
import { useDispatch, useSelector } from "react-redux";
import { SHOW_DETAILS } from "../../services/actions";

const IngridientPanel = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.burger.details);
  return (
    <>
      <h2
        key={props.type.value}
        ref={ref}
        className="text text_type_main-medium pb-6 pt-2"
      >
        {props.type.name}
      </h2>
      <ul className={`${ingridientPanelStyle.ingridientList} pb-10`}>
        {props.data.map((ingr) => (
          <li
            key={ingr._id}
            onClick={() => dispatch({ type: SHOW_DETAILS, item: ingr })}
          >
            <Ingridient data={ingr} />
          </li>
        ))}
      </ul>
      {details.name && (
        <Modal>
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
