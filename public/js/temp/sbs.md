# Step-by-Step Question Solutions 📝

*Learn to solve each question from scratch*

---

## 🎯 Question 1: Add Product/Service with Cost Calculation

### What the Question Asks

*"Add a new product/service to the Products page and update the JavaScript code so that the new item is included in the total cost calculation."*

### Step-by-Step Solution

#### Step 1: Understand What You Need

- Add checkboxes for products
- Each checkbox has a price value
- Calculate total when checkboxes change
- Display the total

#### Step 2: Add HTML (in index.html)

```html
<!-- Add this section before the feedback section -->
<section class="products-section" style="padding: 40px 0;">
    <h2>Our Products</h2>
    <div style="max-width: 600px; margin: 0 auto;">
        <!-- Product 1 -->
        <div>
            <input type="checkbox" id="prod1" value="100" onchange="calculateTotal()">
            <label for="prod1">Basic Plan ($100)</label>
        </div>
        
        <!-- Product 2 -->
        <div>
            <input type="checkbox" id="prod2" value="500" onchange="calculateTotal()">
            <label for="prod2">Premium Plan ($500)</label>
        </div>
        
        <!-- Product 3 - NEW PRODUCT ADDED -->
        <div>
            <input type="checkbox" id="prod3" value="1200" onchange="calculateTotal()">
            <label for="prod3">Enterprise Plan ($1200)</label>
        </div>
        
        <!-- Display Total -->
        <div style="margin-top: 20px; font-weight: bold;">
            <h3>Total: $<span id="totalCost">0</span></h3>
        </div>
    </div>
</section>
```

#### Step 3: Add JavaScript (in script.js)

```javascript
// Add this at the end of your script.js file
function calculateTotal() {
    // Step 1: Get all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    // Step 2: Initialize total to 0
    let total = 0;
    
    // Step 3: Loop through each checkbox
    checkboxes.forEach(function(checkbox) {
        // If checkbox is checked, add its value to total
        if (checkbox.checked) {
            total += parseFloat(checkbox.value);  // parseFloat converts string to number
        }
    });
    
    // Step 4: Display the total
    document.getElementById('totalCost').textContent = total;
}
```

#### Step 4: Test It

1. Open the page in browser
2. Click checkboxes
3. Verify total updates correctly
4. Check calculations: 100 + 500 = 600, etc.

### Key Concepts Used

- HTML checkboxes with `value` attribute
- `onchange` event to trigger calculation
- `querySelectorAll()` to get all checkboxes
- `parseFloat()` to convert string to number
- Loop through elements with `forEach()`

---

## 🎯 Question 2: Modify CSS Styling

### What the Question Asks

*"Modify the CSS styling such as changes background colour, adjust layout, update font style using Inline, Internal, or External CSS."*

### Step-by-Step Solution

#### Step 1: Find the CSS File

Look for `style.css` in your project

#### Step 2: Locate the Variables/Selectors

```css
/* Look for :root section or body section */
:root {
    --bg-color: #f5e6d3;  /* This is the background color */
    --font-body: 'Lora', serif;  /* This is the font */
}

body {
    background-color: var(--bg-color);
    font-family: var(--font-body);
    padding: 20px;
}
```

#### Step 3: Change Background Color

```css
:root {
    --bg-color: #e3f2fd;  /* Changed to light blue */
}

/* OR directly in body */
body {
    background-color: #e3f2fd;  /* Light blue */
}
```

#### Step 4: Change Font

```css
:root {
    --font-body: 'Arial', sans-serif;  /* Changed to Arial */
}

/* OR directly in body */
body {
    font-family: 'Arial', sans-serif;
}
```

#### Step 5: Alternative - Internal CSS

If you want to use internal CSS instead, add this in `<head>` of HTML:

```html
<style>
    body {
        background-color: #e3f2fd;
        font-family: 'Arial', sans-serif;
        padding: 30px;  /* Adjusted layout */
    }
</style>
```

#### Step 6: Test It

1. Save the file
2. Refresh browser
3. Check if background color changed
4. Check if font changed

### Key Concepts Used

- CSS variables (`:root`)
- `background-color` property
- `font-family` property
- Internal vs External CSS

