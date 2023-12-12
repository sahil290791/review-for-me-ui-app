const aws = require('@aws-sdk/signature-v4');

var awsSignature = aws;
var awsSign = new aws.SignatureV4();

module.exports = {
    awsSignature,
    awsSign,
};