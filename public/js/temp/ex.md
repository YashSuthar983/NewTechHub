# Web Technology Lab Exam Preparation Guide 🎓

## Exam Overview

**Duration:** Likely 3 hours  
**Focus Areas:** HTML, CSS, JavaScript, Basic Backend Integration  
**Format:** 8 practical questions (based on your question paper)

---

## 🎯 Question Pattern Analysis

### Common Question Types

1. **Dynamic Content** - Add products/services with calculations
2. **CSS Modifications** - Change colors, fonts, layouts
3. **Form Validation** - Email, mobile, input validation
4. **JavaScript Actions** - Clear buttons, toggles, calculations
5. **Discount/Pricing Logic** - Conditional calculations
6. **Backend Integration** - Save data to backend/file
7. **Promotional Sections** - Special offers with styling
8. **Internal CSS** - Add styles in `<style>` tags

---

## 📚 Essential HTML Concepts

### 1. Form Elements

```html
<!-- Text Input -->
<input type="text" id="name" placeholder="Your name" required>

<!-- Email Input -->
<input type="email" id="email" placeholder="email@example.com" required>

<!-- Number/Tel Input -->
<input type="tel" id="mobile" placeholder="10-digit number" required>

<!-- Select Dropdown -->
<select id="rating" required>
    <option value="">Select rating</option>
    <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
    <option value="4">⭐⭐⭐⭐ Good</option>
</select>

<!-- Textarea -->
<textarea id="message" rows="5" placeholder="Your message" required></textarea>

<!-- Checkbox -->
<input type="checkbox" id="item1" value="100" onchange="calculate()">
<label for="item1">Item 1 ($100)</label>

<!-- Button -->
<button type="submit">Submit</button>
<button type="button" onclick="clearForm()">Clear</button>
```

### 2. Form Submission

```html
<form id="feedbackForm" onsubmit="handleSubmit(event)">
    <!-- form fields -->
    <button type="submit">Submit</button>
</form>
```

### 3. Sections & Layout

```html
<section class="special-section" style="padding: 20px;">
    <h2>Section Title</h2>
    <p>Section content</p>
</section>
```

---

## 🎨 Essential CSS Concepts

### 1. Inline Styles (Quick for Exam)

```html
<div style="background-color: #ff0000; color: white; padding: 20px;">
    Content
</div>
```

### 2. Internal CSS (In `<head>`)

```html
<style>
    .special-offers {
        background-color: #d32f2f;
        color: white;
        padding: 30px;
        text-align: center;
        border-radius: 8px;
    }
</style>
```

### 3. External CSS (In .css file)

```css
:root {
    --bg-color: #e3f2fd;
    --text-color: #333;
}

body {
    background-color: var(--bg-color);
    font-family: Arial, sans-serif;
    padding: 20px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}
```

### 4. Common CSS Properties

```css
/* Colors */
background-color: #e3f2fd;
color: #333;

/* Fonts */
font-family: 'Arial', sans-serif;
font-size: 16px;
font-weight: bold;

/* Spacing */
padding: 20px;
margin: 10px;

/* Layout */
display: flex;
justify-content: center;
align-items: center;
text-align: center;

/* Borders */
border: 1px solid #ccc;
border-radius: 8px;

/* Shadows */
box-shadow: 0 2px 10px rgba(0,0,0,0.1);
```

---

## ⚡ Essential JavaScript Concepts

### 1. Get Elements

```javascript
// By ID (most common)
const element = document.getElementById('myId');

// By Class
const elements = document.querySelectorAll('.myClass');

// By Tag
const inputs = document.querySelectorAll('input[type="checkbox"]');
```

### 2. Set Values

```javascript
// Set text content
element.textContent = "New text";
element.innerText = "New text";

// Set HTML
element.innerHTML = "<b>Bold text</b>";

// Set input value
inputElement.value = "new value";

// Get input value
const value = inputElement.value;
```

### 3. Event Handlers

#### Form Submit

```javascript
const form = document.getElementById('feedbackForm');
form.onsubmit = (e) => {
    e.preventDefault(); // IMPORTANT: Prevent page refresh
    
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value
    };
    
    console.log(data);
    alert("Form submitted!");
    form.reset(); // Clear form
};
```

#### Button Click

```javascript
const button = document.getElementById('clearBtn');
button.onclick = () => {
    document.getElementById('feedbackForm').reset();
    alert("Form cleared!");
};
```

#### Change Event

```javascript
checkbox.onchange = () => {
    calculateTotal();
};
```

### 4. Validation Patterns

#### Email Validation

```javascript
const email = document.getElementById('email').value;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
}
```

#### Mobile Validation (10 digits)

