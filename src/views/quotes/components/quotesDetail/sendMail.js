
export const mail = (dataQuote, productsData) => {
    const {id, customer, user, discountvalue, shippingvalue, subtotal, total, idtypediscount} = dataQuote
    console.log(customer.name)
    const discountType = {
        "1" : "No discount",
        "2" : "Percentage",
        "3" : "Fixed Amount"
    }

    const structure = `
    <html>
    <head>
    <style>

table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
}

th, td {
    padding: 10px;
    border-bottom: 1px solid #3D5A80;
    text-align: left;
}

th {
    background-color: #98C1D9D9;
    font-weight: bold;
}

tr:nth-child(even) {
    background-color: #98C1D9D9;
}

    </style>
</head>
<body style="font-family: Arial, Helvetica, sans-serif; color: #222;">
    <h2 style="color: #293241;">Your quote info from Nexus</h2>
    <div style="color: #293241;">
        Hello <b>${customer.name}</b>,<br>
        This email contains the information of your quote. If you have any questions or concerns, please don't hesitate to reach out to me, <b>your friendly representative at Nexus, ${user.name}</b>.<br>
        Here is your quote ID <b>(${id})</b>, please note that it may be subject to change.<br>
    </div>
    <table>
    <thead style="border: 1px solid #3D5A80;">
        <tr>
        <th>Product Name</th>
        <th>Detail</th>
        <th>Amount</th>
        <th>Price</th>
        <th>Subtotal</th>
        </tr>
    </thead>
    <tbody style="border: 1px solid #3D5A80;">
    ${productsData.map( product => `
    <tr style="border-bottom: 1px solid #3D5A80;">
        <td style="text-align: center;">${product.product.name}</td>
        <td style="text-align: center;">${product.product.detail}</td>
        <td style="text-align: center;">${product.product.amount}</td>
        <td style="text-align: center;">${product.product.price}</td>
        <td style="text-align: center;">${(Number(product.product.amount) * Number(product.product.price)).toFixed(2)}</td>
    </tr>
        `)}
    </tbody>
    </table>
    <table style="width: 65%; margin-top: 20px; float: left;">
    <tbody style="border: 1px solid #3D5A80;">
        <tr style="border-top: 1px solid #3D5A80;">
            <td style="text-align: right; font-weight: bold;">Discount Type:</td>
            <td style="text-align: right;">${discountType[idtypediscount]}</td>
        </tr>
        <tr style="border-top: 1px solid #3D5A80;">
            <td style="text-align: right; font-weight: bold;">Discount Value:</td>
            <td style="text-align: right;">${discountvalue}</td>
        </tr>
        <tr style="border-top: 1px solid #3D5A80;">
            <td style="text-align: right; font-weight: bold;">Subtotal:</td>
            <td style="text-align: right;">$${subtotal}</td>
        </tr>
        <tr style="border-top: 1px solid #3D5A80;">
            <td style="text-align: right; font-weight: bold;">Shipping:</td>
            <td style="text-align: right;">$${shippingvalue}</td>
        </tr>
        <tr style="background-color: #EE6C4D;">
            <td style="text-align: right; font-weight: bold;">Total:</td>
            <td style="text-align: right; font-weight: bold;">${total}</td>
        </tr>
    </tbody>
    </table>
    </body>
</html>

    `

    return structure;
}
