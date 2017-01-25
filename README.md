# devicerestnodejs

To run test: jasmine-node spec/


API Error List:

1: Technical error
2: You are not authorized to call this URL (OK)
3: Authentication failed: user not found (OK)
4: Authentication failed: wrong password (OK)
5: Failed to authenticate token  (OK)
6: No token provided (OK)
7: Bad Request: Missing badgeId (OK)
8: BadgeId not found (OK)
9: The user does not exist (OK)
10: You are not authorized to see another user than yourself (OK)
11: The user already exists (OK)
12: You are not authorized to change the assignement of another user than yourself (OK)
13: Device is not assigned (OK)
14: Input validation error: $input validation error message
15: Device unavailable 
16: Device locked by another user
17: The key is not correct
18: The device has been deleted
19: The device already exists
20: The device does not exist



API scan message list

1: error
2: a device has been sent back
3: a device has been taken by a user
4: a user has been scanned, we wait a device