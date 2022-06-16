const jwt = require('jsonwebtoken');
const jwks = require('jwks-rsa');

const jwksClient = jwks({
  jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`,
  audience: process.env.AUTH0_AUDIENCE,
});

const getAccessTokenFromHeaders = (headers) => {
  const rawAuthorization = headers.authorization;
  if (!rawAuthorization) {
    return null;
  }

  const authorizationParts = rawAuthorization.split(' ');
  if (authorizationParts[0] !== 'Bearer' || authorizationParts.length !== 2) {
    return null;
  }

  return authorizationParts[1];
}

const validateAccessToken = async (token) => {
  try {
    // Decode incoming jwt
    const decodedToken = jwt.decode(token, { complete: true });

    // Get the public signing Key - kid (Key ID)
    const kid = decodedToken.header.kid;
    const alg = decodedToken.header.alg;
    const key = await jwksClient.getSigningKey(kid);

    // key.publicKey is a getter function therefore () isn't used
    const signingKey = key.publicKey;

    // Verify token using the accessible public key
    const options = { algorithms: alg };
    jwt.verify(token, signingKey, options);
    return decodedToken.payload;
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = {
  getAccessTokenFromHeaders,
  validateAccessToken,
};
