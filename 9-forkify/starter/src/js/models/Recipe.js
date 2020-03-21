import axios from 'axios';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {

      const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
      const recipe = res.data.recipe;
      this.title = recipe.title;
      this.author = recipe.publisher;
      this.image = recipe.image_url;
      this.url = recipe.source_url;
      this.ingredients = recipe.ingredients;
      // console.log(res);
    } catch(error) {
      console.log(error);
      alert('Something went wrong :(')
    }
  }

  calcTime() {
    // assuming that we need 15 minutes for each 3 ingredients
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServing() {
    this.servings = 4;
  }

  parseIngredients () {
    const unitsLong = ['tablespoons', 'tablespoon', 'ounce', 'ounces', 'teaspoon', 'teaspoons', 'cups', 'pounds']
    const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound']
    const newIngredients = this.ingredients.map(el => {
      // 1. Uniform units
      let ingredient = el.toLowerCase();
      console.log(ingredient);
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitShort[i]);
      });

      // 2. Remove parenthesis
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // 3. Parse ingredients into count, unit and ingredients
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex(el2 => unitShort.includes(el2)); // .includes() true if the el2 in array and false if not, finally findIndex returns index

      let objIng;
      if (unitIndex > -1){
        // There is a unit
        // Exp. 4 1/2 cups -> arrCount = ['4', '1/2']
        // Exp. 4 cups -> arrCount = ['4']
        const arrCount = arrIng.slice(0, unitIndex);
        let count;
        if (arrCount === 1){
          count = eval(arrIng[0].join('+'));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join('+')); // eval(), evaluates string as a JS code
        };

        objIng = {
          count, // again, as we have same variable it will be assigned automatically
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' ')
        };

      } else if (parseInt(arrIng[0], 10)){ 
        // There is NO unit, but first element is number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')
        }

      } else if (unitIndex === -1){
        // There is NO unit and NO number in first element
        objIng = {
          count: 1,
          unit: '',
          ingredient // ES6 when we have Object with same name, it will automatically create property ingredient and assign value to it
        }
      }

      return objIng;
    })
    this.ingredients = newIngredients;
  }
}