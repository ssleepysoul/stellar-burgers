import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { getIngredientById } from '../../services/ingredients-slice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, RootState } from '../../services/store';

export const IngredientDetails: FC = () => {
  const ingredientData = useSelector(
    (state: RootState) => state.ingredients.ingredientData
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getIngredientById(id));
    }
  }, []);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
