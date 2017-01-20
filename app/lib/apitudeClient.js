import axios from "axios"
import crypto from "crypto"

export default {
	"hotelAvail": function(options, params) {
		// sha256Hex(apiKey + sharedSecret + System.currentTimeMillis() / 1000)
		const signature = options.key + options.secret + Math.round(new Date().getTime() / 1000)
		const hash = crypto.createHash('sha256').update(signature).digest('hex')

        return axios.post("https://api.test.hotelbeds.com/hotel-api/1.0/hotels", {
            "stay": {
                "checkIn": params.checkInDate,
                "checkOut": params.checkOutDate,
                "shiftDays": params.shiftDays
            },
            "occupancies": [
                {
                    "rooms": 1,
                    "adults": 2,
                    "children": 2,
                    "paxes": [
                        {
                            "type": "AD",
                            "age": 30
                        },
                        {
                            "type": "AD",
                            "age": 30
                        },
                        {
                            "type": "CH",
                            "age": 8
                        },
                        {
                            "type": "CH",
                            "age": 8
                        }
                    ]
                },
                {
                    "rooms": 1,
                    "adults": 1,
                    "children": 1,
                    "paxes": [
                        {
                            "type": "AD",
                            "age": 30
                        },
                        {
                            "type": "CH",
                            "age": 8
                        }
                    ]
                }
            ],
            "destination": {
                "code": params.destination
                /*, "zone": "90"*/
            }
        }, 
        {
	        "headers": {
	            "Api-Key": options.key,
	            "X-Signature": hash,
	            "Accept": "application/json"
	        }
        }
        )
    }
}
