let users =[
  {id: 1 , name: 'ET Doe'},
  {id: 2 , name: 'DR Ioe'},
  {id: 3 , name: 'RE Smith'},
  {id: 4 , name: 'Tow Nick'},
];

/**
 * @description: This function is used to get all the users
 * @route GET /api/v1/users
 */

const getUsers = (req, res) => {
  const limit = req.query.limit;
  if (limit === undefined || isNaN(limit) || parseInt(limit) <= 0) {
    res.status(200).json(users);
  } else {
    const filteredUsers = users.slice(0, parseInt(limit));
    res.json(filteredUsers);
  }
};

/**
 * @description: This function is used to get a single user
 * @route GET /api/v1/users/:id
 */

const getUserById = (req, res, next) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    const error = new Error(`User id ${id} not found`);
    error.status = 404;
    return next(error);
  }

  res.status(200).json(user);
};

/**
 * @description: This function is used to create a user
 * @route POST /api/v1/users
 */

const createUser = (req, res, next) => {
  const newPost = {
    id: users.length + 1,
    name: req.body.name,
  };

  if (!newPost.name) {
    const error = new Error("Please include name");
    error.status = 400;
    return next(error);
  }

  users.push(newPost);
  res.json(users);
};

/**
 * @description: This function is used to update a user
 * @route PUT /api/v1/users/:id
 */

const updateUser = (req, res, next) => {
  const id = parseInt(req.params.id);
  const newUser = users.find((user) => user.id === id);

  if (!newUser) {
    const error = new Error(`User id ${id} not found`);
    error.status = 404;
    return next(error);
  }

  newUser.name = req.body.name;
  res.status(200).json(users);
};

/**
 * @description: This function is used to delete a user
 * @route DELETE /api/v1/users/:id
 */

const deleteUser = (req, res, next) => {
  const id = parseInt(req.params.id);
  const updateName = users.find((user) => user.id === id);

  if (!updateName) {
    const error = new Error(`User id ${id} not found`);
    error.status = 404;
    return next(error);
  }

  users = users.filter((user) => user.id !== id);
  res.status(200).json(users);
};

export { getUsers , getUserById , createUser , updateUser , deleteUser };