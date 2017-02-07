var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var method_override = require("method-override");
var Schema = mongoose.Schema;

var app = express();

mongoose.connect("mongodb://localhost/DB/datos");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer({dest: "./uploads"}));
app.use(method_override("_method"));

//Definir el schema 
var datosSchemaJSON = {
	tipo:String, 
	temperatura : Number ,
	estado: Boolean,
	enchufes: Boolean,
	modo: String,
	sensor1 : Boolean,
	sensor2: Boolean,
	luz1: Number,
	luz2: Number,
	luz3: Number,
};

var datosSchema = new Schema(datosSchemaJSON);

var Datos = mongoose.model("Datos", datosSchema );
app.set("view engine","jade");
app.use(express.static("public"));
app.listen(8080);

app.get("/",function(solicitud,respuesta){
	respuesta.render("index");
});

app.get("/datos",function(solicitud,respuesta){
	respuesta.render("creardatos");
});

console.log("Servidor web iniciado");