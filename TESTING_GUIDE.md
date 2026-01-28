# Testing Guide for Modal Fix

## Quick Test Steps

### 1. **Test Modal Opening**
1. Open the app and navigate to the Meals screen
2. Scroll to the bottom
3. Click the "Add New Meal" button
4. **Expected**: Modal should slide up from bottom smoothly
5. **Check console** for: "Add New Meal button clicked"

### 2. **Test Food Search**
1. In the opened modal, type in the search box (e.g., "chicken")
2. **Expected**: Food items should appear as you type (after 3+ characters)
3. Try clearing the search - list should clear

### 3. **Test Filters**
1. Click "Verified Only" button
2. **Expected**: Only verified foods shown
3. Click "Mine" button
4. **Expected**: Only your custom foods shown
5. Click again to toggle off

### 4. **Test Custom Food Creation**
1. Click "Custom Food" button
2. **Expected**: Form should appear with input fields
3. Fill in:
   - Food Name: "Test Food"
   - Calories: 100
   - Protein: 20
   - Carbs: 10
   - Fat: 2
4. Click "Create Food"
5. **Expected**: Success alert, modal should go back to search view

### 5. **Test Food Selection**
1. Search for a food
2. Click on any food item
3. **Expected**: Second modal opens with serving size input
4. Enter serving size (e.g., 150)
5. **Expected**: Nutrition values calculate correctly
6. Click "Add Food"
7. **Expected**: Food added to meal, modals close

### 6. **Test Modal Closing**
1. Open the main modal
2. Test these close methods:
   - Click X button - should close
   - Swipe down - should close
   - Click backdrop (dark area) - should close
3. With food selection modal open:
   - Parent modal should NOT close when clicking backdrop
   - Only the child modal should close

### 7. **Test Back Navigation**
1. Open main modal
2. Click "Custom Food"
3. Click "Back" button
4. **Expected**: Return to food search view
5. **Expected**: Main modal stays open

## Console Debugging

Look for these console messages:

```javascript
// When button is clicked
"Add New Meal button clicked"

// Modal state changes
"Modal state changed: { modalVisible: true, customFoodModalVisible: false, additionModalVisible: false }"

// User ID
"userId loading: [your-user-id]"

// Food search results
"id: [your-user-id]"
"meal: [array of food items]"
```

## Common Issues & Solutions

### Issue: Modal doesn't open (UI freezes)
**Solutions to try:**
1. Check console for errors
2. Restart Metro bundler: `npm start -- --reset-cache`
3. Clear app cache and reinstall
4. Check if `modalVisible` state is changing in console

### Issue: Modal opens but can't interact
**Check:**
1. No overlay blocking touches
2. No error in console
3. Try touching different areas of the modal

### Issue: Search doesn't work
**Check:**
1. You're typing more than 2 characters
2. Console shows the API call
3. Check network connectivity
4. Verify authentication token is valid

### Issue: Can't type in inputs
**Check:**
1. Keyboard appears
2. Input has focus (cursor visible)
3. No errors in console
4. Values are controlled (have `value` prop)

### Issue: Nested modal behaves strangely
**Check:**
1. Only one modal should be "on top" at a time
2. Parent modal shouldn't close when child is open
3. Swipe gesture should be disabled when child is open

## Advanced Debugging

### Enable React Native Debugger
```bash
# In terminal
npm start

# Then in app, shake device or press:
# iOS: Cmd + D
# Android: Cmd + M (Mac) or Ctrl + M (Windows)
# Select "Debug"
```

### Check Modal Package
If issues persist, try downgrading:
```bash
npm install react-native-modal@13.0.1
cd ios && pod install && cd ..  # iOS only
npm start -- --reset-cache
```

### Log Modal State on Every Render
Add this temporarily:
```javascript
console.log("Render:", { modalVisible, customFoodModalVisible, additionModalVisible });
```

## Performance Check

Monitor for:
- Lag when typing in search
- Slow modal animations
- Memory leaks (app getting slower over time)

If found:
1. Consider debouncing search input
2. Optimize FlatList with `removeClippedSubviews`
3. Use React.memo for list items

## Success Criteria

✅ Modal opens smoothly without freeze
✅ All inputs are typeable
✅ Search results appear
✅ Custom food can be created
✅ Food can be added to meals
✅ Modal closes properly (all methods)
✅ No console errors
✅ No UI freezes or hangs
✅ Smooth animations
✅ Keyboard handling works

## Report Issues

If any test fails, note:
1. Which test failed
2. Console output
3. Device/simulator info
4. Steps to reproduce
5. Screenshots/recording if possible

---

**Last Updated**: January 28, 2026
**Version**: After modal refactor
