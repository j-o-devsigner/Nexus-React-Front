export const schemaColumns = [
    {
        name: 'ID',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Detail',
        selector: row => row.detail,
        sortable: true,
    },
    {
        name: 'Price',
        selector: row => '$ ' + row.price,
        sortable: true,
    }
]