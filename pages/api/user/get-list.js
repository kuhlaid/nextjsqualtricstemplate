// this does not bother with Mongoose for 
import { connectToDatabase } from 'util/mongodb'

export default async (req, res) => {
	try {
		const { db } = await connectToDatabase();
		const users = await db
			.collection("users")
			.find({})
			.limit(20)
			.toArray();

	  if (!users) {
		throw new Error('No users')
		}
	  res.status(200).json({ users });
	} catch (error) {
	  res.status(400).json({ error });
	}
  };