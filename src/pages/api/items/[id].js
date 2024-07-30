import { updateDataByAny, deleteDataByAny } from "@/services/serviceOperations";

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'PUT') {
        const { name, value } = req.body;
        try {
            const updatedItem = await updateDataByAny('Item', { id }, { name, value });
            if (updatedItem.error) {
                throw new Error(updatedItem.error);
            }
            res.status(200).json(updatedItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === 'DELETE') {
        try {
            const deletedItem = await deleteDataByAny('Item', { id });
            if (deletedItem.error) {
                throw new Error(deletedItem.error);
            }
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).end();
    }
}
