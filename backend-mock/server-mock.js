const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./backend-mock/customer-db.json');
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);


let maxId = (function getMax(data) {
  let maxId = 0;
  for(let customer of data) {
    if (customer.id > maxId) {
      maxId = customer.id;
    }
  }

  return maxId;
})(require('./customer-db.json')['customers-api']);

server.post('/customers-api', (req, res, next) => {
  req.body.id = ++maxId;
  next();
});



server.use(router);



server.listen(3000, () => {
  console.log('JSON Server is running')
})
