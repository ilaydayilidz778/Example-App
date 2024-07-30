import { createNewData } from "@/services/serviceOperations/index";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { name, value } = req.body;
            if (!name || !value) {
                return res.status(400).json({ status: "error", message: "Name and value are required" });
            }

            const data = await createNewData("Item", { name, value });

            if (!data || data.error) {
                throw new Error(data.error || "Failed to create data");
            }

            return res.status(200).json({ status: "success", message: "API isteği başarılı", data });
        } catch (error) {
            return res.status(500).json({ status: "error", error: error.message });
        }
    } else {
        res.status(405).json({ status: "error", message: "Method not allowed" });
    }
}