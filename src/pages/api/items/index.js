import { getAllData } from "@/services/serviceOperations/index";

const handler = async (req, res) => {

    if (req.method === 'GET') {
        try {
            const data = await getAllData("Item");

            if (!data || data.error || data === undefined) {
                throw new Error(data.error);
            }

            return res.status(200).json({ status: "success", data: data });
        } catch (error) {
            return res.status(500).json({ status: "error", error: error.message, data: null });
        }
    }
}
export default handler;