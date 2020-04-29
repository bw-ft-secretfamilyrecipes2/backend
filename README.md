# backend

RECIPES

login POST
logs user in when valid credentials are provided and responds with a token for client side to save to local storage.
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
expects a user's id and data in the request body, then API updates and responds with the updated recipe.
https://secret-family-recipes-bw.herokuapp.com/api/users/:userId/recipes/:recipeId

remove recipe DELETE
expects a user's id and a recipes' id so that the specified recipe is deleted from the database.
https://secret-family-recipes-bw.herokuapp.com/api/users/:userId/recipes/:recipeId

STEPS

get steps GET
Expects a recipe's id and responds with that recipe's list of steps.
https://secret-family-recipes-bw.herokuapp.com/api/recipes/:recipeId/steps

add step POST
Expects a recipe's id and data in the request body so that the data is inserted into database, then API responds with newly created step.
https://secret-family-recipes-bw.herokuapp.com/api/recipes/:recipeId/steps

get specified step GET
Expects a recipe's id and a step's id and the API responds back with the data for that particular step. 
https://secret-family-recipes-bw.herokuapp.com/api/recipes/:recipeId/steps/:stepId

update step PUT
expects a recipe's id as well as a step's id and data in the request body, then API updates and responds with the updated step.
https://secret-family-recipes-bw.herokuapp.com/api/recipes/:recipeId/steps/:stepId

remove step DELETE
expects a recipe's id and a step's id so that the specified step is deleted from the database.
https://secret-family-recipes-bw.herokuapp.com/api/recipes/:recipeId/steps/:stepId

INGREDIENTS

get ingredients GET
expects a recipe's id so that specified id's ingredients are fetched.
https://secret-family-recipes-bw.herokuapp.com/api/recipes/:recipeId/ingredients

add ingredients POST
expects a recipe's id and ingredient object so that it may be added to the database.
https://secret-family-recipes-bw.herokuapp.com/api/recipes/:recipeId/ingredients

delete ingredients DELETE
expects a recipe's id so that it may be deleted from the database.
https://secret-family-recipes-bw.herokuapp.com/api/recipes/:recipeId/ingredients/:ingredientId




