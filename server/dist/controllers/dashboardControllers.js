// Get dashboard data
export const getDashboardData = (req, res) => {
    try {
        const { userId } = req.user;
        // ... existing code ...
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving dashboard data', error: error.message });
    }
};
