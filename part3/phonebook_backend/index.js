const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const { MONGODB_URI: url } = process.env;

if (!url) {
  console.log("Missing MONGODB_URI in .env");
  process.exit(1);
}

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).json({ error: "malformatted id" });
  }

  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  return next(error);
};

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    required: true,
  },
  number: {
    type: String,
    minlength: [8, "Phone number must be at least 8 characters long"],
    required: true,
    validate: {
      validator: (value) => /^\d{2,3}-\d+$/.test(value),
      message:
        "Phone number format is invalid. Use NN-NNNNN... or NNN-NNNNN...",
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

app.use(express.json());
app.use(requestLogger);
app.use(morgan("tiny"));
app.use(express.static("dist"));

app.get("/", (request, response) => {
  response.send("<h1>see /api/persons</h1>");
});

app.get("/api/persons", async (request, response, next) => {
  try {
    const persons = await Person.find({});
    response.json(persons);
  } catch (error) {
    next(error);
  }
});

app.get("/info", async (request, response, next) => {
  try {
    const numberOfPersons = await Person.countDocuments({});
    const date = new Date();
    response.send(`
    <div>Phonebook has info for ${numberOfPersons} people</div>
    <div>${date}</div>`);
  } catch (error) {
    next(error);
  }
});

app.get("/api/persons/:id", async (request, response, next) => {
  try {
    const person = await Person.findById(request.params.id);

    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

app.delete("/api/persons/:id", async (request, response, next) => {
  try {
    await Person.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.put("/api/persons/:id", async (request, response, next) => {
  try {
    const { name, number } = request.body;

    const updatedPerson = await Person.findByIdAndUpdate(
      request.params.id,
      { name, number },
      { new: true, runValidators: true, context: "query" },
    );

    if (updatedPerson) {
      return response.json(updatedPerson);
    }

    return response.status(404).end();
  } catch (error) {
    return next(error);
  }
});

app.post("/api/persons", async (request, response, next) => {
  try {
    const body = request.body;

    const existingPerson = await Person.findOne({ name: body.name });
    if (existingPerson) {
      return response.status(400).json({ error: "name must be unique" });
    }

    const person = new Person({
      name: body.name,
      number: body.number,
    });

    const savedPerson = await person.save();
    return response.status(201).json(savedPerson);
  } catch (error) {
    return next(error);
  }
});

morgan.token("data", (req, res) => JSON.stringify(req.body));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data"),
);

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
