# Security Specification - SRM Drycleaners

## Data Invariants
1. A User must be authenticated to create an order.
2. Users can only access their own orders and profile data.
3. Only Admins can modify service pricing and update order statuses for all users.
4. Orders must have a valid `userId` matching the authenticated user's UID.
5. Critical fields like `role` in the User collection cannot be modified by the user themselves (except during initial registration if we allow it, but better handled via admin or cloud functions—here we'll restrict it).

## The Dirty Dozen Payloads (Rejection Targets)
1. **Identity Spoofing**: User A trying to read User B's profile.
2. **Order Tampering**: User A trying to update User B's order status to "delivered".
3. **Price Manipulation**: User trying to create an order with negative total amount.
4. **Role Escalation**: User trying to update their own role to 'admin'.
5. **Unauthorized Service Editing**: User trying to change the price of "Dry Cleaning".
6. **Orphaned Orders**: Creating an order without a userId.
7. **Junk ID Poisoning**: Creating a user with a 2KB string as ID.
8. **Shadow Field Injection**: Adding `isPromoted: true` to a service document.
9. **Status Skipping**: User trying to mark an order as "picked" (should be admin only).
10. **PII Leak**: Unauthenticated user trying to list all users.
11. **Terminal State Break**: Trying to update an order that is already "delivered".
12. **Timestamp Fraud**: User providing a `createdAt` date from the future.

## Test Runner (Verifies rejections)
(Implemented in `firestore.rules.test.ts`)
