
// Find maximum or minumum in a unimodal function
// Ternary search Implementation
// Binary search vs Ternary search
// Ternary search applications



const binarySearchRecursive = (arr: number[], beg: number, end: number, target: number) => {
    // Base case
    if (beg > end) return -1;

    // Find the mid point
    const mid = beg + Math.floor((end - beg) / 2);

    // If the mid element is the target 
    if (arr[mid] === target) return mid;

    // If the target is greater than the mid element, search in the right half
    if (arr[mid] < target) beg = mid + 1;
    // If the target is less than the mid element, search in the left half
    else end = mid - 1;

    // Recursively search in the updated range
    // Note: This is a recursive call, which can be replaced with an iterative approach if needed
    return binarySearchRecursive(arr, beg, end, target);
}


const ternarySearchRecursive = (arr: number[], beg: number, end: number, target: number) => {
    // Base case
    if (beg > end) return -1;

    // Divide the length into 3 parts
    // Note: Using Math.floor to ensure we get an integer index
    let p3 = Math.floor((end - beg) / 3);

    // Calculate 1/3rd and 2/3rd mid points
    const m1 = beg + p3; // one-third point
    const m2 = end - p3; // two-thirds point
    
    // Check if either of the points is the target
    if (arr[m1] === target) return m1;
    if (arr[m2] === target) return m2;
    
    // if target is before 1/3rd, reduce the end to m1 - 1
    if (target < arr[m1]) end = m1 - 1;
    // If target is after 2/3rd, increase the beginning to m1 + 1
    else if (arr[m1] < target) beg = m1 + 1;
    // else target is between 1/3rd and 2/3rd,
    // so adjust the range to search in the middle section
    else {
        beg = m2 + 1;
        end = m2 - 1;
    }

    // Recursively search in the updated range
    // Note: This is a recursive call, which can be replaced with an iterative approach if needed
    return ternarySearchRecursive(arr, beg, end, target);
}


const binarySearchIterative = (arr: number[], target: number) => {
    let beg = 0;
    let end = arr.length - 1;

    while (beg <= end) {
        // Find the mid point
        const mid = beg + Math.floor((end - beg) / 2);

        // If the mid element is the target
        if (arr[mid] === target) return mid;

        // If the target is greater than the mid element, search in the right half
        if (arr[mid] < target) beg = mid + 1;
        // If the target is less than the mid element, search in the left half
        else end = mid - 1;
    }

    // If the target is not found, return -1
    return -1;
}

/**
 * ternarySearchIterative
 * 
 * @author @SandeepK1729
 * 
 * @param arr a sorted array of numbers
 * @param target to search for
 * @returns -1 if target is not found, otherwise the index of the target
 * 
 * @example
 *  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 *  const target = 5;
 *  const index = ternarySearchIterative(arr, target);
 *  console.log(index); // Output: 4
 * 
 * @timeComplexity O(log₃ n) ~ O(log n)
 * @spaceComplexity O(1)
 * 
 * @description Ternary search is a divide-and-conquer algorithm that divides the array
 * into three parts and checks the target against two mid points.
 * 
 * Note: Ternary search is generally slower than binary search in practice due to more 
 * comparisons and less efficient range reduction. However, it can be useful for specific 
 * problems like finding the maximum or minimum of unimodal functions.
 */
const  ternarySearchIterative = (arr: number[], target: number) => {
    let beg = 0;
    let end = arr.length - 1;

    while (beg <= end) {
        // Divide the length into 3 parts
        let p3 = Math.floor((end - beg) / 3);

        // Calculate 1/3rd and 2/3rd mid points
        const m1 = beg + p3; // one-third point
        const m2 = end - p3; // two-thirds point

        // Check if either of the points is the target
        if (arr[m1] === target) return m1;
        if (arr[m2] === target) return m2;

        // if target is before 1/3rd, reduce the end to m1 - 1
        if (target < arr[m1]) {
            end = m1 - 1;
        }
        // else if target is after 2/3rd, increase the beginning to m1 + 1
        else if (arr[m1] < target) {
            beg = m1 + 1;
        }
        // else target is between 1/3rd and 2/3rd,
        // so adjust the range to search in the middle section
        else {
            beg = m2 + 1;
            end = m2 - 1;
        }
    }

    // If the target is not found, return -1
    return -1;
}




/*
| Feature                | Binary Search           | Ternary Search              |
| ---------------------- | ----------------------- | --------------------------- |
| Parts per division     | 2                       | 3                           |
| Comparisons per step   | ✅ 1                    | ❗ 2                         |
| Range reduction        | n → n/2                 | n → \~2n/3                  |
| Theoretical complexity | O(log₂ n)               | O(log₃ n)                   |
| Real-world performance | ✅ Faster               | ❌ Slower (more comparisons) |
| Best use case          | Search in sorted arrays  | Optimize unimodal functions |

*/




/**
 * Ternary search use cases:
 * 1. **Unimodal Function Optimization**: Ternary search is particularly useful for finding the maximum or minimum of unimodal functions, where the function has a single peak or trough.
 * 2. **Finding Local Extrema**: In scenarios where you need to find local maxima or minima in a continuous function, ternary search can be applied effectively.
 * 3. **Search in Sorted Arrays**: While binary search is more common, ternary search can also be used to find elements in sorted arrays, especially when the array is divided into three parts.
 * 4. **Performance Comparison**: In some cases, ternary search can be more efficient than binary search when the cost of comparisons is high, as it reduces the range more significantly in each step.
 */