import dbConnect from '../../lib/dbConnect';
import Tuition from '../../models/Tuition';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
        try {
          const { id } = req.query;
          const tuition = id
            ? await Tuition.findById(id)
            : await Tuition.find({});
          res.status(200).json({ success: true, data: tuition });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;

    case 'POST':
      try {
        const tuition = await Tuition.create(req.body);
        res.status(201).json({ success: true, data: tuition });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        const { id } = req.body;
        const tuition = await Tuition.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ success: true, data: tuition });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.body;
        await Tuition.findByIdAndDelete(id);
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
