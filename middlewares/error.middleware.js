//Basicamente o que estamos fazendo aqui é interceptar o erro e
//extraindo mais informações sobre ele, assim saberemos mais rapido,
//o que fazer para resolve-lo.

const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err }; //desconstrutor do "err", que é as informações contidas no erro.

    error.message = err.message; //extraindo a mensagem do erro

    console.error(err); //Isso vai mostrar no console o que esta acontecendo

    //Mongoose bad ObjectId
    if (err.name == 'CastError') {
      const message = 'Resourse not found';
      error = new Error(message);
      error.statusCode = 404;
    }

    //Mongoose duplicate key
    if (err.code == 11000) {
      const message = 'Duplicate field value entered';
      error = new Error(message);
      error.statusCode = 400;
    }

    //Mongoose valudation error
    if (err.name == 'ValidationError') {
      const message = Object.values(err.errors).map(val => val.message);
      error = new Error(message.join(', '));
      error.statusCode = 400;
    }

    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message || 'Server Error' });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
