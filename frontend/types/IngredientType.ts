interface IngredientType {
  id: string,
  name: string,
  measurementType: 'discrete_cnt' | 'volume_mL' | 'weight_g',
}


export default IngredientType;