---

## 🎯 Question 3: Feedback Form Validation

### What the Question Asks

*"Write the code written for feedback form validation where the field is email and mobile number."*

### Step-by-Step Solution

#### Step 1: Add Mobile Field to HTML

```html
<form id="feedbackForm">
    <!-- Existing fields -->
    <label for="name">Name:</label>
    <input type="text" id="name" required>
    
    <label for="email">Email:</label>
    <input type="email" id="email" required>
    
    <!-- ADD THIS: Mobile field -->
    <label for="mobile">Mobile Number:</label>
    <input type="tel" id="mobile" placeholder="10-digit number" required>
    
    <label for="message">Message:</label>
    <textarea id="message" required></textarea>
    
    <button type="submit">Submit</button>
</form>
```

#### Step 2: Add Validation JavaScript

```javascript
// Add this in your script.js
const form = document.getElementById('feedbackForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();  // IMPORTANT: Stop form from submitting normally
    
    // Step 1: Get the values
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    
    // Step 2: Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;  // Stop here if invalid
    }
    
    // Step 3: Mobile validation (10 digits only)
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;  // Stop here if invalid
    }
    
    // Step 4: If we reach here, validation passed
    alert("Form submitted successfully!");
    form.reset();  // Clear the form
});
```

#### Step 3: Understanding the Regex

```javascript
// Email regex explained:
// /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// ^ = start
// [^\s@]+ = one or more characters that are NOT space or @
// @ = literal @ symbol
// [^\s@]+ = one or more characters that are NOT space or @
// \. = literal dot (.)
// [^\s@]+ = one or more characters that are NOT space or @
// $ = end

// Mobile regex explained:
// /^\d{10}$/
// ^ = start
// \d = any digit (0-9)
// {10} = exactly 10 times
// $ = end
```

#### Step 4: Test It

1. Try valid email: `test@example.com` ✓
2. Try invalid email: `testexample.com` ✗
3. Try valid mobile: `9876543210` ✓
4. Try invalid mobile: `123` ✗

### Key Concepts Used

- `addEventListener('submit')` for form submission
- `event.preventDefault()` to stop default behavior
- Regular expressions (regex) for pattern matching
- `.test()` method to check if pattern matches
- `alert()` for user feedback
- `form.reset()` to clear form

---

## 🎯 Question 4: Clear Button Logic

### What the Question Asks

*"Create a new button on the page that, when clicked, performs a JavaScript action to clears the form and displays a thank-you message."*

### Step-by-Step Solution

#### Step 1: Add Clear Button to HTML

```html
<form id="feedbackForm">
    <!-- form fields here -->
    
    <button type="submit">Submit Feedback</button>
    
    <!-- ADD THIS: Clear button -->
    <button type="button" id="clearBtn" 
            style="background: #795548; color: white; padding: 10px 20px; 
                   border: none; cursor: pointer; margin-left: 10px;">
        Clear
    </button>
</form>
```

**Important:** Use `type="button"` not `type="submit"`!

#### Step 2: Add JavaScript

```javascript
// Get the clear button
const clearBtn = document.getElementById('clearBtn');

// Add click event listener
clearBtn.addEventListener('click', function() {
    // Step 1: Get the form
    const form = document.getElementById('feedbackForm');
    
    // Step 2: Reset the form (clears all fields)
    form.reset();
    
    // Step 3: Show thank-you message
    alert("Thank you! Form cleared.");
});
```

#### Alternative - Using onclick in HTML

```html
<!-- You can also do it this way: -->
<button type="button" onclick="clearForm()">Clear</button>

<script>
function clearForm() {
    document.getElementById('feedbackForm').reset();
    alert("Thank you! Form cleared.");
}
</script>
```

#### Step 3: Test It

1. Fill out the form
2. Click "Clear" button
3. Verify all fields are empty
4. Verify alert shows

### Key Concepts Used

- Button with `type="button"`
- `.reset()` method on form
- `alert()` for message
- Event listener vs onclick attribute

---

## 🎯 Question 5: Hide/Show Section Button

### What the Question Asks

*"Create a new button on the page that, when clicked, performs a JavaScript action to hides/shows a section."*