```javascript
const mobile = document.getElementById('mobile').value;
const mobileRegex = /^\d{10}$/;

if (!mobileRegex.test(mobile)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
}
```

### 5. Calculations

```javascript
function calculateTotal() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let total = 0;
    
    checkboxes.forEach(cb => {
        if (cb.checked) {
            total += parseFloat(cb.value);
        }
    });
    
    // Apply discount if total > 1000
    if (total > 1000) {
        const discount = total * 0.10; // 10% discount
        total = total - discount;
    }
    
    document.getElementById('totalCost').textContent = total.toFixed(2);
}
```

### 6. Show/Hide Elements

```javascript
function toggleSection() {
    const section = document.getElementById('mySection');
    
    if (section.style.display === 'none') {
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
    }
}
```

### 7. Backend API Call (Fetch)

```javascript
// POST request
fetch('/api/feedback', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(feedbackData)
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        alert("Data saved successfully!");
    }
})
.catch(error => {
    console.error('Error:', error);
    alert("Error saving data");
});
```

---

## 🔥 Quick Tips for Exam

### Time Management

- **Read all questions first** (5 mins)
- **Do easy questions first** (Q2, Q4, Q5) - 30 mins
- **Then medium questions** (Q1, Q3, Q6) - 60 mins
- **Finally complex ones** (Q7, Q8) - 60 mins
- **Testing & review** (20 mins)

### Common Mistakes to Avoid

1. ❌ Forgetting `e.preventDefault()` in form submit
2. ❌ Using wrong quotes ('', "", ``)
3. ❌ Forgetting `.value` when getting input values
4. ❌ Not checking element exists before using it
5. ❌ Misspelling IDs in getElementById()
6. ❌ Forgetting to call functions (missing `()`)
7. ❌ Not resetting forms after submission
8. ❌ Case sensitivity in IDs and function names

### Testing Checklist

- ✅ Open browser console (F12) - check for errors
- ✅ Test each button/input individually
- ✅ Try invalid inputs for validation
- ✅ Check if data saves (backend questions)
- ✅ Verify calculations are correct
- ✅ Test on different screen sizes (if time permits)

---

## 📝 Exam Day Strategy

### Before Starting

1. **Read ALL questions carefully**
2. **Identify which branch to use** for each question
3. **Set up your environment** (code editor, browser)
4. **Test that the base code works**

### During Exam

1. **Copy code from correct branch**
2. **Modify as needed for the specific question**
3. **Test immediately** after each change
4. **Save frequently** (Ctrl+S)
5. **Keep console open** to catch errors

### Question-Specific Tips

**Q1 (Products/Services):**

- Add HTML checkboxes with values
- Create `calculateTotal()` function
- Use `parseFloat()` for prices

**Q2 (CSS Changes):**

- Find `:root` or `body` in CSS file
- Change background-color, font-family
- Test changes in browser

**Q3 (Validation):**

- Add mobile field in HTML
- Use regex for email and mobile
- Alert on validation failure

**Q4 (Clear Button):**

- Add button with type="button"
- Use `.reset()` on form
- Show confirmation alert

**Q5 (Toggle):**

- Use `display = 'none'/'block'`
- Add button with onclick handler
- Toggle visibility on click

**Q6 (Discount):**

- Check if total > 1000
- Calculate 10% discount
- Update display with new total

**Q7 (Backend Save):**

- Use fetch() with POST method
- Send JSON data
- Handle response

**Q8 (Special Offers):**

- Add internal CSS in `<head>`
- Create section with promo details
- Style with background color

---

## 🎯 Your Branch Reference

| Branch | Use For |
|--------|---------|
| `update-deps` | Q1: Products + calculations |
| `refactor-css` | Q2: CSS modifications |
| `input-validation` | Q3: Form validation |
| `cleanup-util` | Q4: Clear button |
| `ui-toggle` | Q5: Hide/show sections |
| `price-calc` | Q6: Discount logic |
| `backend-sync` | Q7: Save to backend |
| `seasonal-promo` | Q8: Special offers |

---

## ✅ Final Checklist

### Night Before

- [ ] Review this guide once
- [ ] Check all branches are accessible
- [ ] Ensure VS Code/editor is ready
- [ ] Get good sleep (IMPORTANT!)

### Exam Day

- [ ] Reach early, stay calm
- [ ] Read all questions first
- [ ] Use correct branch for each question
- [ ] Test each solution before submitting
- [ ] Keep console open for debugging
- [ ] Save frequently
- [ ] Review before final submission

---

## 💡 Remember

> "You've already done all the work. The code is in your branches. Just stay calm, read carefully, and copy from the right branch!"

**You've got this! Good luck! 🍀🎓**
