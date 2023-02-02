const express= require("express")
const bodyParser= require("body-parser")

const app= express()
let items= []
let workItems= []

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))   //static assets like css are accessed by express using this

app.set("view engine", "ejs")  //using EJS for creating templates

app.get("/", function(req,res){
    let today= new Date()

    let options ={
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let day= today.toLocaleDateString("en-US", options)



    //ANother way
    // let day= ""

    // switch (today.getDay()) {
    //     case 0:
    //         day="Sunday"
    //         break;
    //     case 1:
    //         day="Monday"
    //         break;
    //     case 2:
    //         day="Tuesday"
    //         break;
    //     case 3:
    //         day="Wednesday"
    //         break;
    //     case 4:
    //         day="Thursday"
    //         break;
    //     case 5:
    //         day="Friday"
    //         break;
    //     case 6:
    //         day="Saturday"
    //         break;
    
    //     default:
    //         console.log("boy!! wtf is wrong wid u")
    //         break;
    // }

    res.render("list", {listTitle: day, newListItems: items }) //this is part of EJS

})


app.post("/", function(req,res){
    let item= req.body.newItem

    if(req.body.list === "Work"){
        workItems.push(item)
        res.redirect("/work")
    }else{
        items.push(item)
        res.redirect("/")


    }

})

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems})
})

app.post("/work", function(req, res){
    let item= req.body.newItem
    workItems.push(item)

    res.redirect("/work")
})

app.listen("3000", function(){
    console.log("Server is Live at Port 3000")
})