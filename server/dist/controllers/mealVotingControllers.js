// Vote for a meal
export const voteForMeal = (req, res) => {
    try {
        const { userId } = req.user;
        // ... existing code ...
    }
    catch (error) {
        res.status(500).json({ message: 'Error voting for meal', error: error.message });
    }
};
// Get the total votes for a specific meal
export const getMealVotes = (req, res) => {
    try {
        const { userId } = req.user;
        // ... existing code ...
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving meal votes', error: error.message });
    }
};
