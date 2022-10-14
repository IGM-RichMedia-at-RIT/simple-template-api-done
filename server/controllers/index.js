/* As we get closer to talking about databases and true models, we will use a
  json file to "mock" a large dataset. Here we import the filesystem library,
  then use it to read in the data/movies.json file. We then parse that json into
  an array stored in movies.
*/
const fs = require('fs');
const movies = JSON.parse(fs.readFileSync(`${__dirname}/../../data/movies.json`));

/* This function simply renders out the index.handlebars page for the user.
*/
const hostIndex = (req, res) => {
  res.render('index');
};

/* The form in index.handlebars makes a get request to /results, which routes to
  this function. The form potentially provides a movie title, release year, and
  a starring member of the cast.
*/
const hostResults = (req, res) => {
  // Start by creating a reference to the movies array.
  let results = movies;

  /* If the user has provided a title through the form, we will set it to lower
    case, and then filter the array so that we only have movies with that title.

    The filter function will essentially loop over every single element in the
    array. For each element, we will call it "movie" and test it against the
    predicate (the boolean check after the =>). If the predicate returns true,
    that movie will be added to our filtered array. If it returns false, it will
    not be added to the resulting array.
  */
  if(req.query.title) {
    const lowerTitle = req.query.title.toLowerCase();
    results = results.filter(movie => movie.title.toLowerCase().includes(lowerTitle));
  }

  /* We do essentially the same filtering with the year and starring query params.
    Note that we continue doing the operations on the same results object, so our
    results are getting narrowed per search parameter.
  */
  if(req.query.year) {
    const year = parseInt(req.query.year, 10); 
    results = results.filter(movie => movie.year === year);
  }

  if(req.query.starring) {
    results = results.filter(movie => movie.cast.includes(req.query.starring));
  }

  /* Finally, we will render the results.handlebars by passing it the search query,
    as well as our resulting object. Note that if no filtering was done, it will
    return every movie.
  */
  return res.render('results', {
    search: req.query,
    movies: results
  });
};

/* This function simply returns raw data for testing purposes. It also shows a
  basic example of how we might filter the data.
*/
const getData = (req, res) => {
  //res.json(movies);
  res.json(movies.filter(x => x.title.toLowerCase() === 'gone with the wind'));
};

// Not found page renderer
const notFound = (req, res) => {
  res.status(404).render('notFound', {
    page: req.url,
  });
};

module.exports = {
  index: hostIndex,
  results: hostResults,
  notFound,
  getData,
};
