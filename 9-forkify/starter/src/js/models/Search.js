import axios from 'axios';

export default class Search {
  constructor(query){
    this.query = query;
  }

  async getResult(){
    try {
      const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
      this.result = res.data.recipes; // stores result to the class, (encapsulated)
      // console.log(this.result);
    } catch(error){
      console.log(error);
    }
  }
}