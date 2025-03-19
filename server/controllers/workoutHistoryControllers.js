// Get a detailed history of all past sessions
export const getWorkoutHistory = (req, res) => {
  try {
    const { userId } = req.user;
    // ... existing code ...
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving workout history', error: error.message });
  }
};

// Get performance history for a specific exercise
export const getExerciseHistory = (req, res) => {
  try {
    const { userId } = req.user;
    // ... existing code ...
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving exercise history', error: error.message });
  }
}; 