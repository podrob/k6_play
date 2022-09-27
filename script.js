import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
    stages: [
        { duration: '2s', target: 10 },
        { duration: '5s', target: 5 },
        { duration: '2s', target: 0 },
      ],
      thresholds: {
        http_req_failed: ['rate<0.05'], // http errors should be less than 5%
        http_req_duration: ['p(95)<2000'], // 95 percent of response times must be below 2seconds
      }
}

export default function () {
    const res = http.get('https://test.k6.io');
    sleep(1);
}