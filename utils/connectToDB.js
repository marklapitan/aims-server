import mongoose from "mongoose";

export default function connectToDB(url) {
  mongoose.connect(url).then((_) => console.log("Connected to DB"));
}


// export const connect = async (url) => {
//   try {
//       // console.log(url)

//       await mongoose.set('strictQuery', false)
//       await mongoose.connect(url)

//       console.log('✅ Connected to DB')
//   } catch (err) {
//       console.error(err)
//   }
// }
