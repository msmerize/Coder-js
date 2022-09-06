/*SIMULADOR DE COMPRAS
-------------------------------------------
1-Se listan los productos disponibles y se elige uno.
2-Se elige el metodo de pago.
3-Se ingresan los datos de facturacion.
4-Se confirma la operacion.*/


class Product{

    constructor(id, name, price){
        this.id = Number(id)
        this.name = name
        this.price = Number(price)
    }

    displayForMenu(){
        return "(" + this.id + ")" + " - " + this.name + " - " + "$" + this.price
    }
}

class Client{

    constructor( nameAndSurname, address, email){
        this.nameAndSurname = nameAndSurname
        this.address = address
        this.email = email
    }
}

function getProductNumberByPrompt(products){

    let option
    let productsString = ""

    //Se genera un string que contiene toda la informacion de los productos
    for (const product of products) {

        productsString = productsString + product.displayForMenu() + "\n"
    }
    
    do {
        option = Number(
            prompt(
                "BIENVENIDO A SHOPPA \n" +
                "-----------------------------------------\n" +
                "INGRESE EL NRO DEL PRODUCTO QUE DESEA COMPRAR: \n" +
                productsString
            ))
    } while ( ! isValidProductOption(option) )
    
    return option
}

function isValidProductOption(option){

    for (const product of products) {
        if ( product.id == option ) {
            return true           
        }
    }

    alert("La opción de producto ingresada no es válida")
    return false
}

function getPaymentOptionsByPrompt(){

    let option 
    do {
        option = Number(
            prompt(
                "INGRESE LA FORMA DE PAGO: \n" +
                "-----------------------------------------\n" +
                "(1) EFECTIVO \n" +
                "(2) DEBITO\n" +
                "(3) CREDITO\n" +
                "(4) CUOTAS"
            ))
    } while ( ! isValidPaymentOption(option) )

    return option
}

function isValidPaymentOption(option){

    if( option < 1 || option > 4 ){
        alert("La opción de pago ingresada no es válida")
        return false
    }

    return true
}

function getClientNameAndSurname(){

    let nameAndSurname 

    do {
        nameAndSurname = prompt(
                "DATOS DE FACTURACIÓN\n" +
                "-----------------------------------------" + "\n" +
                "Ingrese su Nombre y Apellido:"
                
            )
    } while ( nameAndSurname == '' )

    return nameAndSurname
}

function getClientAddress(){
    
    let address 

    do {
        address = prompt(
            "DATOS DE FACTURACIÓN\n" +
            "-----------------------------------------" + "\n" +
            "Ingrese Domicilio:"
            
        )
    } while ( address == '' )

    return address
}

function getClientEmail(){

    let email 

    do {
        email =  prompt(
            "DATOS DE FACTURACIÓN\n" +
            "-----------------------------------------" + "\n" +
            "Ingrese su Correo Electrónico:"
            
        )
    } while ( email == '' )

    return email
}

function processSelectedProductWithPaymentOptionForClient( product, paymentOption, client){

    let paymentMethod
    
    switch (paymentOption){
        case 1:
            paymentMethod = "Efectivo"
        break
        case 2:
            paymentMethod = "Tarjeta de Débito"
        break
        case 3:
            paymentMethod = "Tarjeta de Crédito"
        break
        case 4:
            paymentMethod = "Cuotas"
        break
        default:
    }

    let option = Number( prompt(
        "RESUMEN DE COMPRA: \n" +
        "----------------------\n" +
        "PRODUCTO: " + product.name + "\n" +
        "FORMA DE PAGO: " + paymentMethod + "\n" +
        "NOMBRE DEL CLIENTE: " + client.nameAndSurname + "\n" +
        "DOMICILIO FACTURACION: " + client.address + "\n" +
        "CORREO DEL CLIENTE: " + client.email + "\n" +
        "----------------------\n" +
        "TOTAL: $" + + product.price + "\n" +
        "----------------------\n" +
        "(1) - ACCEPT" + "\n" +
        "(2) - MODIFY" + "\n" +
        "(0) - CANCEL"
    ))

    return option
} 

function searchProductById(productNumber){
    
    for (const product of products) {
        if( product.id == productNumber ){
            //Retorna el producto cuyo id es igual al ingresado
            return product
        }
    }
}

function updateStock(selectedProduct){
    
    let index
    index = products.indexOf(selectedProduct)
    products.splice(index, 1) //Remueve el producto que fue comprado
    
}

// Array de productos
const products = [new Product( 1, "Camisa", 4500), 
                new Product( 2, "Corbata", 1600),
                new Product( 3, "Zapatillas", 8200),
                new Product( 4, "Billetera", 3200),
                new Product( 5, "Buso", 6800),
                new Product( 6, "Remera", 2400),
                new Product( 7, "Riñonera", 4400),
                new Product( 8, "Gorra", 3000),
                new Product( 9, "Pantalon", 12000)]

let client                  
let selectedProduct
let confirm   

do {
    
    let productNumber = getProductNumberByPrompt(products)
    selectedProduct = searchProductById(productNumber)
    let paymentOption = getPaymentOptionsByPrompt()
    let clientNameAndSurname = getClientNameAndSurname()
    let clientAddress = getClientAddress()
    let clientEmail = getClientEmail()
    
    client = new Client(clientNameAndSurname, clientAddress, clientEmail)

    let confirmOption = processSelectedProductWithPaymentOptionForClient(selectedProduct, paymentOption, client)

    switch (confirmOption){
        case 1:
            confirm = true
        break
        case 2:
            confirm = false 
        break
        case 0:
            confirm = null
        break
        default:
    }

} while( confirm == false  )

if( confirm == true ){
    alert("GRACIAS POR SU COMPRA! SHOPPA LE DESEA UN BUEN DIA.")
    updateStock(selectedProduct) //Actualizacion de stock
}