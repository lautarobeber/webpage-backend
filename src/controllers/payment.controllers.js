/* import mercadopago from "mercadopago";
import Order from '../models/order.model.js' 

export const createOrder = async (req, res) => {
  
  console.log(req.body);
  console.log("hola");
  mercadopago.configure({
    access_token:
      "TEST-7974473677073417-092600-1b6efef8eb4d0f1d72625d9a47893327-1491467472",
  });

  let preference = {
    items: [
      {
        category_id: ` ${req.body.payer.province} / ${req.body.payer.city} / ${req.body.payer.adress} `,
        title: ` ${req.body.payer.name_user} ${req.body.payer.surname_user} `,
        description: `${req.body.payer.email}`,
        unit_price: Number(req.body.price),
        picture_url:`${req.body.payer.phone}` ,
        id: `${req.body.desc}  ID: ${req.body.id}`,
        quantity: Number(req.body.quantity),
        currency_id: req.body.currency_id,
      },
    ],
    back_urls: {
      success: "http://localhost:5173/succes",
      pending: "http://localhost:5173/succes",
      failure: "",
    },
    notification_url: "https://fefd-181-85-126-56.ngrok-free.app/api/succes",
    auto_return: "approved",
  };



  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const receiveWebhook = async (req, res) => {
  try {
    console.log("llega");
    const payment = req.query;
    console.log("esto es payments");
    console.log(payment);
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log(data.body.transaction_amount); //necesito la plata del producto
      console.log("intento 2");
    
      console.log('array')
      console.log(data.body.additional_info.items[0].category_id);
      console.log(data.body.additional_info.items[0])
      try{
        const order = new Order({
          user: data.body.additional_info.items[0].description ,
          product: data.body.additional_info.items[0].id,
          amount: data.body.additional_info.items[0].unit_price,
          adress: data.body.additional_info.items[0].category_id,
          quantity: data.body.additional_info.items[0].quantity,
          shipping: false,
  
          
        }) 

        order.save()

        
      }catch(e){
        console.log(e)
      }

      }
      

    console.log("status");
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};


export const getOrders = async (req, res) =>{

  const orders = await Order.find()
  res.json(orders);
} */