### Step-by-Step Solution

#### Step 1: Add Toggle Button to HTML

```html
<!-- Add button before the section you want to toggle -->
<div style="text-align: center; margin: 20px 0;">
    <button id="toggleBtn" class="search-btn">
        Toggle Products Section
    </button>
</div>

<!-- The section to show/hide -->
<section id="products-section" class="products-section">
    <h2>Our Products</h2>
    <!-- section content -->
</section>
```

#### Step 2: Add JavaScript

```javascript
// Get the button and section
const toggleBtn = document.getElementById('toggleBtn');
const section = document.getElementById('products-section');

// Add click event
toggleBtn.addEventListener('click', function() {
    // Check current state
    if (section.style.display === 'none') {
        // If hidden, show it
        section.style.display = 'block';
    } else {
        // If visible, hide it
        section.style.display = 'none';
    }
});
```

#### Alternative - Shorter Version

```javascript
const toggleBtn = document.getElementById('toggleBtn');
const section = document.getElementById('products-section');

toggleBtn.onclick = () => {
    section.style.display = 
        section.style.display === 'none' ? 'block' : 'none';
};
```

#### Step 3: Test It

1. Click button - section should disappear
2. Click again - section should reappear
3. Repeat to verify toggle works

### Key Concepts Used

- `style.display` property
- Setting to `'none'` to hide
- Setting to `'block'` to show
- If-else conditional
- Ternary operator (alternative)

---

## 🎯 Question 6: Discount Logic

### What the Question Asks

*"Update the cost calculation script to apply discount logic where if the total is more than 1000, calculating will be applying 10% off."*

### Step-by-Step Solution

#### Step 1: Modify calculateTotal() Function

```javascript
function calculateTotal() {
    // Step 1: Calculate total (same as before)
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let total = 0;
    
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            total += parseFloat(checkbox.value);
        }
    });
    
    // Step 2: NEW - Apply discount logic
    let displayMessage = "";
    
    if (total > 1000) {
        // Calculate 10% discount
        const discount = total * 0.10;  // 10% = 0.10
        total = total - discount;
        displayMessage = " (Includes 10% Discount!)";
    }
    
    // Step 3: Display total with message
    document.getElementById('totalCost').textContent = 
        total.toFixed(2) + displayMessage;
}
```

#### Step 2: Understanding the Math

```javascript
// Example 1: Total = 800
// 800 > 1000? NO
// No discount applied
// Display: 800.00

// Example 2: Total = 1500
// 1500 > 1000? YES
// Discount = 1500 * 0.10 = 150
// New total = 1500 - 150 = 1350
// Display: 1350.00 (Includes 10% Discount!)
```

#### Step 3: Test It

1. Select items totaling < 1000 (e.g., 100 + 500 = 600)
   - Should show: 600.00
2. Select items totaling > 1000 (e.g., 100 + 500 + 1200 = 1800)
   - Before discount: 1800
   - 10% discount: 180
   - Should show: 1620.00 (Includes 10% Discount!)

### Key Concepts Used

- Conditional logic (`if` statement)
- Percentage calculation (`* 0.10`)
- String concatenation
- `.toFixed(2)` for 2 decimal places

---

## 🎯 Question 7: Save Feedback to Backend

### What the Question Asks

*"Write the code to save the contents of the feedback form to a backend file and once written it display the successful code on the front end."*

### Step-by-Step Solution

#### Step 1: Create Backend Endpoint (server.js)

```javascript
// In server.js, add this route
app.post('/api/feedback', async (req, res) => {
    try {
        // Get data from request
        const feedback = new Feedback(req.body);
        
        // Save to database
        await feedback.save();
        
        // Send success response
        res.json({ 
            success: true, 
            message: 'Feedback saved successfully!' 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            error: 'Failed to save feedback' 
        });
    }
});
```

#### Step 2: Create Feedback Model (models/Feedback.js)

```javascript
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: false },
    rating: { type: String, required: true },
    message: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
```

#### Step 3: Update Frontend Form Handler (script.js)

