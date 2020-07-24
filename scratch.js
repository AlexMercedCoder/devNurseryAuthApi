const jwt = require('jsonwebtoken')

// const token = jwt.sign({hello:"Hello"}, 'cheese', {expiresIn: 60})

// console.log(token)

const result = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWxsbyI6IkhlbGxvIiwiaWF0IjoxNTk1NTQ5NDUzLCJleHAiOjE1OTU1NDk1MTN9.jJaCbgMdpFc73dfRFDoOqLpE2qTZcQ5erJW3YhL5YBM', 'cheese')

console.log(result)