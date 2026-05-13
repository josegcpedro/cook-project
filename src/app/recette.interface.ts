// contains the recipe interface
export interface Recette {
  id: number;
  title: string;
  description: string;
  histoire: string;
  preparation_time: string;
  cooking_time: string;
  ingredients: string[];
  preparation: string[];
  portion: string;
  dish_type: string;
  cuisine_type: string;
  cooking_method: string;
  region: string;
  flavor: string;
  difficulty: string;
  image: string;
}
