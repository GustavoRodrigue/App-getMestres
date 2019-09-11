export default{
    port: process.env.PORT || 3000,
    secretyKey: process.env.SECRETYKEY || 'b98be654-35f5-4e74-8029-6ece7841d597',
    publicRoutes: process.env.PUBLICROUTES ||[
        'users/create',
        'users/auth',
        'customer/create'
    ]
}