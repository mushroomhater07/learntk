import type { ServiceAccount } from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";

const activeApps = getApps();
const serviceAccount = JSON.parse(`{
  "type": "service_account",
  "project_id": "learntk",
  "private_key_id": "c288c65dc51b09c707298d682b964d54fe9ada61",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCorqQz1SwsI61O\nxUIznj3s/jegfl5ZLX5BCvDseSpgIwtbSSJ3mqIHFNfLP6WkA0ZURLiZYEy6hyDc\n0byhpChXYQNN7mVq2IYClczTX0M5ojSrEe1/vfbofS2fDWNh5mjwhZ5hdpaC/jvj\nWCjjBWCIIwbNMZ5OME+6LTOh7Ouzd06lNSsevV0CMeMouCSHliQWJGkJQqhy3dvf\n531DWZX71q8rVoc0Lp4KETcZ8E27O15tALuhl2c9wprkoK628fbP4tyEuzqnm1Ma\n11jdtqH7y4pRttcG2saLElyC+C7Egc9ZAFVsA+vtNQj4wt6/8qXTf9YF3zeyNucK\nWzn7gLTLAgMBAAECggEAAYlumcHlJqIzYVNyKhBuUpslIsznJPUOQIWnsnsO7a3n\nQkj1MiJfCPIU+ApkgtnvljOQFczaT7XzQ//HMhcFGEXo5uXEPi53cU0v5UC2o8iv\npfVb9ON944CS3bwCyuQNOOlgV+8ukBMrGx2oNbVMiI3LivgOQxROmnNWx2PMtY33\na6vMMUeB7s2JutN5Qwi3nSwsKTlEmIPTbfv99kYwLpmS/bAU7tqBOC+WKNxN8Fxo\naoJ4DEYKCWeo19e6OcdflqNwV2M3E4zB71HAeljh0S0cKsYfeUwsh7TQQaLGaSvm\nld0Q5TmS5+mOSQzElC4EBZrQiSznxyxQHCS/I7rm8QKBgQC/TGesx6ktX9gFXKR3\nXyoPDgKXA89usZtx3wwPmJefalqQSyE64mIKztEXtixWBtIans6r5b++GwpjHROA\n1YxUX84F9Q0PjDna2b21YwDC99d4pcL8110Sicd6pB6cpq/zC6IHofAkjCKxqxmn\nBgYEzQ8lL3ufKSBT7eVBMsJG2wKBgQDhvAFNAI8voTS5PbvrMW9G8Pxrgu33F+X1\nd7y194X1X3hEEFMLLc/NX1kDSX/MX8IRCQZkIlwCCYLnsKtgQS172KOd6dzfnv0x\nvJUo0Uo66X0TTsq3PAhYb1TCYUI/sWMB1QrNma+Rv/fNlwnM3TY+JjGxDl1bMTNZ\nrcdwf39U0QKBgCElwCE0R6BRJ0FmmCkHGGabat94DY2EwQauO4zISB2bdC3kltF5\nQLvWsmyFaJFPhUCPnAg1O1BZpycddq+wUSydnTlzCNxU1AGUEUdI7GzcPT3umybs\nunfn3+TkY1mJmJtovJ7N9KqgjbJzj3JdnNVgIuuymp0tpyhj5IGzpe5ZAoGBALTl\nO8mgZB6QOjckcL6GrB0Wq8Hgd6CnJyJyJOlSBajgK/mnd1UjDj8PZL7MnLyEFHog\nWF3QZxk+1AelvYByWue/cUbwDY+q0k6USJggODNDv3bEkpEKa8mq1iq7VCLEnYnv\nVyvyOA893nCD1Fe3AmwFoZa44zlcEUGRkJznn3uxAoGAK6y0O/DfuoPH+Yr0tL8f\n6mgxXphV/LWoeNYCvQy0bn1rBJ7zaKZBeioAY/NxqRadW1LH/t+tgNUnTMV+AUpQ\n+6GQh6uBXXiJJj8QdCFgVG6ASRnXwj86Q6SQwtaaTtSGke8RbcF1NTRw5UNZJYMm\ntYEHu6GtY8ofpMT3aGncc/M=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-m5nol@learntk.iam.gserviceaccount.com",
  "client_id": "106253111285242958033",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-m5nol%40learntk.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}`)


const initApp = () => {
  if (process.env.PROD) {
    console.info('PROD env detected. Using default service account.')
    // Use default config in firebase functions. Should be already injected in the server by Firebase.
    return initializeApp()
  }
  console.info('Loading service account from env.')
  return initializeApp({
    credential: cert(serviceAccount as ServiceAccount)
  })
}

export const app = activeApps.length === 0 ? initApp() : activeApps[0];