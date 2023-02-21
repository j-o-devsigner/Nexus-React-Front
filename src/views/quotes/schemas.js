export const schemaColumns = [
    {
        name: 'Quote Number',
        selector: row => row.quotenumber,
        sortable: true,
    },
    {
        name: 'Customer',
        selector: row => row.customer,
        sortable: true,
    },
    {
        name: 'Discount Value',
        selector: row => '$ ' + row.discountvalue,
        sortable: true,
    },
    {
        name: 'Subtotal',
        selector: row => '$ ' + row.subtotal,
        sortable: true,
    },
    {
        name: 'Shipping Value',
        selector: row => '$ ' + row.shippingvalue,
        sortable: true,
    },
    {
        name: 'Total',
        selector: row => '$ ' + row.total,
        sortable: true,
    },
]