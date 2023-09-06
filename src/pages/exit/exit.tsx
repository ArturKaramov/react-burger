import styles from "./exit.module.css";
import { useNavigate } from "react-router-dom";
import { ProfileNavigation } from "../../components/profile-navigation/profile-navigation";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { logoutUser } from "../../services/actions/user";
import { useDispatch } from "../../services/hooks";
import { BASE_URL } from "../../utils/data";

export const ExitPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const confirmExit = () => {
    dispatch(logoutUser());
    navigate(BASE_URL, { replace: true });
  };
  return (
    <>
      <>
        <main className={styles.main}>
          <ProfileNavigation />
          <div className={`ml-30 ${styles.confirm}`}>
            <h2 className="text text_type_main-large">Вы уверены?</h2>
            <div>
              <Button
                htmlType="button"
                type="primary"
                size="large"
                onClick={confirmExit}
              >
                Выйти
              </Button>
            </div>
          </div>
        </main>
      </>
    </>
  );
};
