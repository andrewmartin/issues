import axios from 'axios';

class Fetch {
  constructor() {
    this.api = axios.create({
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });
    this.api.defaults.baseURL = process.env.REACT_APP_API_ROOT;
  }
}

export default new Fetch();