```javascript
const form = document.getElementById('feedbackForm');

form.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    // Step 1: Collect form data
    const feedbackData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        mobile: document.getElementById('mobile').value,
        rating: document.getElementById('rating').value,
        message: document.getElementById('message').value
    };
    
    // Step 2: Send to backend using fetch
    try {
        const response = await fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedbackData)
        });
        
        // Step 3: Get response
        const result = await response.json();
        
        // Step 4: Show success or error message
        if (result.success) {
            alert(result.message);  // "Feedback saved successfully!"
            form.reset();
        } else {
            alert("Error saving feedback");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Network error - could not save feedback");
    }
});
```

#### Step 4: Test It

1. Fill out form
2. Click submit
3. Check if success alert shows
4. Check database to verify data was saved
5. Verify form clears after submission

### Key Concepts Used

- `fetch()` API for HTTP requests
- `async/await` for handling promises
- `JSON.stringify()` to convert object to JSON
- POST request with JSON data
- Try-catch for error handling
- Backend route handling
- MongoDB model

---

## 🎯 Question 8: Special Offers Section with Internal CSS

### What the Question Asks

*"Add a new section styling 'About Christmas/New Year Special Offers' and apply appropriate styling using Internal CSS."*

### Step-by-Step Solution

#### Step 1: Add Internal CSS in HTML `<head>`

```html
<head>
    <meta charset="UTF-8">
    <title>My Page</title>
    <link rel="stylesheet" href="style.css">
    
    <!-- ADD THIS: Internal CSS -->
    <style>
        .special-offers {
            background-color: #d32f2f;  /* Red background */
            color: white;
            padding: 30px;
            margin: 40px 0;
            text-align: center;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        
        .offers-title {
            font-size: 2rem;
            margin-bottom: 10px;
            text-transform: uppercase;
            font-weight: bold;
        }
        
        .offer-code {
            background: white;
            color: #d32f2f;
            padding: 10px 20px;
            display: inline-block;
            font-weight: bold;
            font-size: 1.5rem;
            margin-top: 15px;
            border-radius: 4px;
        }
    </style>
</head>
```

#### Step 2: Add HTML Section in `<body>`

```html
<!-- Add this before the Feedback section -->
<section class="special-offers">
    <h2 class="offers-title">Christmas & New Year Special</h2>
    <p class="offer-details">
        Get 50% OFF on all Annual Subscriptions this holiday season!
    </p>
    <div class="offer-code">
        CODE: HOLIDAY50
    </div>
</section>
```

#### Step 3: Test It

1. Refresh page
2. Check if red banner appears
3. Verify text is white
4. Verify promo code stands out

### Key Concepts Used

- Internal CSS (in `<style>` tags)
- Class selectors (`.classname`)
- Background color, text color
- Padding, margin, border-radius
- Text alignment and transformation
- Display properties

---

## 🎓 General Problem-Solving Steps

### For ANY Question

1. **READ Carefully**
   - What does it ask for?
   - What needs to change?

2. **IDENTIFY Components**
   - HTML needed?
   - CSS needed?
   - JavaScript needed?

3. **PLAN Your Approach**
   - Write pseudocode/comments first
   - Break into small steps

4. **IMPLEMENT**
   - Write code step by step
   - Test each step

5. **TEST**
   - Does it work?
   - Try different inputs
   - Check console for errors

6. **DEBUG If Needed**
   - Open browser console (F12)
   - Look for error messages
   - Add `console.log()` to check values

### Common Debugging Commands

```javascript
console.log("Value:", myVariable);
console.log("Checkpoint reached");
console.log(typeof myVariable);  // Check data type
```

---

## ✅ Practice Exercise

Try solving these on your own:

1. **Add a counter** that shows how many checkboxes are selected
2. **Change button color** when hovering over it
3. **Validate phone number** to be exactly 10 digits starting with 6-9
4. **Add a "Select All"** button for checkboxes
5. **Show/hide password** toggle button

---

## 💡 Final Tips

1. **Always start simple** - Get basic version working first
2. **Test frequently** - After each change, test it
3. **Use console.log()** - Debug by printing values
4. **Read error messages** - They tell you what's wrong
5. **Google is your friend** - But understand before copying

**You've learned the fundamentals. Now practice without looking at solutions!** 💪
