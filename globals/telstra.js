////
///@author: Nikhil Saini
///@desc: Adapter for access to telstra messaging api
////
var host = "https://tap.telstra.com";
var encoded = require("form-urlencoded").default;
global.telstra = {
    oauth: {
        token: "",
        getToken: async () => {
            var { response, error } = await axios({
                url: host + "/v2/oauth/token",
                method: 'post',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: encoded({
                    client_id: smsConfig.client.id,
                    client_secret: smsConfig.client.secret,
                    grant_type: "client_credentials"
                })
            });
            if (response) {
                telstra.oauth.token = response.data.access_token;
            }
            return { response, error };
        }
    },
    message: async (number, message) => {
        let { response, error } = await telstra.oauth.getToken();
        if (response) {
            let { response, error } = await axios({
                url: host + "/v2/messages/sms",
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + telstra.oauth.token
                },
                data: {
                    "to": number,
                    "validity": "60",
                    "priority": false,
                    "notifyURL": "",
                    "body": message
                }
            });
            return { response, error };
        };
        return { response, error };
    }
}
