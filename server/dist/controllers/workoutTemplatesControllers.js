// Get a list of predefined workout templates available to users
export const getUserWorkoutTemplates = (req, res) => {
    try {
        const { userId } = req.user;
        // ... existing code ...
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving workout templates', error: error.message });
    }
};
