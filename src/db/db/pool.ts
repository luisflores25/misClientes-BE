export default {
	afterCreate: function (connection: any, callback: any) {
		connection.query(`SET time_zone = '+00:00'`, function (err: any) {
			callback(err, connection)
		})
	},
}
