import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
    stages: [
        { duration: '5s', target: 20 },
        { duration: '10s', target: 10 },
        { duration: '5s', target: 0 },
      ],
      thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<500'], // 95 percent of response times must be below 500ms
      }
}

export default function () {
    const res = http.get('https://test.k6.io');
    sleep(1);
}