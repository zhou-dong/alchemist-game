export const formula = `def kadane(A):
  max_current = max_global = A[0]
  for val in A[1:]:
    max_current = max(val, val + max_current)
    max_global = max(max_current, max_global)
  return max_global`;

export const description = `Finding the contiguous subarray within a 
one-dimensional array of numbers which has the 
largest sum. The list usually contains both 
positive and negative numbers. `;

export const useCases = '';
export const example = '';
