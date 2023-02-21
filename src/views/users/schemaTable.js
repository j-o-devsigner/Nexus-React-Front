export const schemaColumns = [
    {
        name: 'ID',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Username',
        selector: row => row.username,
        sortable: true,
    },
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Role',
        selector: row => row.roleid,
        sortable: true,
    }
]