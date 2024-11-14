import http from 'k6/http';
import { check } from 'k6';
import { Trend } from 'k6/metrics';

let userCreationTrend = new Trend('user_creation_time');

export const options = {
  stages: [
    { duration: '10s', target: 10 }, // Ramp up to 10 users in 10 seconds
    { duration: '1m', target: 10 },  // Keep 10 users for 1 minute
    { duration: '10s', target: 0 },  // Ramp down to 0 users
  ],
};

export default function () {
  // Create a user
  const createUserResponse = http.post('http://localhost:8000/users/', JSON.stringify({
    username: 'testuser',
    email: 'testuser@example.com',
  }), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(createUserResponse, {
    'User created successfully': (r) => r.status === 200,
  });

  userCreationTrend.add(createUserResponse.timings.duration);

  // Get users
  const getUsersResponse = http.get('http://localhost:8000/users/');

  check(getUsersResponse, {
    'Fetched users list': (r) => r.status === 200,
  });
}
