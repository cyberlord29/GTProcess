const express = require('express');
const axios = require('axios');;
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser')
app.use(bodyParser())

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

  const getAvatar = async (url) => {
    try {
      return await axios({
        method:'get',
        url:url,
        headers:{'Content-Type': 'image/png' }
      })
    } catch (error) {
      console.error(error)
    }
  }


app.get('/users-latest', async function (req, res) {
    let response = await getLatestUsers()
    res.send({ userList : response.data });
});

app.post('/user-avatar', async function (req, res) {
    let response = await getAvatar(req.body.url)
    res.send({ response: response.data });
});