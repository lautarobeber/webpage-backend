import mercadopago from "mercadopago";

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
        title: req.body.name,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
        currency_id: req.body.currency_id,
       
      },
    ],
    back_urls: {
      success: "http://localhost:5173/succes",
      pending: "http://localhost:5173/succes",
      failure: "",
    },
    notification_url: "https://9968-181-85-126-56.ngrok-free.app/api/succes",
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
    console.log('llega')
    const payment = req.query;
    console.log(payment);
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log(data);
      console.log('query')
    }

    console.log('status')
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
}; 


