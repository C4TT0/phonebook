import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

morgan.token("data", (req, res) => JSON.stringify(req.body));

app.use(
  morgan((tokens, req, res) => {
    if (req.method === "POST") {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms ",
        tokens.data(req, res),
      ].join("");
    } else {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
      ].join(" ");
    }
  }),
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(`
<p>Phonebook has info for ${persons.length} people</p>
${Date()}
`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).send(persons);
});

app.post("/api/persons", (req, res) => {
  const id = Math.floor(Math.random() * 9999) + 4;
  const name = req.body.name;
  const number = req.body.number;

  if (!name || !number) {
    return res.status(400).json({
      error: "name or number missing",
    });
  }

  const person = {
    id: id,
    name: name,
    number: number,
  };

  persons = persons.concat(person);

  res.send("Sucessfully Added");
});

const unkownEndpoint = (req, res) => {
  res.status(404).send({ error: "Unkown Endpoint" });
};

app.use(unkownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serving on ${PORT}`);
});
