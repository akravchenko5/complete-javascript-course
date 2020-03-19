/*
const second = () => {
  setTimeout(() => {
    console.log('Async Second');
  }, 2000);
}

const first = () => {
  console.log('Hey there');
  second();
  console.log('End')
}

first();
*/

/*
function getRecipe() {
  setTimeout(() => {
    const recipeID = [523, 838, 196, 421];
    console.log(recipeID);

    setTimeout(id => {
      const recipe = {
        title: 'Fresh tomato pasta',
        publisher: 'John'
      }
      console.log(`${id}: ${recipe.title}`);
      setTimeout(publisher => {
        const recipe2 = {
          title: 'Italian pizza',
          publisher: 'Bob'
        };
        console.log(recipe);
      }, 1500, recipe.publisher);
    }, 1000, recipeID[2]);
  }, 1500);
}

getRecipe();
*/

/**
 * we use resolve and reject call back functions, () - execution functions which takes this two arguments
 * thats because this execution function is used to inform the promise when the event is handling is successful or Not
 * and if it was successful we going to call the 'resolve' function and if it not 'reject' function 
 */
const getIDs = new Promise((resolve, reject) => { 
  setTimeout(() => {
    resolve([523, 838, 196, 421]);
  }, 1000);
});
/**
 * then() method allow us to add an event handler for the case that the promise is fulfilled which means resolved
 * the only thing what we need to, is pass callback function which will handle what we do in case of promise was successful
 * that call back function can take an argument
 */

 const getRecipe = recID => {
   return new Promise((resolve, reject) => {
     setTimeout((ID) => {
       const recipe = {
         title: 'Fresh tomato pasta',
         publisher: 'Jonas'
       }
       resolve(`${ID} ${recipe.title}`);
     }, 1000, recID);
   })
 }


const getRelated = publisher =>{
  return new Promise((resolve, reject) => {
    setTimeout((pub) => {
      const recipe = {
        title: 'Italian pizza',
        publisher: 'Bob'
      };
      resolve(`${pub} ${recipe.title}`);
    }, 1000, publisher);
  })
}

// getIDs
// .then(IDs => { // the IDs will be result of successful promise - [523, 838, 196, 421]
//   console.log(IDs);
//   return getRecipe(IDs[2]); // returns new promise, so we can use another then()
// })
// .then(recipe => {
//   console.log(recipe);
//   return getRelated('Jonas');
// })
// .then(recipe => {
//   console.log(recipe);
// })

// async function getRecipesAW () {
//   const IDs = await getIDs;
//   console.log(IDs);
//   const recipe = await getRecipe(IDs[2]);
//   console.log(recipe);
//   const related = await getRelated('John');
//   console.log(related);
//   return recipe;
// }

// getRecipesAW().then(rec => console.log(rec));



// AJAX - which fetch and Promises
/*
function getWeather(woeid) {
  fetch(`https://www.metaweather.com/api/location/${woeid}/`) // returns Promise
  .then(result => {
    // console.log(result);
    return result.json(); // also returns Promise
  })
  .then(data => {
    // console.log(data);
    const today = data.consolidated_weather[0];
    console.log(`Temperature in ${data.title} stay between ${today.min_temp} and ${today.max_temp}`);
  })
  .catch(error => {
    console.log(error);
  })
};
*/


// AJAX - which fetch and Async/Await
async function getWeather(woeid){
  try {
    const result = await fetch(`https://www.metaweather.com/api/location/${woeid}/`);
    const data = await result.json();
    const tomorrow = data.consolidated_weather[1];
    console.log(`Temperature in ${data.title} stay between ${tomorrow.min_temp} and ${tomorrow.max_temp}`);
    return data;
  } catch (error){
    alert(error);
  };
};

let londonData;
// getWeather(2487956).then(data => console.log(data));
getWeather(44418).then(data => {
  londonData = data;
  console.log(londonData);
});
