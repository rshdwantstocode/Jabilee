import express from 'express';
import ejs from 'ejs';
import axios from 'axios';
import bodyParser from 'body-parser';
// import { product } from './data/product.js';

const app = express();
const port = 3000;
const jabeeURL = "https://api-jollibee-menu.vercel.app/menu";

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.render('index.ejs');
});

app.get("/About", (req,res)=>{
    res.send("Jabilee is mmade just for fun");
});

app.get("/Menu", async (req,res)=>{
    try {
        const result = await axios.get(jabeeURL);
        const product = result.data;
        res.render("./menu-folder/menu.ejs", {
            products: product
        });
    } catch (error) {
        console.log(error);
    }
});


app.post("/MenuList",  async (req, res) => {

    let productTitle = req.body.titleMenu;
    let itemCategory = req.body.itemChoice;
    try {
        const productData = await axios.get(`${jabeeURL}`);
        const sidebarNames = productData.data; 

        const result  =  await axios.get(`${jabeeURL}/${itemCategory}`);
        const product = result.data;

        res.render("./menu-folder/menuList.ejs", {
            products: sidebarNames,
            productItems: product,
            itemTitle: productTitle
        });

    } catch (error) {
        console.log(error);
    }
});


app.listen(port, ()=>{
    console.log(`Listening on Port ${port}`);
});