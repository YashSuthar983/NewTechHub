// Discount logic example for cost calculation
// If total > 1000, apply 10% discount
function applyDiscount(total) {
    if (total > 1000) {
        const discount = total * 0.10;
        return total - discount;
    }
    return total;
}

// Example usage
console.log("Discount logic implemented");
