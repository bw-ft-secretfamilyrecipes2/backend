# backend

login POST
logs user in when valid credentials are provided and responds with a token for clien side to save to local storage.
https://secret-family-recipes-bw.herokuapp.com/api/auth/login

register POST
registers a user when expected credential data is sent.
https://secret-family-recipes-bw.herokuapp.com/api/auth/register

get recipes GET
Expects a user's id and responds with that user's list of recipes.
https://secret-family-recipes-bw.herokuapp.com/api/users/:userId/recipes

get specified recipe GET
Expects a user's id and a recipes' id and the API responds back with the data for that particular recipe. 
https://secret-family-recipes-bw.herokuapp.com/api/users/:userId/recipes/:recipeId

add recipe POST
Expects a user's id and data in the request body so that the data is inserted into database, then API responds with newly created recipe.
https://secret-family-recipes-bw.herokuapp.com/api/users/:userId/recipes

update recipe PUT
expects a user's id and data in the request body, then API udates and responds with the updated recipe.
https://secret-family-recipes-bw.herokuapp.com/api/users/:userId/recipes/:recipeId

remove recipe DELETE
expects a user's id and a recipes' id so that the specified recipe is deleted from the database.
https://secret-family-recipes-bw.herokuapp.com/api/users/:userId/recipes/:recipeId