const express = require('express')
const app = express()
require('dotenv').config()
var cors = require('cors')
const port = 5000

app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rhqoaho.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    // collections
    const HotelCollection = client.db("travelo").collection("allHotels");
    const BookedHotelCollection = client.db("travelo").collection("bookedHotels");

    app.get("/hotels", async (req, res) => {
      const hotels = HotelCollection.find({});
      const result = await hotels.toArray();
      res.send(result);
    })

    // app.get("/bookHotels", async (req, res) => {
    //   const data = {
    //     "id": "743788",
    //     "listing_url": "https://www.airbnb.com/rooms/743788",
    //     "scrape_id": "20170402075052",
    //     "last_scraped": "2017-04-02",
    //     "name": "Le Quartier Sonang-Kamar Bidadari",
    //     "summary": "\u2018Le Quartier Sonang\u2019 is a peaceful, quiet townhouse in the most popular district of Amsterdam. The luxury mini suites at the first floor in this 19th century original townhouse are located in the middle of the museum, fashion and theatre district.",
    //     "space": "We opened our doors on the 25th of April 2012 and is a peaceful, quiet townhouse in the most popular district of Amsterdam. The two comfortable guestrooms at the first floor in this 19th century original townhouse are located only five minutes away from the Leidseplein, Vondelpark, P.C. Hooftstraat, all famous museums and the concert building. Sleep on a cloud on the COCO-MAT beds, the best beds in town. Rooms are spacious, carefully designed to meet the highest standards, and offer you a perfect retreat as a home away for home after a long day exploring the city. Kamar Bidadari: a comfortable mini suite The completely furnished apartment with private bathroom is equipped with a LED TV/DVD, free WIFI, tea- and coffee facilities and a small refrigerator for your beverages. The huge windows in the rooms provide you a better Amsterdam view than any painting ever made.",
    //     "description": "\u2018Le Quartier Sonang\u2019 is a peaceful, quiet townhouse in the most popular district of Amsterdam. The luxury mini suites at the first floor in this 19th century original townhouse are located in the middle of the museum, fashion and theatre district. We opened our doors on the 25th of April 2012 and is a peaceful, quiet townhouse in the most popular district of Amsterdam. The two comfortable guestrooms at the first floor in this 19th century original townhouse are located only five minutes away from the Leidseplein, Vondelpark, P.C. Hooftstraat, all famous museums and the concert building. Sleep on a cloud on the COCO-MAT beds, the best beds in town. Rooms are spacious, carefully designed to meet the highest standards, and offer you a perfect retreat as a home away for home after a long day exploring the city. Kamar Bidadari: a comfortable mini suite The completely furnished apartment with private bathroom is equipped with a LED TV/DVD, free WIFI, tea- and coffee facilities and a small re",
    //     "experiences_offered": "none",
    //     "neighborhood_overview": null,
    //     "notes": null,
    //     "transit": null,
    //     "access": null,
    //     "interaction": null,
    //     "house_rules": "The most important houserule is that you are going to enjoy your stay in Amsterdam. Anything you need, just let us know and we will help you.  Upon check in we will tell you all about our beautiful house and the use of e,g, high speed internet, the Nespressomachine in your room, etc...",
    //     "thumbnail_url": "https://a0.muscache.com/im/pictures/10232036/f44402fc_original.jpg?aki_policy=small",
    //     "medium_url": "https://a0.muscache.com/im/pictures/10232036/f44402fc_original.jpg?aki_policy=medium",
    //     "picture_url": {
    //       "thumbnail": true,
    //       "filename": "f44402fc_original.jpg",
    //       "format": "JPEG",
    //       "width": 639,
    //       "mimetype": "image/jpeg",
    //       "etag": "\"5bcb4d1bee413e18bb29a61e664079f655c3de68\"",
    //       "id": "5e156e2781e2590c7ae14b30516a919a",
    //       "last_synchronized": "2019-07-03T11:07:33.566100",
    //       "color_summary": [
    //         "rgba(144, 151, 164, 1.00)",
    //         "rgba(129, 129, 130, 1.00)",
    //         "rgba(88, 85, 66, 1.00)"
    //       ],
    //       "height": 426,
    //       "url": "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/airbnb-listings/files/5e156e2781e2590c7ae14b30516a919a"
    //     },
    //     "xl_picture_url": "https://a0.muscache.com/im/pictures/10232036/f44402fc_original.jpg?aki_policy=x_large",
    //     "host_id": "3897376",
    //     "host_url": "https://www.airbnb.com/users/show/3897376",
    //     "host_name": "Oki & Frank",
    //     "host_since": "2012-10-17",
    //     "host_location": "Amsterdam, Noord-Holland, The Netherlands",
    //     "host_about": "We are Oki & Frank, together we have over 30 years international hotel experience and we speak English, Dutch, French, German and Bahasa Indonesia.\r\nWelcome to 'Le Quartier Sonang'! We have lived in this beautiful building in Amsterdam for the last 20 years, so ask us anything about the area and we will be glad to guide you through the city\u2026. and if you want to spend a week at the seaside, please visit our Pondok Sonang vacation house.\r\nWelcome to 'Pondok Sonang'!  We bought this beautiful bungalow in 1989, renovated in 2015 and we secured it's character from the 60's. We will personally welcome you and tell you all about the area and (as there is an end to every holiday) we will wish you a safe trip back home.",
    //     "host_response_time": "within a day",
    //     "host_response_rate": 100,
    //     "host_acceptance_rate": null,
    //     "host_thumbnail_url": "https://a0.muscache.com/im/users/3897376/profile_pic/1350470219/original.jpg?aki_policy=profile_small",
    //     "host_picture_url": "https://a0.muscache.com/im/users/3897376/profile_pic/1350470219/original.jpg?aki_policy=profile_x_medium",
    //     "host_neighbourhood": "Oud-West",
    //     "host_listings_count": 3,
    //     "host_total_listings_count": 3,
    //     "host_verifications": [
    //       "email",
    //       "phone",
    //       "reviews"
    //     ],
    //     "street": "Oud-West, Amsterdam, North Holland 1054, Netherlands",
    //     "neighbourhood": "Oud-West",
    //     "neighbourhood_cleansed": "De Baarsjes - Oud-West",
    //     "neighbourhood_group_cleansed": null,
    //     "city": "Amsterdam",
    //     "state": "North Holland",
    //     "zipcode": "1054",
    //     "market": "Amsterdam",
    //     "smart_location": "Amsterdam, Netherlands",
    //     "country_code": "NL",
    //     "country": "Netherlands",
    //     "latitude": "52.36456756846072",
    //     "longitude": "4.875639539930118",
    //     "property_type": "Bed & Breakfast",
    //     "room_type": "Private room",
    //     "accommodates": 2,
    //     "bathrooms": 1.0,
    //     "bedrooms": 1,
    //     "beds": 1,
    //     "bed_type": "Real Bed",
    //     "amenities": [
    //       "TV",
    //       "Internet",
    //       "Wireless Internet",
    //       "Breakfast",
    //       "Heating",
    //       "Smoke detector",
    //       "First aid kit",
    //       "Fire extinguisher",
    //       "Essentials",
    //       "Shampoo"
    //     ],
    //     "square_feet": 323,
    //     "price": 160,
    //     "weekly_price": null,
    //     "monthly_price": null,
    //     "security_deposit": null,
    //     "cleaning_fee": null,
    //     "guests_included": 1,
    //     "extra_people": 0,
    //     "minimum_nights": 2,
    //     "maximum_nights": 14,
    //     "calendar_updated": "today",
    //     "has_availability": null,
    //     "availability_30": 3,
    //     "availability_60": 4,
    //     "availability_90": 13,
    //     "availability_365": 178,
    //     "calendar_last_scraped": "2017-04-02",
    //     "number_of_reviews": 0,
    //     "first_review": null,
    //     "last_review": null,
    //     "review_scores_rating": null,
    //     "review_scores_accuracy": null,
    //     "review_scores_cleanliness": null,
    //     "review_scores_checkin": null,
    //     "review_scores_communication": null,
    //     "review_scores_location": null,
    //     "review_scores_value": null,
    //     "license": null,
    //     "jurisdiction_names": "Amsterdam",
    //     "cancellation_policy": "strict",
    //     "calculated_host_listings_count": 2,
    //     "reviews_per_month": null,
    //     "geolocation": {
    //       "lon": 4.875639539930118,
    //       "lat": 52.36456756846072
    //     },
    //     "features": [
    //       "Host Has Profile Pic",
    //       "Is Location Exact"
    //     ]
    //   }
    //   data.arrival = new Date("2024-01-02T08:29:08.000Z")
    //   data.departure = new Date("2024-01-06T08:29:08.000Z")
    //   const result = await BookedHotelCollection.insertOne(data);
    //   res.send(result);
    // })

    app.get("/available", async (req, res) => {
      const { start, end, page, limit } = req.query;
      console.log(req.query);
      const hotels = HotelCollection.find({});
      const allHotels = await hotels.toArray();
      const find = BookedHotelCollection.find({
        $or: [
          {
            $and: [
              { arrival: { $lt: new Date(start) } },
              { departure: { $gt: new Date(start) } }
            ]
          },
          {
            $and: [
              { arrival: { $lt: new Date(end) } },
              { departure: { $gt: new Date(end) } }
            ]
          }
        ]
      });
      const bookedHotels = await find.toArray();
      const allResult = allHotels.filter(h => !bookedHotels.find(b => b.id === h.id));
      const result = allResult.slice(((page - 1) * limit), page * limit);
      res.send(result);
    })



  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})