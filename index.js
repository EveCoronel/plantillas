const express = require('express')
const { engine } = require('express-handlebars')
const path = require('path');

const PORT = process.env.PORT || 8080;
const app = express()
/* const { Products } = require('./model/products')
const products = new Products() */
// Esto por el error que me surgia al intentar importarlo //
const products = [
    {
        "id": 1,
        "title": "Escuadra",
        "price": 200,
        "thumbnail": "http://placekitten.com/50/50"
    },
    {
        "id": 2,
        "title": "Calculadora",
        "price": 234.56,
        "thumbnail": "http://placekitten.com/50/50"
    },
    {
        "id": 3,
        "title": "Globo Terráqueo",
        "price": 45.67,
        "thumbnail": "http://placekitten.com/50/50"
    },
    {
        "id": 4,
        "title": "Paleta Pintura",
        "price": 456.78,
        "thumbnail": "http://placekitten.com/50/50"
    },
    {
        "id": 5,
        "title": "Reloj",
        "price": 67.89,
        "thumbnail": "http://placekitten.com/50/50"
    },
    {
        "id": 6,
        "title": "Papelera",
        "price": 200,
        "thumbnail": "http://placekitten.com/50/50"
    } 
]

class Products {

    constructor() {
        this.products = products
    }

    getAll() {
        return this.products
    }

    getById(id) {
        const product = this.products.find((product) => product.id === +(id));

        if (product) {
            return product
        } else {
            return { error: 'Product not found' }
        }

    }

    save(newProductParam) {
        const { title, price, thumbnail } = newProductParam;
        if (title != null && price != null && thumbnail != null) {
            const newProduct = {
                id: this.products.length + 1,
                title,
                price,
                thumbnail,
            };
            this.products.push(newProduct);
            return {
                message: "Created",
                product: newProduct,
            }
        } else {
            return {
                message: "Bad Request",
                error: "Incorrect format"
            }
        }

    }

    updateById(id, product) {

        const { title, price, thumbnail } = product;

        if (title != null && price != null && thumbnail != null) {

            let productsUpdate = this.products.map((p) => p.id === id ? p = {
                id,
                title,
                price,
                thumbnail
            } : p);

            this.products = productsUpdate

            return { message: 'Updated successfully' }
        } else {
            return {
                message: "Bad Request",
                error: "Incorrect format"
            }
        }

    }

    deleteById(id) {
        let newProducts = this.products.filter(item => item.id != +(id))
        this.products = newProducts
        return { message: 'Deleted successfully' }
    }
}
//

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
const productos = new Products()

// HBS

/* app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: path.resolve(__dirname, './views/hbs/layouts'),
    partialsDir: path.resolve(__dirname, './views/hbs/partials')
}))

app.set('views', './views/hbs/layouts')
app.set('view engine', 'hbs')

app.get('/products', (req, res) => {
    res.render('main', { products: productos.getAll() })
})

app.post('/products', (req, res) => {
    productos.save(req.body)
    res.redirect('/products')
})
 */

// PUG

/* app.set('views', './views/pug')
app.set('view engine', 'pug')

app.get('/products', (req, res) => {
    res.render('index', { products: productos.getAll() })
})

app.post('/products', (req, res) => {
    productos.save(req.body)
    res.redirect('/products')
})
 */

// EJS 

app.set('views', './views/ejs')
app.set('view engine', 'ejs')

app.get('/products', (req, res) => {
    res.render('index', { products: productos.getAll() })
})

app.post('/products', (req, res) => {
    productos.save(req.body)
    res.redirect('/products')
})


app.get('*', (req, res) => {
    res.status(404).send('Página no encontrada')
})

const serverConnected = app.listen(PORT, () => {
    console.log(`Server is up and running`)
})
serverConnected.on('error', (error) => {
    console.log(error.message)
})