const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");

const app = express();

app.use(json());

app.use("/", routes);

const port = process.env.PORT || 3000;

let flightList = [
  //create dummy flights
  {
    id: 1,
    title: "flight to canada",
    time: "1pm",
    price: 26000,
    date: "26-06-2022"
  }
];
//Rest api

//targeting all flights
app.route("/flights")
//creating a new flight
.post((req,res) => {
  //create a new flight schedule
  try{
  let newFlight = req.body;
  //save flight
  flightList.push(newFlight);
  //send back a response 
  return res.status(200).json({message: "new flight scheduled"});
  } catch(err){
    res.send(err);
    res.status(500).json("oh no!");
    res.status(404).json("Fill proper parameters");
  }
})
//Fetching flights
.get((req,res) => {
  //fetch flights
  //send response
  try{
    return res.json({flightList});
  } catch(err){
    res.send(err);
    res.status(500).json("oh no!");
    res.status(404).json("Flights not found");
  }
});

//targeting specific flights
app.route("/flights/:id")
//fetch single flight
.get((req,res)=>{
  try{
  let query = req.params.id;
  let foundFlight = flightList.find(flight => {
    return String(flight.id) === query;
  });

  return res.status(200).json({fight : foundFlight});
  } catch(err){
    res.send(err);
    res.status(500).json("oh no!");
    res.status(404).json("Item not found");
  }
})
//update or edit a flight
.patch(async(req,res) => {
  try{
  let index = req.params.id;
  let changes = req.body;
  let objIndex = flightList.findIndex((obj => obj.id == index));
  flightList[objIndex] = changes;
  return res.status(200).json({flightList});
  } catch(err){
    res.send(err);
    res.status(500).json("oh no!");
    res.status(404).json("Unable to edit flight");
  }
})
//delete
.delete((req, res)=>{
  try{
  const query = req.params.id;
  const deleteFlight = flightList.indexOf(query);

  flightList.splice(deleteFlight, 1);
  return res.status(200).json({flightList});
  } catch(err){
    res.send(err);
    res.status(500).json("oh no!");
    res.status(404).json("Item not found");
  }

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
