const express = require('express');
const axios = require('axios');;
const app = express();
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

const githubLatestUsers100 = 'https://api.github.com/search/users?q=created:>=2019-01-17&order:asc&sort=joined&per_page=100'
const username = 'maneesh1996@gmail.com'
const password = 'maneesh123'

const getLatestUsers = async () => {
    try {
      return await axios({
        method:'get',
        url:githubLatestUsers100,
        headers:{'Host': 'api.github.com', 
        'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64') 
      }
      })
    } catch (error) {
      console.error(error)
    }
  }

app.get('/users-latest', async function (req, res) {
    let response = await getLatestUsers()
    console.log(response.status)
    res.send({ userList : response.data });

});