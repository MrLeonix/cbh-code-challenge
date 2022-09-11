# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

I made the decision to extract the logic for setting the partition key to a new file, so there is a separation of concerns in the actual implementation. Since this code is still using JS, I have added JSDocs in an attempt to give more clarification on what is expected from variables and return types.

I have also extracted the cryptography logic, so it is isolated and, in the future, if it is decided to change how it should be implemented, it is easier to maintain/refactor this bit as well.