import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    id : {
        type: Number,
        required : true
    },
    title : {
        type : String,
        required: true
    },
    price : {
        type : String,
        required : true
    },
    description : {
        type : String,
    },
    category : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    sold : {
        type : Boolean,
        required : true
    },
    dateOfSale : {
        type : Date,
        required : true
    }
})

const Transaction = mongoose.model("Transaction", transactionSchema) 
export default Transaction

// "id": 1,
// "title": "Fjallraven  Foldsack No 1 Backpack Fits 15 Laptops",
// "price": 329.85,
// "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop up to 15 inches in the padded sleeve your everyday",
// "category": "men's clothing",
// "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
// "sold": false,
// "dateOfSale": "2021-11-27T20:29:54+05:30"